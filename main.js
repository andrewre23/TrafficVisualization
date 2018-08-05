var mymap = L.map('map', {
    center: [50.45, -2.58],
    zoom: 6
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWJxMTk5NCIsImEiOiJjamtkMnltczgwNnZyM2t0NjNyZm1oY2thIn0.cEdhzPq5MSvanYSSe-xHGg\n'
}).addTo(mymap);

L.geoJSON(markers, {
    // Options here


}).addTo(mymap);

