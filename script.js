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

      var lon = response.coord.lon;
      var lat = response.coord.lat;
      var icon = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";

      $("#city").text(response.name);
      $("#date").text("(" + new Date().toLocaleDateString() + ")");
      $("#icon").attr("src", icon);
      $("#temperature").text("Temperature: " + response.main.temp + "\xB0" + "F");
      $("#humidity").text("Humidity: " + response.main.humidity + "%" );
      $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");

      $("#cityName").val("");

      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=430c1d68fb49da82de0adb57f3d4371a",
        method: "GET"
      }).then(function(response) {
        console.log(response);
        console.log(response.value);
        $("#uv").text("UV Index: ");
        $("#uvIndex").text(response.value);
        if (response.value >= 10){
          $("#uvIndex").attr("style", "background-color: red");
        }
        else if (response.value >= 5){
          $("#uvIndex").attr("style", "background-color: yellow");
        }
        else{
          $("#uvIndex").attr("style", "background-color: green");
        }
      });

    });



    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=430c1d68fb49da82de0adb57f3d4371a",
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });

    

});

