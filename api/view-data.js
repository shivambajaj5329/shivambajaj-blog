const { database } = require("./_database");

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const sql = database();
    const [totals, locations, sources] = await Promise.all([
      sql`SELECT COALESCE(SUM(views), 0)::int AS views FROM source_views`,
      sql`SELECT country, region, city, latitude, longitude, SUM(views)::int AS views
          FROM location_views
          WHERE latitude IS NOT NULL AND longitude IS NOT NULL
          GROUP BY country, region, city, latitude, longitude
          ORDER BY views DESC
          LIMIT 1000`,
      sql`SELECT source, views::int AS views
          FROM source_views
          ORDER BY CASE source
            WHEN 'Google' THEN 1
            WHEN 'LinkedIn' THEN 2
            WHEN 'GitHub' THEN 3
            ELSE 4
          END`,
    ]);

    response.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return response.status(200).json({
      views: totals[0].views,
      locations,
      sources,
    });
  } catch (error) {
    console.error("Unable to load view data", error);
    return response.status(500).json({ error: "Unable to load view data" });
  }
};