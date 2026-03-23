#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import smtplib
import ssl
import subprocess
import sys
from dataclasses import dataclass
from datetime import datetime
from email.message import EmailMessage
from html import escape
from pathlib import Path
from urllib.parse import urljoin
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
LOADER = ROOT / "scripts" / "load-posts.mjs"
PUBLIC_SUBSCRIBERS = ROOT / "newsletter" / "public-subscribers.json"
PRIVATE_SUBSCRIBERS = ROOT / "newsletter" / "private-subscribers.json"
STATE_PATH = ROOT / "newsletter" / "announced-posts.json"
DEFAULT_TIMEZONE = "Australia/Brisbane"
DEFAULT_SITE_NAME = "Builder Journal"
DEFAULT_BASE_URL = "https://alexzander73.github.io/blog/"
DEFAULT_SUPPORT_EMAIL = "index-hearty6c@icloud.com"
EMAIL_SPLIT_RE = re.compile(r"[\n,;]+")


@dataclass
class SmtpConfig:
    host: str
    port: int
    username: str
    password: str
    sender: str
    reply_to: str
    use_ssl: bool

    @property
    def ready(self) -> bool:
        return bool(self.host and self.port and self.username and self.password and self.sender)


def load_posts() -> list[dict]:
    result = subprocess.run(
        ["node", str(LOADER)],
        check=True,
        capture_output=True,
        text=True,
    )
    posts = json.loads(result.stdout)
    posts.sort(key=lambda post: (post.get("date", ""), post.get("title", "")))
    return posts


def current_timestamp(timezone_name: str) -> str:
    return datetime.now(ZoneInfo(timezone_name)).isoformat(timespec="seconds")


def current_date(timezone_name: str) -> str:
    return datetime.now(ZoneInfo(timezone_name)).strftime("%Y-%m-%d")


def human_date(date_value: str) -> str:
    return datetime.strptime(date_value, "%Y-%m-%d").strftime("%B %-d, %Y")


def normalize_email(value: str) -> str:
    return value.strip().lower()


def load_subscribers_file(path: Path) -> list[str]:
    if not path.exists():
        return []
    data = json.loads(path.read_text(encoding="utf-8"))
    subscribers = []
    for entry in data.get("subscribers", []):
        if not entry.get("active", True):
            continue
        email = normalize_email(entry.get("email", ""))
        if email:
            subscribers.append(email)
    return subscribers


def load_subscribers_from_env() -> list[str]:
    raw = os.getenv("EMAIL_SUBSCRIBERS", "")
    if not raw.strip():
        return []
    return [
        normalize_email(item)
        for item in EMAIL_SPLIT_RE.split(raw)
        if normalize_email(item)
    ]


def load_subscribers() -> list[str]:
    ordered = []
    seen = set()
    for source in [
        *load_subscribers_file(PUBLIC_SUBSCRIBERS),
        *load_subscribers_file(PRIVATE_SUBSCRIBERS),
        *load_subscribers_from_env(),
    ]:
        if source and source not in seen:
            ordered.append(source)
            seen.add(source)
    return ordered


def load_state(timezone_name: str) -> dict:
    if not STATE_PATH.exists():
        return {
            "initializedAt": current_timestamp(timezone_name),
            "timezone": timezone_name,
            "announcedPosts": {},
        }
    data = json.loads(STATE_PATH.read_text(encoding="utf-8"))
    data.setdefault("initializedAt", current_timestamp(timezone_name))
    data.setdefault("timezone", timezone_name)
    data.setdefault("announcedPosts", {})
    return data


