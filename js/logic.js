d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", createMarkers);

function createMarkers(response) {

  var earthquakes = response.features;

  var quakeMarker = [];

  for (var index = 0; index < earthquakes.length; index++) {
    var quake = earthquakes[index];

    if (quake.properties.mag <= 1) {
      var quakeMark = L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]],{
        fillOpacity: 0.75,
        color: "white",
        fillColor: "green",
        radius: quake.properties.mag * 25000
      })
        .bindPopup("<h3>Location: " + quake.properties.place + "<h3><h3>Magnitude: " + quake.properties.mag + "<h3>");
      quakeMarker.push(quakeMark);
    }
    else if (quake.properties.mag <= 2) {
      var quakeMark = L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]],{
        fillOpacity: 0.75,
        color: "white",
        fillColor: "yellow",
        radius: quake.properties.mag * 25000
      })
        .bindPopup("<h3>Location: " + quake.properties.place + "<h3><h3>Magnitude: " + quake.properties.mag + "<h3>");
      quakeMarker.push(quakeMark);
    }
    else if (quake.properties.mag <= 3) {
      var quakeMark = L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]],{
        fillOpacity: 0.75,
        color: "white",
        fillColor: "orange",
        radius: quake.properties.mag * 25000
      })
        .bindPopup("<h3>Location: " + quake.properties.place + "<h3><h3>Magnitude: " + quake.properties.mag + "<h3>");
      quakeMarker.push(quakeMark);
    }
    else if (quake.properties.mag <= 4) {
      var quakeMark = L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]],{
        fillOpacity: 0.75,
        color: "white",
        fillColor: "purple",
        radius: quake.properties.mag * 25000
      })
        .bindPopup("<h3>Location: " + quake.properties.place + "<h3><h3>Magnitude: " + quake.properties.mag + "<h3>");
      quakeMarker.push(quakeMark);
    }
    else if (quake.properties.mag <= 5) {
      var quakeMark = L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]],{
        fillOpacity: 0.75,
        color: "white",
        fillColor: "pink",

        radius: quake.properties.mag * 25000
      })
        .bindPopup("<h3>Location: " + quake.properties.place + "<h3><h3>Magnitude: " + quake.properties.mag + "<h3>");
      quakeMarker.push(quakeMark);
    }
    else {
      var quakeMark = L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]],{
        fillOpacity: 0.75,
        color: "white",
        fillColor: "red",
        radius: quake.properties.mag * 25000
      })
        .bindPopup("<h3>Location: " + quake.properties.place + "<h3><h3>Magnitude: " + quake.properties.mag + "<h3>");
      quakeMarker.push(quakeMark);
    }
  }
  createMap(L.layerGroup(quakeMarker));
}
function createMap(mapEarthQuakes) {
  var emap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  var baseMaps = {
    "Light Map": emap
  };
  var map = L.map("map-id", {
    center: [39.09, -95.71],
    zoom: 5,
    layers: [emap, mapEarthQuakes]
  });
  function getColor(d) {
    return d > 5  ? 'red' :
           d > 4  ? 'pink' :
           d > 3   ? 'purple' :
           d > 2   ? 'orange' :
           d > 1   ? 'yellow' :
                      'green';
}
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        magRating = [0, 1, 2, 3, 4, 5],
        labels = [];

    for (var i = 0; i < magRating.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(magRating[i] + 1) + '"></i> ' +
            magRating[i] + (magRating[i + 1] ? '&ndash;' + magRating[i + 1] + '<br>' : '+');
    }
    return div;
};
legend.addTo(map);
}

