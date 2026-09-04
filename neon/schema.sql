CREATE TABLE IF NOT EXISTS page_views (
  page_path TEXT PRIMARY KEY,
  views BIGINT NOT NULL DEFAULT 0 CHECK (views >= 0)
);

CREATE TABLE IF NOT EXISTS location_views (
  page_path TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT,
  city TEXT,
  latitude NUMERIC(6, 2),
  longitude NUMERIC(6, 2),
  views BIGINT NOT NULL DEFAULT 0 CHECK (views >= 0),
  PRIMARY KEY (page_path, country, region, city)
);

CREATE INDEX IF NOT EXISTS location_views_views_idx ON location_views (views DESC);

CREATE TABLE IF NOT EXISTS source_views (
  source TEXT PRIMARY KEY CHECK (source IN ('Google', 'LinkedIn', 'GitHub', 'Other')),
  views BIGINT NOT NULL DEFAULT 0 CHECK (views >= 0)
);

INSERT INTO source_views (source, views)
VALUES ('Google', 0), ('LinkedIn', 0), ('GitHub', 0), ('Other', 0)
ON CONFLICT (source) DO NOTHING;