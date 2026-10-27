(() => {
  const GITHUB_USER = "alexcroox";
  const HIDDEN_REPOS = new Set(["R3-Update-Test", "phonegap-localstorage-test"]);
  const REPOS_CACHE_KEY = "gh-repos-v1";
  const STARRED_CACHE_KEY = "gh-starred-v1";
  const CACHE_TTL = 60 * 60 * 1000;
  const STARRED_LIMIT = 18;

  const LANG_COLOURS = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Vue: "#41b883",
    HTML: "#e34c26",
    CSS: "#663399",
    Python: "#3572A5",
    "C#": "#178600",
    Swift: "#F05138",
    Dockerfile: "#384d54",
    Shell: "#89e051",
    SQF: "#c9a64f",
  };

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  // ---------- Local clock ----------

  const clock = document.getElementById("clock");
  const clockFormat = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const tick = () => (clock.textContent = clockFormat.format(new Date()));
  tick();
  setInterval(tick, 1000);

  document.getElementById("year").textContent = new Date().getFullYear();

  // ---------- Ongoing role durations ----------

  document.querySelectorAll("[data-since]").forEach((el) => (el.textContent = durationSince(new Date(el.dataset.since))));

  function durationSince(start) {
    const now = new Date();
    let months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
    if (now.getDate() < start.getDate()) months--;
    const years = Math.floor(months / 12);
    const rest = months % 12;
    const parts = [];
    if (years) parts.push(`${years} year${years === 1 ? "" : "s"}`);
    if (rest) parts.push(`${rest} month${rest === 1 ? "" : "s"}`);
    return parts.join(" ") || "Just started";
  }

  // ---------- Text scramble ----------

  const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

  function scramble(el, duration = 1100) {
    const target = el.textContent;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const settled = Math.floor(progress * target.length);
      let out = target.slice(0, settled);
      for (let i = settled; i < target.length; i++) {
        out += target[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  if (!reducedMotion) document.querySelectorAll("[data-scramble]").forEach((el) => scramble(el));

  // ---------- Cursor-tracking glow on cards ----------

  if (finePointer) {
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest?.(".glow");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  }

  // ---------- Reveal on scroll ----------

  const revealTargets = document.querySelectorAll(".section__head, .feature, .project, .timeline__item, .contact > *");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    revealTargets.forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  // ---------- Interactive dot field ----------

  const canvas = document.getElementById("field");
  const ctx = canvas.getContext("2d");
  const SPACING = 30;
  const RADIUS = 180;
  const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reducedMotion) draw(0);
  }

  function draw(t) {
    ctx.clearRect(0, 0, width, height);
    pointer.x += (pointer.tx - pointer.x) * 0.12;
    pointer.y += (pointer.ty - pointer.y) * 0.12;

    const offsetY = -(window.scrollY * 0.15) % SPACING;
    const cols = Math.ceil(width / SPACING) + 1;
    const rows = Math.ceil(height / SPACING) + 2;

    for (let r = 0; r < rows; r++) {
      const y = r * SPACING + offsetY;
      for (let c = 0; c < cols; c++) {
        const x = c * SPACING;
        // slow travelling wave gives the grid an ambient shimmer
        const wave = (Math.sin(x * 0.012 + t * 0.0006) + Math.sin(y * 0.016 - t * 0.0004)) * 0.5;
        let alpha = 0.07 + Math.max(wave, 0) * 0.07;
        let size = 1;
        let dx = 0;
        let dy = 0;

        const ddx = x - pointer.x;
        const ddy = y - pointer.y;
        const dist = Math.hypot(ddx, ddy);
        if (dist < RADIUS) {
          const k = 1 - dist / RADIUS;
          alpha += k * k * 0.75;
          size += k * 1.2;
          dx = (ddx / (dist || 1)) * k * 6;
          dy = (ddy / (dist || 1)) * k * 6;
          ctx.fillStyle = `rgba(110, 242, 196, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(190, 200, 230, ${alpha})`;
        }

        ctx.beginPath();
        ctx.arc(x + dx, y + dy, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function loop(t) {
    draw(t);
    frame = requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener("resize", resize);

  if (!reducedMotion) {
    if (finePointer) {
      window.addEventListener("pointermove", (e) => {
        pointer.tx = e.clientX;
        pointer.ty = e.clientY;
      });
      document.addEventListener("pointerleave", () => {
        pointer.tx = pointer.ty = -9999;
      });
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else frame = requestAnimationFrame(loop);
    });
    frame = requestAnimationFrame(loop);
  }

  // ---------- GitHub repos ----------

  const list = document.getElementById("repos");
  const tabButtons = document.querySelectorAll("[data-tab]");
  const moreLink = document.getElementById("repos-more");
  const compactNumber = new Intl.NumberFormat("en-GB", { notation: "compact" });
  let repos = [];
  let starred = null;
  let starredRequest = null;
  let tab = "recent";

  const relative = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });

  function timeAgo(iso) {
    const seconds = (new Date(iso) - Date.now()) / 1000;
    const units = [
      ["year", 31536000],
      ["month", 2592000],
      ["week", 604800],
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
    ];
    for (const [unit, size] of units) {
      if (Math.abs(seconds) >= size) return relative.format(Math.round(seconds / size), unit);
    }
    return "just now";
  }

  function escapeHtml(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  // my repos by latest push, or starred repos by when I starred them
  function currentItems() {
    if (tab === "starred") {
      return [...starred]
        .sort((a, b) => new Date(b.starred_at) - new Date(a.starred_at))
        .map((s) => {
          const [owner, name] = s.full_name.split("/");
          return { ...s, owner, name, own: false, when: `starred ${timeAgo(s.starred_at)}` };
        });
    }
    return [...repos]
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .map((r) => ({ ...r, owner: GITHUB_USER, own: true, when: timeAgo(r.pushed_at) }));
  }

  function render() {
    moreLink.href = `https://github.com/${GITHUB_USER}?tab=${tab === "starred" ? "stars" : "repositories"}`;
    moreLink.textContent = tab === "starred" ? "All starred repos on GitHub ↗" : "All repositories on GitHub ↗";

    list.innerHTML = currentItems()
      .map((repo, i) => {
        const colour = LANG_COLOURS[repo.language] || "#8b90a0";
        const homepage = repo.homepage && /^https?:\/\//.test(repo.homepage) ? repo.homepage : null;
        // only my own sites get the referrer, so they can see traffic from here
        const homeRel = repo.own ? "noopener" : "noopener noreferrer";
        return `
          <li class="repo glow" style="--i:${i}">
            <div class="repo__top">
              <h3 class="repo__name">
                <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer"><span class="dim">${escapeHtml(repo.owner)}/</span>${escapeHtml(repo.name)}</a>
              </h3>
              ${
                homepage
                  ? `<a class="repo__home" href="${escapeHtml(homepage)}" target="_blank" rel="${homeRel}" aria-label="${escapeHtml(repo.name)} website"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></a>`
                  : ""
              }
            </div>
            <p class="repo__desc">${escapeHtml(repo.description || "No description, just code.")}</p>
            <div class="repo__meta">
              ${repo.language ? `<span><i class="lang-dot" style="--c:${colour}"></i>${escapeHtml(repo.language)}</span>` : ""}
              <span aria-label="${repo.stargazers_count} stars">★ ${compactNumber.format(repo.stargazers_count)}</span>
              ${repo.forks_count ? `<span aria-label="${repo.forks_count} forks">⑂ ${compactNumber.format(repo.forks_count)}</span>` : ""}
              <span>${repo.when}</span>
            </div>
          </li>`;
      })
      .join("");
  }

  tabButtons.forEach((button) =>
    button.addEventListener("click", async () => {
      tab = button.dataset.tab;
      tabButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      if (tab === "starred" && !starred) {
        list.innerHTML = '<li class="repos__status mono">Loading starred repos…</li>';
        starred = await (starredRequest ??= loadStarred());
        if (tab !== "starred") return;
      }
      render();
    })
  );

  function readCache(key) {
    try {
      const cached = JSON.parse(sessionStorage.getItem(key));
      if (cached && Date.now() - cached.at < CACHE_TTL) return cached.repos;
    } catch {}
    return null;
  }

  function writeCache(key, data) {
    try {
      sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), repos: data }));
    } catch {}
  }

  async function loadRepos() {
    const cached = readCache(REPOS_CACHE_KEY);
    if (cached) return cached;

    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner&sort=pushed`);
      if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
      const live = (await res.json()).filter((r) => !r.fork && !r.archived && !HIDDEN_REPOS.has(r.name));
      writeCache(REPOS_CACHE_KEY, live);
      return live;
    } catch {
      // rate limited or offline: fall back to the snapshot shipped with the site
      const res = await fetch("/assets/repos.json");
      return res.json();
    }
  }

  // fetched only when the Starred tab is first opened, to spare the API rate limit
  async function loadStarred() {
    const cached = readCache(STARRED_CACHE_KEY);
    if (cached) return cached;

    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/starred?per_page=${STARRED_LIMIT}&sort=created&direction=desc`, {
        headers: { Accept: "application/vnd.github.star+json" },
      });
      if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
      const live = (await res.json()).map(({ starred_at, repo }) => ({
        starred_at,
        full_name: repo.full_name,
        html_url: repo.html_url,
        homepage: repo.homepage,
        description: repo.description,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
      }));
      writeCache(STARRED_CACHE_KEY, live);
      return live;
    } catch {
      const res = await fetch("/assets/starred.json");
      return res.json();
    }
  }

  loadRepos().then((data) => {
    repos = data;
    if (tab === "recent") render();
  });

  // ---------- Contribution activity ----------

  const plot = document.getElementById("activity-plot");
  const grid = document.getElementById("activity-grid");
  const bars = document.getElementById("activity-bars");
  const scan = document.getElementById("activity-scan");
  const readout = document.getElementById("activity-readout");
  const compact = window.matchMedia("(max-width: 680px)");
  const SCAN_STEP = 170;
  const number = new Intl.NumberFormat("en-GB");
  const weekLabel = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

  let weeks = [];
  let columns = [];
  let scanAt = -1;
  let scanTimer = null;
  let hovering = false;

  // group days into Sunday-first weeks, matching GitHub's calendar
  function toWeeks(days) {
    const out = [];
    for (const day of days) {
      const dow = new Date(`${day.date}T00:00:00Z`).getUTCDay();
      if (!out.length || dow === 0) out.push({ start: day.date, total: 0, days: [] });
      const week = out[out.length - 1];
      week.days.push({ ...day, dow });
      week.total += day.count;
    }
    return out;
  }

  function buildActivity(all) {
    stopScan();
    weeks = all.slice(compact.matches ? -26 : -53);
    const peak = Math.max(...weeks.map((w) => w.total), 1);
    const total = weeks.reduce((sum, w) => sum + w.total, 0);

    plot.style.setProperty("--weeks", weeks.length);
    document.getElementById("activity-span").textContent = compact.matches ? "6 months" : "12 months";
    document.getElementById("activity-total").textContent = number.format(total);
    document.getElementById("activity-avg").textContent = Math.round(total / weeks.length);
    document.getElementById("activity-peak").textContent = peak;
    grid.setAttribute("aria-label", `${number.format(total)} GitHub contributions in the last ${compact.matches ? "6" : "12"} months, averaging ${Math.round(total / weeks.length)} a week`);

    const gridFrag = document.createDocumentFragment();
    const barFrag = document.createDocumentFragment();
    columns = weeks.map((week, col) => {
      const cells = [];
      for (let row = 0; row < 7; row++) {
        const day = week.days.find((d) => d.dow === row);
        const cell = document.createElement("i");
        cell.className = day ? "cell" : "cell is-future";
        cell.dataset.level = day ? day.level : 0;
        cell.style.cssText = `grid-area:${row + 1}/${col + 1};--col:${col};--row:${row}`;
        if (day) cell.title = `${day.count} contribution${day.count === 1 ? "" : "s"} on ${weekLabel.format(new Date(`${day.date}T00:00:00Z`))}`;
        cells.push(cell);
        gridFrag.append(cell);
      }
      const bar = document.createElement("i");
      bar.className = "bar";
      bar.style.cssText = `--col:${col};--h:${(week.total / peak) * 100}%`;
      barFrag.append(bar);
      return { cells, bar };
    });

    grid.replaceChildren(gridFrag);
    bars.replaceChildren(barFrag);

    if (reducedMotion) showWeek(weeks.length - 1);
    else setTimeout(startScan, weeks.length * 16 + 700);
  }

  function showWeek(i) {
    if (scanAt >= 0 && columns[scanAt]) {
      columns[scanAt].cells.forEach((c) => c.classList.remove("is-scan"));
      columns[scanAt].bar.classList.remove("is-scan");
    }
    scanAt = i;
    const { cells, bar } = columns[i];
    cells.forEach((c) => c.classList.add("is-scan"));
    bar.classList.add("is-scan");
    scan.style.setProperty("--at", i);
    scan.classList.add("is-on");

    const week = weeks[i];
    const activeDays = week.days.filter((d) => d.count).length;
    readout.innerHTML = `<span class="accent">▸</span> w/c ${weekLabel.format(new Date(`${week.start}T00:00:00Z`))} · <b>${week.total}</b> contribution${week.total === 1 ? "" : "s"} · active <b>${activeDays}/${week.days.length}</b> days`;
  }

  function startScan() {
    stopScan();
    scanTimer = setInterval(() => {
      if (document.hidden || hovering) return;
      const next = (scanAt + 1) % weeks.length;
      // snap back to the first week without sweeping across the whole grid
      scan.classList.toggle("is-jump", next < scanAt);
      showWeek(next);
    }, SCAN_STEP);
  }

  function stopScan() {
    clearInterval(scanTimer);
    scanTimer = null;
  }

  plot.addEventListener("pointermove", (e) => {
    if (!columns.length) return;
    hovering = true;
    const rect = plot.getBoundingClientRect();
    const i = Math.min(weeks.length - 1, Math.max(0, Math.floor(((e.clientX - rect.left) / rect.width) * weeks.length)));
    if (i !== scanAt) {
      scan.classList.remove("is-jump");
      showWeek(i);
    }
  });
  plot.addEventListener("pointerleave", () => (hovering = false));

  let allWeeks = [];
  fetch("/api/contributions")
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .catch(() => fetch("/assets/contributions.json").then((res) => res.json()))
    .then((data) => {
      allWeeks = toWeeks(data.days);
      buildActivity(allWeeks);
    });
  compact.addEventListener("change", () => allWeeks.length && buildActivity(allWeeks));
})();
