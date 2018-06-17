function find(lat, lon) {
markerGroup = L.layerGroup().addTo(map);

map.panTo(new L.LatLng(lat, lon));

const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
var websiteName = new String();

websiteName = "https://clinicaltrialsapi.cancer.gov/v1/clinical-trials?sites.org_coordinates_lat=" + lat + "&sites.org_coordinates_lon=" + lon + "&sites.org_coordinates_dist=50mi"
console.log(websiteName);

request.open('GET', websiteName, true);
//request.open('GET', 'https://clinicaltrialsapi.cancer.gov/v1/clinical-trials?sites.org_coordinates_lat=40&sites.org_coordinates_lon=-80&sites.org_coordinates_dist=50mi', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  data = data.trials;
  console.log(data);


  if (request.status >= 200 && request.status < 400) {
    data.forEach(trial => {
      //console.log(trial);
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = trial.brief_title;

      const p = document.createElement('p');
      trial.brief_summary = trial.brief_summary.substring(0, 300);
      p.textContent = `${trial.brief_summary}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
	var i = 0;
	trial.sites.forEach(site => {
	  //console.log(Object.keys(site));
	  //console.log(site.org_coordinates);
	  if (typeof site.org_coordinates !== 'undefined') {
	    diff = Math.pow(Math.abs(site.org_coordinates.lat-lat),2) + Math.pow(Math.abs(site.org_coordinates.lon-lon),2);

	    if (Math.sqrt(diff) < 1) {
	      //console.log(trial.sites[i].org_coordinates.lat);
	      //L.marker([52.520861, 13.409564]).addTo(markerGroup);
	      L.marker([trial.sites[i].org_coordinates.lat, trial.sites[i].org_coordinates.lon]).addTo(markerGroup);
	      //L.marker([trial.sites[i].org_coordinates.lat, trial.sites[i].org_coordinates.lon]).addTo(map);
	    }
	  }
	  i += 1;
	});
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();

}

function clearMap() {
  map.removeLayer(markerGroup);
  map.removeLayer(current_location);
}