var mapboxAccessToken =  'pk.eyJ1IjoidmVyZGVqYXZpYyIsImEiOiJjaXZvNjV1eWQwMTR5MnpwY2cwc3ZobXN4In0.yNm14IMV2WWg4aQVVrQzHA';

var map = L.map('demoMap').setView([37.8, -96], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'verdejavic.278g414a',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
   maxZoom: 18,
}).addTo(map);

L.geoJson(statesData).addTo(map);


function getColor(d) {
    return d > 105000 ? '#ffffcc' :
           d > 90000  ? '#c7e9b4' :
           d > 75000  ? '#7fcdbb' :
           d > 60000  ? '#41b6c4' :
           d > 45000  ? '#1d91c0' :
           d > 30000  ? '#225ea8' :
           d > 15000  ? '#0c2c84' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: style}).addTo(map);
