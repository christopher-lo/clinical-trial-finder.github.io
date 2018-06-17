var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
var crd = new Object();
var map;

var markerGroup;
var current_location;

function success(pos) {
  crd = pos.coords;
  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  
  var latlon = pos.coords.latitude + "," + pos.coords.longitude;

  map = new L.map('map',{
  center: [crd.latitude, crd.longitude],
  zoom: 10});

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  current_location = L.layerGroup().addTo(map);
  L.marker([crd.latitude, crd.longitude], {icon: redIcon}).addTo(current_location);
  

  find(crd.latitude, crd.longitude);

}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
navigator.geolocation.getCurrentPosition(success, error, options);

