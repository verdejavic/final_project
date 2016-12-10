var map = L.map('demoMap').setView([37.8, -96], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmVyZGVqYXZpYyIsImEiOiJjaXZvNjV1eWQwMTR5MnpwY2cwc3ZobXN4In0.yNm14IMV2WWg4aQVVrQzHA', {
    id: 'verdejavic.278g414a',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
   maxZoom: 18,
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<h4>New Cancer Cases in the US</h4>' +  (props ?
    '<b>' + props.name + '</b><br />' + props.density + ' cases'
    : 'Hover over a state');
};

info.addTo(map);

function getColor(density) {
    return density > 105000 ? '#084594' :
           density > 90000  ? '#2171b5' :
           density > 75000  ? '#4292c6' :
           density > 60000  ? '#6baed6' :
           density > 45000  ? '#9ecae1' :
           density > 30000  ? '#c6dbef' :
           density > 15000  ? '#deebf7' :
                      '#f7fbff';
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

function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}

	var geojson;

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

	geojson = L.geoJson(statesData, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);

	map.attributionControl.addAttribution('Data from &copy; <a href="http://www.cdc.gov/cancer/dcpc/data/state.htm">Centers for Disease Control and Prevention</a>');


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 15000, 30000, 45000, 60000, 75000, 90000, 105000],
    labels = [],
    from, to;

  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(
      '<i style="background:' + getColor(from + 1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  }

  div.innerHTML = labels.join('<br>');
  return div;
};

legend.addTo(map);

//trialsMap

var map = L.map('trialsMap').setView([26.82, 30.8], 1.5);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmVyZGVqYXZpYyIsImEiOiJjaXZvNjV1eWQwMTR5MnpwY2cwc3ZobXN4In0.yNm14IMV2WWg4aQVVrQzHA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'verdejavic.278g414a',
}).addTo(map);

for ( var i=0; i < clinicalTrials.length; i++) {
  L.marker( [clinicalTrials[i].latitude, clinicalTrials[i].longitude] )
  .bindPopup( '<h5>' + clinicalTrials[i].trialname + '</h5>' +  '</h6>' + clinicalTrials[i].location + '</h6>' + '<p>' + 'Contact: '  + '<br>' + clinicalTrials[i].contactname  + '<br>' + clinicalTrials[i].contacttitle  + '<br>' + clinicalTrials[i].contactcompany  + '<br>' + clinicalTrials[i].contactemail + '<br>' + 'ClinicalTrials.gov Identifier: ' + clinicalTrials[i].identifier + '</p>' )
  .addTo(map);
}
