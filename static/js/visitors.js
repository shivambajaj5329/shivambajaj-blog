(function () {
  "use strict";

  var mapElement = document.getElementById("visitor-map");
  if (!mapElement || window.matchMedia("(max-width: 700px)").matches) return;

  var map = L.map(mapElement, { minZoom: 2, maxZoom: 10, worldCopyJump: true })
    .setView([39.8283, -98.5795], 4);
  var apiKey = window.visitorMapConfig && window.visitorMapConfig.cartoApiKey;
  var tileLayer;
  var markers = [];
  var locationData = [];

  function isLightMode() {
    return document.documentElement.dataset.theme === "light";
  }

  function createTileLayer() {
    var tileUrl = isLightMode()
      ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    if (apiKey) tileUrl += "?key=" + encodeURIComponent(apiKey);
    return L.tileLayer(tileUrl, {
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      subdomains: "abcd",
      maxZoom: 20,
      errorTileUrl: ""
    });
  }

  function getColors() {
    return isLightMode()
      ? { core: "#7c3aed", shadow: "#a855f7" }
      : { core: "#22d3ee", shadow: "#67e8f9" };
  }

  function buildIcon(size, colors, delay) {
    var html =
      '<div class="vm-wrap" style="--vm-c:' + colors.core + ';--vm-s:' + colors.shadow + ';--vm-d:' + delay + 's">' +
        '<div class="vm-dot"></div>' +
        '<div class="vm-ring"></div>' +
      '</div>';
    return L.divIcon({ className: "", html: html, iconSize: [size, size], iconAnchor: [size / 2, size / 2] });
  }

  function drawMarkers() {
    markers.forEach(function (m) { map.removeLayer(m); });
    markers = [];
    var colors = getColors();
    var maximum = Math.max.apply(null, locationData.map(function (l) { return l.views; }).concat([1]));
    locationData.forEach(function (location, i) {
      var intensity = Math.max(0.2, Math.log(location.views + 1) / Math.log(maximum + 1));
      var size = Math.round(18 + intensity * 26);
      var delay = (i % 6) * 0.4;
      var marker = L.marker([location.latitude, location.longitude], { icon: buildIcon(size, colors, delay) }).addTo(map);
      marker.bindTooltip(
        [location.city, location.region, location.country].filter(Boolean).join(", ") +
        " · " + Number(location.views).toLocaleString() + " views"
      );
      markers.push(marker);
    });
  }

  function updateMapTheme() {
    if (tileLayer) map.removeLayer(tileLayer);
    tileLayer = createTileLayer().addTo(map);
    drawMarkers();
  }

  updateMapTheme();
  new MutationObserver(updateMapTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });

  fetch("/api/view-data")
    .then(function (r) { if (!r.ok) throw new Error("fail"); return r.json(); })
    .then(function (data) {
      document.querySelectorAll("#visitor-total, #visitor-total-mobile").forEach(function (el) {
        el.textContent = Number(data.views || 0).toLocaleString();
      });
      (data.sources || []).forEach(function (s) {
        var el = document.getElementById("source-" + s.source.toLowerCase());
        if (el) el.textContent = Number(s.views || 0).toLocaleString();
      });
      locationData = data.locations || [];
      var famousCity = document.getElementById("most-popular-city");
      var top = locationData[0];
      if (top && famousCity) {
        famousCity.textContent = [top.city, top.country].filter(Boolean).join(", ") || "Atlanta";
      }
      drawMarkers();
    })
    .catch(function () {});
}());