const { neon } = require("@neondatabase/serverless");

function database() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  return neon(process.env.DATABASE_URL);
}

function header(request, name) {
  return request.headers[name] || request.headers[name.toLowerCase()] || null;
}

function geoFromRequest(request) {
  const country = header(request, "x-vercel-ip-country") || "Unknown";
  const region = header(request, "x-vercel-ip-country-region") || null;
  const city = header(request, "x-vercel-ip-city") || null;
  const latitude = Number.parseFloat(header(request, "x-vercel-ip-latitude"));
  const longitude = Number.parseFloat(header(request, "x-vercel-ip-longitude"));

  return {
    country: country.slice(0, 100),
    region: region ? region.slice(0, 100) : null,
    city: city ? decodeURIComponent(city.replace(/\+/g, " ")).slice(0, 150) : null,
    // City-level precision is enough for the map and avoids exposing exact coordinates.
    latitude: Number.isFinite(latitude) ? Math.round(latitude * 100) / 100 : null,
    longitude: Number.isFinite(longitude) ? Math.round(longitude * 100) / 100 : null,
  };
}

function sourceFromRequest(request) {
  const referer = header(request, "referer") || header(request, "referrer") || "";
  const source = referer.toLowerCase();

  if (source.includes("google.")) return "Google";
  if (source.includes("linkedin.com")) return "LinkedIn";
  if (source.includes("github.com")) return "GitHub";
  return "Other";
}

module.exports = { database, geoFromRequest, sourceFromRequest };