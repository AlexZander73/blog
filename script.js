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

  function setCurrentYear() {
    document.querySelectorAll("[data-year]").forEach((node) => {
      node.textContent = new Date().getFullYear().toString();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const page = document.body.getAttribute("data-page");
    if (page === "home") {
      renderHome();
    }
    if (page === "archive") {
      renderArchive();
    }
    if (page === "post") {
      guardScheduledPost();
    }
    setCurrentYear();
  });
})();
