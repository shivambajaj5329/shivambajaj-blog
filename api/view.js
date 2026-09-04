const { database, geoFromRequest, sourceFromRequest } = require("./_database");

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const pagePath = typeof request.body?.pagePath === "string" ? request.body.pagePath : "/";
  if (!pagePath.startsWith("/") || pagePath.length > 500) {
    return response.status(400).json({ error: "Invalid page path" });
  }

  try {
    const sql = database();
    const location = geoFromRequest(request);
    const source = sourceFromRequest(request);

    const rows = await sql.transaction((tx) => [
      tx`INSERT INTO page_views (page_path, views)
         VALUES (${pagePath}, 1)
         ON CONFLICT (page_path)
         DO UPDATE SET views = page_views.views + 1
         RETURNING views`,
      tx`INSERT INTO location_views
         (page_path, country, region, city, latitude, longitude, views)
         VALUES (${pagePath}, ${location.country}, ${location.region}, ${location.city},
                 ${location.latitude}, ${location.longitude}, 1)
         ON CONFLICT (page_path, country, region, city)
         DO UPDATE SET views = location_views.views + 1,
                       latitude = COALESCE(location_views.latitude, EXCLUDED.latitude),
                       longitude = COALESCE(location_views.longitude, EXCLUDED.longitude)`,
      tx`INSERT INTO source_views (source, views)
         VALUES (${source}, 1)
         ON CONFLICT (source)
         DO UPDATE SET views = source_views.views + 1`,
    ]);

    return response.status(200).json({ views: rows[0][0].views });
  } catch (error) {
    console.error("Unable to record view", error);
    return response.status(500).json({ error: "Unable to record view" });
  }
};