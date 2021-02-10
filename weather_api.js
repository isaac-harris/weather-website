document.getElementById("scan").onclick = function() {weatherFunction()};

function weatherFunction() {

const ul = document.getElementById("weather");
const url = "http://api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=0.1278&appid=7edd3815d4262f09773bd7e52ac2512c";
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
