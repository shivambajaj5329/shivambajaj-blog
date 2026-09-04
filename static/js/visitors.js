(function () {
  "use strict";

  var mapElement = document.getElementById("visitor-map");
  if (!mapElement || window.matchMedia("(max-width: 700px)").matches) return;

  // Start over the United States while still allowing visitors to zoom out globally.
  var map = L.map(mapElement, { minZoom: 2, maxZoom: 10, worldCopyJump: true })
    .setView([39.8283, -98.5795], 4);
  var apiKey = window.visitorMapConfig && window.visitorMapConfig.cartoApiKey;
  var tileLayer;
  var markers = [];

  function isLightMode() {
    return document.documentElement.dataset.theme === "light";
  }

  function createTileLayer() {
    var tileUrl = isLightMode()
      ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    if (apiKey) tileUrl += "?key=" + encodeURIComponent(apiKey);

    return L.tileLayer(tileUrl, {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: "abcd",
      maxZoom: 20,
      errorTileUrl: ""
    });
  }

  function markerTheme() {
    return isLightMode()
      ? { color: "#7c3aed", fillColor: "#a855f7" }
      : { color: "#67e8f9", fillColor: "#22d3ee" };
  }

  function updateMapTheme() {
    var theme = markerTheme();
    if (tileLayer) map.removeLayer(tileLayer);
    tileLayer = createTileLayer().addTo(map);
    markers.forEach(function (marker) {
      marker.setStyle({ color: theme.color, fillColor: theme.fillColor });
    });
  }

  updateMapTheme();
  new MutationObserver(updateMapTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });

  fetch("/api/view-data")
    .then(function (response) { if (!response.ok) throw new Error("request failed"); return response.json(); })
    .then(function (data) {
      document.querySelectorAll("#visitor-total, #visitor-total-mobile").forEach(function (element) {
        element.textContent = Number(data.views || 0).toLocaleString();
      });
      (data.sources || []).forEach(function (source) {
        var element = document.getElementById("source-" + source.source.toLowerCase());
        if (element) element.textContent = Number(source.views || 0).toLocaleString();
      });
      var locations = data.locations || [];
      var maximum = Math.max.apply(null, locations.map(function (location) { return location.views; }).concat([1]));
      var famousCity = document.getElementById("most-popular-city");
      var brightestLocation = locations[0];
      if (brightestLocation && famousCity) {
        famousCity.textContent = [brightestLocation.city, brightestLocation.country].filter(Boolean).join(", ") || "Atlanta";
      }
      locations.forEach(function (location) {
        var intensity = Math.max(0.18, Math.log(location.views + 1) / Math.log(maximum + 1));
        var theme = markerTheme();
        var marker = L.circleMarker([location.latitude, location.longitude], {
          radius: 5 + intensity * 13,
          color: theme.color,
          weight: 1,
          opacity: 0.9,
          fillColor: theme.fillColor,
          fillOpacity: 0.2 + intensity * 0.65,
          className: "visitor-pulse"
        }).addTo(map);
        marker.bindTooltip([location.city, location.region, location.country].filter(Boolean).join(", ") + " · " + Number(location.views).toLocaleString() + " views");
        markers.push(marker);
      });
    })
    .catch(function () {});
}());