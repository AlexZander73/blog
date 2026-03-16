(function () {
  const PUBLISH_TIME_ZONE = "Australia/Brisbane";
  const TAG_ORDER = [
    "AI",
    "Apps",
    "Games",
    "Tools",
    "Experiments",
    "Build Logs",
    "Launches",
    "Notes",
    "Design",
    "Systems"
  ];

  const allPosts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
  const parseDate = (value) => new Date(value + "T00:00:00");
  const byNewest = (a, b) => parseDate(b.date) - parseDate(a.date);
  allPosts.sort(byNewest);

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  function formatDate(dateString) {
    const parsed = parseDate(dateString);
    return Number.isNaN(parsed.getTime()) ? dateString : formatter.format(parsed);
  }

  function getTodayInPublishZone() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: PUBLISH_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date());

    const mapped = {};
    parts.forEach((part) => {
      if (part.type !== "literal") {
        mapped[part.type] = part.value;
      }
    });

    return [mapped.year, mapped.month, mapped.day].join("-");
  }

  function getPublishedPosts(posts) {
    const today = getTodayInPublishZone();
    return posts.filter((post) => post.date <= today);
  }

  function getPostLink(post) {
    return post.path || ("posts/" + post.slug + ".html");
  }

  function getUniqueTags(posts) {
    const set = new Set();
    posts.forEach((post) => {
      (post.tags || []).forEach((tag) => set.add(tag));
    });
    return [...set].sort((a, b) => {
      const aIndex = TAG_ORDER.indexOf(a);
      const bIndex = TAG_ORDER.indexOf(b);
      if (aIndex === -1 && bIndex === -1) {
        return a.localeCompare(b);
      }
      if (aIndex === -1) {
        return 1;
      }
      if (bIndex === -1) {
        return -1;
      }
      return aIndex - bIndex;
    });
  }

  function createTagElement(tag) {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    return span;
  }

  function createPostCard(post, delayMs) {
    const article = document.createElement("article");
    article.className = "post-card enter";
    article.style.setProperty("--delay", (delayMs || 0) + "ms");

    const link = document.createElement("a");
    link.className = "post-card-link";
    link.href = getPostLink(post);
    link.setAttribute("aria-label", "Read post: " + post.title);

    const meta = document.createElement("p");
    meta.className = "post-meta";
    meta.innerHTML = "<span>" + formatDate(post.date) + "</span><span>" + post.readingTime + "</span>";

    const title = document.createElement("h3");
    title.textContent = post.title;

    const excerpt = document.createElement("p");
    excerpt.className = "post-excerpt";
    excerpt.textContent = post.excerpt;

    const tagList = document.createElement("div");
    tagList.className = "tag-list";
    (post.tags || []).forEach((tag) => tagList.appendChild(createTagElement(tag)));

    const readLink = document.createElement("span");
    readLink.className = "read-link";
    readLink.textContent = "Read post";

    link.appendChild(meta);
    link.appendChild(title);
    link.appendChild(excerpt);
    link.appendChild(tagList);
    link.appendChild(readLink);
    article.appendChild(link);
    return article;
  }

  function createFeaturedCard(post) {
    const article = document.createElement("article");
    article.className = "latest-card enter";
    article.style.setProperty("--delay", "60ms");

    const content = document.createElement("div");
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = "Latest Entry";

    const title = document.createElement("h3");
    title.textContent = post.title;

    const excerpt = document.createElement("p");
    excerpt.className = "post-excerpt";
    excerpt.textContent = post.excerpt;

    const meta = document.createElement("p");
    meta.className = "post-meta";
    meta.innerHTML = "<span>" + formatDate(post.date) + "</span><span>" + post.readingTime + "</span>";

    const tags = document.createElement("div");
    tags.className = "tag-list";
    (post.tags || []).forEach((tag) => tags.appendChild(createTagElement(tag)));

    content.appendChild(eyebrow);
    content.appendChild(title);
    content.appendChild(excerpt);
    content.appendChild(meta);
    content.appendChild(tags);

    const action = document.createElement("a");
    action.className = "button button-primary";
    action.href = getPostLink(post);
    action.textContent = "Open Post";

    article.appendChild(content);
    article.appendChild(action);
    return article;
  }

  function getLatestPost(posts) {
    const featured = posts.find((post) => post.isFeatured);
    return featured || posts[0] || null;
  }

  function renderHome() {
    const latestSlot = document.getElementById("latest-post");
    const recentSlot = document.getElementById("recent-posts");
    const tagPreview = document.getElementById("tag-preview");

    const publishedPosts = getPublishedPosts(allPosts);
    const latest = getLatestPost(publishedPosts);
    if (latestSlot) {
      latestSlot.innerHTML = "";
      if (latest) {
        latestSlot.appendChild(createFeaturedCard(latest));
      } else {
        latestSlot.innerHTML = '<p class="empty-state">No published posts yet. Add one in <code>posts.js</code> or wait for the next scheduled date.</p>';
      }
    }

    if (recentSlot) {
      recentSlot.innerHTML = "";
      const latestSlug = latest ? latest.slug : "";
      const recent = publishedPosts.filter((post) => post.slug !== latestSlug).slice(0, 4);
      const fallback = publishedPosts.slice(0, 4);
      const items = recent.length > 0 ? recent : fallback;
      if (items.length === 0) {
        recentSlot.innerHTML = '<p class="empty-state">No recent posts yet.</p>';
      } else {
        items.forEach((post, index) => {
          recentSlot.appendChild(createPostCard(post, 90 + index * 70));
        });
      }
    }

    if (tagPreview) {
      tagPreview.innerHTML = "";
      getUniqueTags(publishedPosts).forEach((tag) => tagPreview.appendChild(createTagElement(tag)));
    }
  }

  function renderArchive() {
    const archivePosts = document.getElementById("archive-posts");
    const tagsRow = document.getElementById("archive-tags");
    const searchInput = document.getElementById("archive-search");
    const sortSelect = document.getElementById("archive-sort");
    const summary = document.getElementById("archive-count");

    if (!archivePosts || !tagsRow || !searchInput || !sortSelect || !summary) {
      return;
    }

    const publishedPosts = getPublishedPosts(allPosts);
    let activeTag = "All";
    let query = "";

    function renderTagFilters() {
      tagsRow.innerHTML = "";
      const tags = ["All"].concat(getUniqueTags(publishedPosts));
      tags.forEach((tag) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "filter-chip" + (tag === activeTag ? " active" : "");
        button.textContent = tag;
        button.addEventListener("click", () => {
          activeTag = tag;
          renderTagFilters();
          applyFilters();
        });
        tagsRow.appendChild(button);
      });
    }

    function sortPosts(posts, mode) {
      const sorted = [...posts];
      if (mode === "oldest") {
        sorted.sort((a, b) => parseDate(a.date) - parseDate(b.date));
        return sorted;
      }
      if (mode === "title") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        return sorted;
      }
      sorted.sort(byNewest);
      return sorted;
    }

    function applyFilters() {
      const needle = query.trim().toLowerCase();
      let filtered = publishedPosts.filter((post) => {
        if (activeTag !== "All" && !(post.tags || []).includes(activeTag)) {
          return false;
        }
        if (!needle) {
          return true;
        }
        const haystack = [post.title, post.excerpt, (post.tags || []).join(" ")].join(" ").toLowerCase();
        return haystack.includes(needle);
      });

      filtered = sortPosts(filtered, sortSelect.value);
      archivePosts.innerHTML = "";

      if (filtered.length === 0) {
        archivePosts.innerHTML = '<p class="empty-state">No posts match this filter yet. Try another tag or search term.</p>';
      } else {
        filtered.forEach((post, index) => {
          archivePosts.appendChild(createPostCard(post, 40 + index * 45));
        });
      }

      if (filtered.length === publishedPosts.length) {
        summary.textContent = "Showing all " + filtered.length + " posts.";
      } else {
        summary.textContent = "Showing " + filtered.length + " of " + publishedPosts.length + " posts.";
      }
    }

    searchInput.addEventListener("input", () => {
      query = searchInput.value || "";
      applyFilters();
    });

    sortSelect.addEventListener("change", applyFilters);

    renderTagFilters();
    applyFilters();
  }

  function getCurrentPost() {
    const pathname = window.location.pathname;
    return allPosts.find((post) => {
      const path = getPostLink(post);
      return pathname.endsWith(path) || pathname.endsWith("/" + path);
    }) || null;
  }

  function guardScheduledPost() {
    const currentPost = getCurrentPost();
    if (!currentPost) {
      return;
    }

    if (currentPost.date <= getTodayInPublishZone()) {
      return;
    }

    const main = document.querySelector("main");
    if (!main) {
      return;
    }

    const releaseDate = formatDate(currentPost.date);
    main.innerHTML = [
      '<section class="section">',
      '  <div class="container">',
      '    <div class="page-intro enter" style="--delay: 40ms;">',
      '      <p class="eyebrow">Scheduled Post</p>',
      '      <h1>This entry is not public yet.</h1>',
      '      <p>This post is scheduled to appear on ' + releaseDate + " (" + PUBLISH_TIME_ZONE + ').</p>',
      '      <p>It will automatically show up in the homepage and archive once that date arrives.</p>',
      '      <div class="hero-actions">',
      '        <a class="button button-primary" href="../archive.html">Back to Archive</a>',
      '        <a class="button button-secondary" href="../index.html">Home</a>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</section>'
    ].join("");
    document.title = "Scheduled Post | Builder Journal";
  }

  function getRootPrefix() {
    return document.body.getAttribute("data-page") === "post" ? "../" : "./";
  }

  function injectSubscribeLinks() {
    const subscribeHref = getRootPrefix() + "subscribe.html";

    document.querySelectorAll(".site-nav").forEach((nav) => {
      if (nav.querySelector('[data-subscribe-nav]')) {
        return;
      }
      const link = document.createElement("a");
      link.href = subscribeHref;
      link.textContent = "Subscribe";
      link.setAttribute("data-subscribe-nav", "true");
      if (document.body.getAttribute("data-page") === "subscribe") {
        link.setAttribute("aria-current", "page");
      }
      const mainSiteLink = nav.querySelector(".main-site-link");
      if (mainSiteLink) {
        nav.insertBefore(link, mainSiteLink);
      } else {
        nav.appendChild(link);
      }
    });

    document.querySelectorAll(".footer-links").forEach((group) => {
      const heading = group.querySelector("h3");
      if (!heading || heading.textContent.trim() !== "Navigation") {
        return;
      }
      if (group.querySelector('[data-subscribe-footer]')) {
        return;
      }
      const link = document.createElement("a");
      link.href = subscribeHref;
      link.textContent = "Subscribe";
      link.setAttribute("data-subscribe-footer", "true");
      group.appendChild(link);
    });
  }

  function buildSubscribeDraft(form) {
    const formData = new FormData(form);
    const email = (formData.get("email") || "").toString().trim();
    const consent = formData.get("consent");
    if (!email || !consent) {
      return null;
    }

    const name = (formData.get("name") || "").toString().trim();
    const interests = (formData.get("interests") || "").toString().trim();
    const source = (formData.get("source") || "").toString().trim();
    const siteName = form.getAttribute("data-site-name") || "Builder Journal";
    const supportEmail = form.getAttribute("data-support-email") || "index-hearty6c@icloud.com";
    const requestedAt = new Intl.DateTimeFormat("en-AU", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date());

    const subject = siteName + " subscription request";
    const lines = [
      "Hello,",
      "",
      "Please add this address to the " + siteName + " email announcement list.",
      "",
      "Email: " + email
    ];

    if (name) {
      lines.push("Name: " + name);
    }
    if (interests) {
      lines.push("Interests: " + interests);
    }
    if (source) {
      lines.push("Found the blog via: " + source);
    }

    lines.push("Requested from: " + window.location.href);
    lines.push("Requested at: " + requestedAt);
    lines.push("");
    lines.push("Thanks.");

    const body = lines.join("\n");
    const preview = [
      "To: " + supportEmail,
      "Subject: " + subject,
      "",
      body
    ].join("\n");

    return {
      subject: subject,
      body: body,
      preview: preview,
      mailto: "mailto:" + encodeURIComponent(supportEmail) + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body)
    };
  }

  function initSubscribeForm() {
    const form = document.querySelector("[data-subscribe-form]");
    if (!form) {
      return;
    }

    const status = document.getElementById("subscribe-status");
    const draftWrap = document.getElementById("subscribe-draft-wrap");
    const draftField = document.getElementById("subscribe-draft");
    const copyButton = form.querySelector("[data-subscribe-copy]");

    function setStatus(message, isSuccess) {
      if (!status) {
        return;
      }
      status.textContent = message;
      status.classList.toggle("success", Boolean(isSuccess));
    }

    function prepareDraft() {
      if (!form.reportValidity()) {
        return null;
      }
      const draft = buildSubscribeDraft(form);
      if (!draft) {
        return null;
      }
      if (draftWrap) {
        draftWrap.hidden = false;
      }
      if (draftField) {
        draftField.value = draft.preview;
      }
      return draft;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const draft = prepareDraft();
      if (!draft) {
        return;
      }
      setStatus("Your email app should open now. If it does not, copy the draft below and send it manually.", true);
      window.location.href = draft.mailto;
    });

    if (copyButton) {
      copyButton.addEventListener("click", async () => {
        const draft = prepareDraft();
        if (!draft) {
          return;
        }
        try {
          await navigator.clipboard.writeText(draft.preview);
          setStatus("Signup request copied. Send it to the support inbox when ready.", true);
        } catch (error) {
          setStatus("Copy failed in this browser. Select the draft below and copy it manually.", false);
        }
      });
    }
  }

  function setCurrentYear() {
    document.querySelectorAll("[data-year]").forEach((node) => {
      node.textContent = new Date().getFullYear().toString();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const page = document.body.getAttribute("data-page");
    injectSubscribeLinks();
    if (page === "home") {
      renderHome();
    }
    if (page === "archive") {
      renderArchive();
    }
    if (page === "post") {
      guardScheduledPost();
    }
    if (page === "subscribe") {
      initSubscribeForm();
    }
    setCurrentYear();
  });
})();