def save_state(state: dict) -> None:
    STATE_PATH.write_text(json.dumps(state, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def get_published_posts(posts: list[dict], timezone_name: str) -> list[dict]:
    today = current_date(timezone_name)
    return [post for post in posts if post.get("date", "") <= today]


def get_unsent_posts(posts: list[dict], state: dict) -> list[dict]:
    announced = state.get("announcedPosts", {})
    return [post for post in posts if post.get("slug") not in announced]


def sort_posts(posts: list[dict]) -> list[dict]:
    return sorted(posts, key=lambda post: (post.get("date", ""), post.get("title", "")))


def infer_default_host(username: str) -> str:
    domain = username.split("@")[-1].lower() if "@" in username else ""
    if domain in {"icloud.com", "me.com", "mac.com"}:
        return "smtp.mail.me.com"
    return ""


def get_smtp_config() -> SmtpConfig:
    username = os.getenv("SMTP_USERNAME", DEFAULT_SUPPORT_EMAIL).strip()
    host = os.getenv("SMTP_HOST", "").strip() or infer_default_host(username)
    port_value = os.getenv("SMTP_PORT", "").strip()
    use_ssl = os.getenv("SMTP_USE_SSL", "false").strip().lower() in {"1", "true", "yes"}
    if not port_value:
        port = 465 if use_ssl else 587
    else:
        port = int(port_value)
        if port == 465 and os.getenv("SMTP_USE_SSL") is None:
            use_ssl = True
    sender = os.getenv("EMAIL_FROM", f"{DEFAULT_SITE_NAME} <{username}>").strip()
    reply_to = os.getenv("EMAIL_REPLY_TO", DEFAULT_SUPPORT_EMAIL).strip()
    password = os.getenv("SMTP_PASSWORD", "").strip()
    return SmtpConfig(
        host=host,
        port=port,
        username=username,
        password=password,
        sender=sender,
        reply_to=reply_to,
        use_ssl=use_ssl,
    )


def post_url(post: dict, base_url: str) -> str:
    return urljoin(base_url, post.get("path", f"posts/{post.get('slug', '')}.html"))


def build_subject(site_name: str, new_posts: list[dict]) -> str:
    if len(new_posts) == 1:
        return f"New on {site_name}: {new_posts[0]['title']}"
    return f"New posts on {site_name} ({len(new_posts)})"


def build_plain_text(site_name: str, base_url: str, new_posts: list[dict]) -> str:
    lines = [f"{site_name} has {len(new_posts)} newly published post(s).", ""]
    for post in new_posts:
        lines.extend(
            [
                post["title"],
                human_date(post["date"]),
                post["excerpt"],
                f"Read: {post_url(post, base_url)}",
                "",
            ]
        )
    lines.extend(
        [
            f"Archive: {urljoin(base_url, 'archive.html')}",
            "",
            "You are receiving this because you are on the Builder Journal announcement list.",
        ]
    )
    return "\n".join(lines)


def build_html(site_name: str, base_url: str, new_posts: list[dict]) -> str:
    items = []
    for post in new_posts:
        items.append(
            "".join(
                [
                    '<article style="padding:20px;border:1px solid #d9e0eb;border-radius:18px;margin:0 0 16px;background:#ffffff;">',
                    f'<p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#53708d;">{escape(human_date(post["date"]))}</p>',
                    f'<h2 style="margin:0 0 12px;font-size:24px;line-height:1.25;color:#162130;">{escape(post["title"])}</h2>',
                    f'<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#31455e;">{escape(post["excerpt"])}</p>',
                    f'<a href="{escape(post_url(post, base_url))}" style="display:inline-block;padding:10px 16px;border-radius:999px;background:#162130;color:#ffffff;text-decoration:none;font-weight:600;">Read post</a>',
                    '</article>',
                ]
            )
        )
    archive_url = urljoin(base_url, "archive.html")
    return "".join(
        [
            '<!doctype html><html lang="en"><body style="margin:0;padding:32px 16px;background:#f6f8fb;font-family:Arial,sans-serif;color:#162130;">',
            '<div style="max-width:720px;margin:0 auto;">',
            f'<p style="margin:0 0 12px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#53708d;">{escape(site_name)} update</p>',
            f'<h1 style="margin:0 0 16px;font-size:32px;line-height:1.15;color:#162130;">{escape(build_subject(site_name, new_posts))}</h1>',
            '<p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#31455e;">Fresh posts just cleared their publish date and are now live on the blog.</p>',
            "".join(items),
            f'<p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#5f7288;">Archive: <a href="{escape(archive_url)}" style="color:#162130;">{escape(archive_url)}</a></p>',
            '<p style="margin:12px 0 0;font-size:14px;line-height:1.6;color:#5f7288;">You are receiving this because you are on the Builder Journal announcement list.</p>',
            '</div></body></html>',
        ]
    )


def print_queue_status(
    timezone_name: str,
    published_posts: list[dict],
    unsent_posts: list[dict],
    recipients: list[str],
) -> None:
    today = current_date(timezone_name)
    print(f"Queue status ({timezone_name})")
    print(f"- Today: {today}")
    print(f"- Published posts: {len(published_posts)}")
    print(f"- Unsent posts: {len(unsent_posts)}")
    print(f"- Active recipients: {len(recipients)}")
    if not unsent_posts:
        print("- Unsent slugs: none")
        return
    print("- Unsent slugs:")
    for post in sort_posts(unsent_posts):
        print(f"  - {post.get('date', 'unknown')} | {post.get('slug', '')}")


def send_email(config: SmtpConfig, recipients: list[str], subject: str, text_body: str, html_body: str) -> None:
    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = config.sender
    message["To"] = config.sender
    if config.reply_to:
        message["Reply-To"] = config.reply_to
    message.set_content(text_body)
    message.add_alternative(html_body, subtype="html")

    if config.use_ssl:
        with smtplib.SMTP_SSL(config.host, config.port, context=ssl.create_default_context()) as server:
            server.login(config.username, config.password)
            server.send_message(message, to_addrs=recipients)
        return

    with smtplib.SMTP(config.host, config.port) as server:
        server.ehlo()
        server.starttls(context=ssl.create_default_context())
        server.ehlo()
        server.login(config.username, config.password)
        server.send_message(message, to_addrs=recipients)


def bootstrap_current_posts(state: dict, posts: list[dict], timezone_name: str) -> int:
    timestamp = current_timestamp(timezone_name)
    added = 0
    for post in posts:
        slug = post.get("slug")
        if not slug or slug in state["announcedPosts"]:
            continue
        state["announcedPosts"][slug] = {
            "date": post.get("date", ""),
            "sentAt": timestamp,
            "status": "bootstrapped",
            "title": post.get("title", ""),
        }
        added += 1
    save_state(state)
    return added


def announce_new_posts(
    dry_run: bool,
    timezone_name: str,
    site_name: str,
    base_url: str,
    fail_if_smtp_missing: bool = False,
) -> int:
    posts = get_published_posts(load_posts(), timezone_name)
    state = load_state(timezone_name)
    new_posts = get_unsent_posts(posts, state)
    recipients = load_subscribers()
    print_queue_status(timezone_name, posts, new_posts, recipients)
    if not new_posts:
        print("No newly published posts to announce.")
        return 0

    if not recipients:
        print("Skipping send: no subscribers configured.")
        return 0

    subject = build_subject(site_name, new_posts)
    text_body = build_plain_text(site_name, base_url, new_posts)
    html_body = build_html(site_name, base_url, new_posts)

    if dry_run:
        print(subject)
        print("Recipients:", len(recipients))
        print(text_body)
        return 0

    config = get_smtp_config()
    if not config.ready:
        print("Skipping send: SMTP config is incomplete. Set SMTP_PASSWORD to activate announcements.")
        return 1 if fail_if_smtp_missing else 0

    send_email(config, recipients, subject, text_body, html_body)
    timestamp = current_timestamp(timezone_name)
    for post in new_posts:
        state["announcedPosts"][post["slug"]] = {
            "date": post.get("date", ""),
            "sentAt": timestamp,
            "status": "sent",
            "title": post.get("title", ""),
        }
    save_state(state)
    print(f"Sent announcement email for {len(new_posts)} post(s) to {len(recipients)} recipient(s).")
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Send Builder Journal post announcement emails.")
    parser.add_argument("--dry-run", action="store_true", help="Render the next email without sending it.")
    parser.add_argument("--status", action="store_true", help="Show queue status and unsent post slugs.")
    parser.add_argument(
        "--fail-if-smtp-missing",
        action="store_true",
        help="Exit non-zero if there are unsent posts but SMTP config is missing.",
    )
    parser.add_argument(
        "--bootstrap-published",
        action="store_true",
        help="Mark all currently published posts as already announced.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    timezone_name = os.getenv("ANNOUNCE_TZ", DEFAULT_TIMEZONE)
    site_name = os.getenv("ANNOUNCE_SITE_NAME", DEFAULT_SITE_NAME)
    base_url = os.getenv("ANNOUNCE_BASE_URL", DEFAULT_BASE_URL)
    if not base_url.endswith("/"):
        base_url += "/"

    published_posts = get_published_posts(load_posts(), timezone_name)
    state = load_state(timezone_name)

    subscribers = load_subscribers()
    unsent_posts = get_unsent_posts(published_posts, state)

    if args.status:
        print_queue_status(timezone_name, published_posts, unsent_posts, subscribers)
        return 0

    if args.bootstrap_published:
        added = bootstrap_current_posts(state, published_posts, timezone_name)
        print(f"Bootstrapped {added} published post(s) into newsletter state.")
        return 0

    return announce_new_posts(
        args.dry_run,
        timezone_name,
        site_name,
        base_url,
        fail_if_smtp_missing=args.fail_if_smtp_missing,
    )


if __name__ == "__main__":
    sys.exit(main())
