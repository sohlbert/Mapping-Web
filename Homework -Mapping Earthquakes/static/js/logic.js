//HOMEWORK
//URLs to USGS earthquake data JSONs
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var query2 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"

//Pulling data 
d3.json(queryUrl, function(data) {
  // sending through function
  createFeatures(data.features);
});


function createFeatures(earthquakeData) {


  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
      "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      var color;
      var r = 255;
      var g = Math.floor(255-80*feature.properties.mag);
      var b = Math.floor(255-80*feature.properties.mag);
      color= "rgb("+r+" ,"+g+","+ b+")"
      
      var geojsonMarkerOptions = {
        radius: 4*feature.properties.mag,
        fillColor: color,
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  });
  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY
});

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 3,
    layers: [streetmap, earthquakes]
  });


  function getColor(d) {
      return d < 1 ? 'rgb(255,255,255)' :
            d < 2  ? 'rgb(255,225,225)' :
            d < 3  ? 'rgb(255,195,195)' :
            d < 4  ? 'rgb(255,165,165)' :
            d < 5  ? 'rgb(255,135,135)' :
            d < 6  ? 'rgb(255,105,105)' :
            d < 7  ? 'rgb(255,75,75)' :
            d < 8  ? 'rgb(255,45,45)' :
            d < 9  ? 'rgb(255,15,15)' :
                        'rgb(255,0,0)';
  }

  // function chooseColor(magnitude) {
  //   return magnitude > 5 ? "red":
  //     magnitude > 4 ? "orange":
  //       magnitude > 3 ? "gold":
  //         magnitude > 2 ? "yellow":
  //           magnitude > 1 ? "yellowgreen":
  //             "greenyellow"; // <= 1 default
  // }

  // Create a legend to display information about our map
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 1, 2, 3, 4, 5, 6, 7, 8],
      labels = [];

      div.innerHTML+='Magnitude<br><hr>'
  
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
  
  return div;
  };
  
  legend.addTo(myMap);

}







// function createMarkers(response) {
//   // Pull the info off of response.data
//   // var prop = response["features"][0];

//   // console.log(response["features"][1]["geometry"]["coordinates"])
  
//   var lat = [response["features"][1]["geometry"]["coordinates"][0],
//   var lon = [response["features"][1]["geometry"]["coordinates"][1],

//   console.log(lat)
//   console.log(lon)


  
//   // Initialize an array to hold quake markers
//   var quakeMarkers = [];
//   // Loop through the features array
//   for (var index = 0; index < features.length; index++) {
//     var features = features[index];
//     // For each station, create a marker and bind a popup with the station's name
//     var quakeMarkers = L.marker([response["features"][1]["geometry"]["coordinates"]])
//       .bindPopup("<h3>" + response["features"][index]["properties"]["mag"] + "<h3><h3>Capacity: " + features.properties.place + "<h3>");
//     // Add the marker to the bikeMarkers array
//     quakeMarkers.push(quakeMarkers);
//   }
//   // Create a layer group made from the bike markers array, pass it into the createMap function
//   createMap(L.layerGroup(quakeMarkers));
// }
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);





// // Making the data points on the map cluster
// d3.json(link, function(data) {
//   // Create a new marker cluster group
//   var markers = L.markerClusterGroup();
//   // Loop through data
//   for (var i = 0; i < data.length; i++) {
//     // Set the data location property to a variable
//     var location = data[i].location;
//     // Check for location property
//     if (location) {
//       // Add a new marker to the cluster group and bind a pop-up
//       markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
//         .bindPopup(data[i].descriptor));
//     }
//   }
//   // Add our marker cluster layer to the map
//   map.addLayer(markers);
// });


// Creating the Legend

// legend.onAdd = function(map) {

//   var div = L.DomUtil.create('div', 'info legend'),
//       magnitude = [0, 1, 2, 3, 4, 5],
//       labels = [];

//   div.innerHTML += "<h4 style='margin:4px'>Magnitude</h4>"

//   for (var i = 0; i < magnitude.length; i++) {
//       div.innerHTML +=
//           '<i style="background:' + Color(magnitude[i] + 1) + '"></i> ' +
//           magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
//   }

//   return div;
// };
// legend.addTo(mymap);

