document.getElementById("scan").onclick = function() {getLocation()};

function getLocation() {
  if (document.getElementById("location_box").value != "") {
    geocodeWeatherFunction();
  } else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(weatherFunction);
    } else {
      console.log("Geolocation is not support by your browser");
    }
  }
}
function geocodeWeatherFunction() {
  document.getElementById("weather").innerHTML = " ";
  document.getElementById("weather").classList.add("loader");

  const url_g = "https://geocode.xyz/" + document.getElementById("location_box").value + "?json=1";
  let lat = "";
  let long = "";
  fetch(url_g)
  .then((resp) => resp.json())
  .then(function(data_g) {
      lat = data_g.latt;
      long = data_g.longt;
      const ul = document.getElementById("weather");
      const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + 
      long + "&appid=7edd3815d4262f09773bd7e52ac2512c";
      let weather = "";
      fetch(url)
      .then((resp) => resp.json())
      .then(function(data) {
      weather = data.coord.lat + ", " + data.coord.lon + "<br>" + data.weather[0].main + " - " + data.weather[0].description +
      "<br>Temperature: " + Math.round(data.main.temp - 273.15) + "\u00B0" +  "C" +
      "<br>Humidity: " + data.main.humidity + "%";

      setTimeout(() => { document.getElementById("weather").classList.remove("loader"); ul.innerHTML = weather; }, 200);
      })
    .catch(function(error) {
      console.log(error);
    });
    })
    .catch(function(error) {
      console.log(error);
    });
}
function weatherFunction(position) {

  if (document.getElementById("weather").innerHTML != "") {
    return;
  }

  document.getElementById("weather").classList.add("loader");

  const ul = document.getElementById("weather");
  const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=7edd3815d4262f09773bd7e52ac2512c";
  let weather = "";
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    weather = data.coord.lat + ", " + data.coord.lon + "<br>" + data.weather[0].main + " - " + data.weather[0].description +
    "<br>Temperature: " + Math.round(data.main.temp - 273.15) + "\u00B0" +  "C" +
    "<br>Humidity: " + data.main.humidity + "%";
    })
  .catch(function(error) {
    console.log(error);
  });

  setTimeout(() => { document.getElementById("weather").classList.remove("loader"); ul.innerHTML = weather; }, 200);
}
