var cities = [];
var citiesDiv = $("#citiesDiv");

initCities();

function initCities() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        cities = storedCities;
        renderCities();
    }
}

function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

function renderCities() {
    citiesDiv.empty();
    for (i=0; i < cities.length; i++) {
        citiesDiv.prepend("<button style='width: 170px; height: 50px;'>" + cities[i] + "</button>" + "<br>");
      }
}

function addCity() {
    var city = $("#cityName").val();
    cities.push(city);
    renderCities();
}

console.log(new Date().toLocaleDateString());

$("#run-search").on("click",function(event){
    event.preventDefault();
    addCity();
    storeCities();
    var city = $("#cityName").val();
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=430c1d68fb49da82de0adb57f3d4371a&units=imperial&mode=xml";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=430c1d68fb49da82de0adb57f3d4371a&units=imperial";
    // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&appid=430c1d68fb49da82de0adb57f3d4371a&units=imperial";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(response.dt.toLocaleDateString());
  
    //   $("#weatherIcon").html(response.weather[0].icon);

      $("#cityName").val("");
    });
});

