const GITHUB_USER = "alexcroox";
const CACHE_SECONDS = 6 * 60 * 60;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contributions") return contributions(url, ctx);
    return env.ASSETS.fetch(request);
  },
};

// GitHub doesn't expose the contribution calendar without a token, so read the
// public profile fragment and cache the parsed result at the edge
async function contributions(url, ctx) {
  const cache = caches.default;
  const key = new Request(`${url.origin}/api/contributions`);
  const cached = await cache.match(key);
  if (cached) return cached;

  const upstream = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
    headers: { "User-Agent": "alexcrooks.me" },
  });
  if (!upstream.ok) return Response.json({ error: "GitHub unavailable" }, { status: 502 });

  const days = parseCalendar(await upstream.text());
  if (!days.length) return Response.json({ error: "No calendar found" }, { status: 502 });

  const response = Response.json(
    { total: days.reduce((sum, d) => sum + d.count, 0), days },
    { headers: { "Cache-Control": `public, max-age=${CACHE_SECONDS}` } }
  );
  ctx.waitUntil(cache.put(key, response.clone()));
  return response;
}

function parseCalendar(html) {
  const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];

  // tooltips carry the exact counts, e.g. "7 contributions on January 18th."
  const counts = new Map();
  for (const [, attrs, text] of html.matchAll(/<tool-tip\b([^>]*)>([^<]*)<\/tool-tip>/g)) {
    const id = attr(attrs, "for");
    if (id) counts.set(id, Number(text.match(/^(\d+) contribution/)?.[1] ?? 0));
  }

  const days = [];
  for (const [tag] of html.matchAll(/<td\b[^>]*ContributionCalendar-day[^>]*>/g)) {
    const date = attr(tag, "data-date");
    if (!date) continue;
    days.push({
      date,
      count: counts.get(attr(tag, "id")) ?? 0,
      level: Number(attr(tag, "data-level") ?? 0),
    });
  }
  return days.sort((a, b) => a.date.localeCompare(b.date));
}
