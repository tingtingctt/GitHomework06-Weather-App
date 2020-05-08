var cities = [];
var citiesDiv = $("#citiesDiv");
var city = "";
var lastCity = "";

initCities();

// get scored cities info and render last searched weather
function initCities() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    var storedLastCity = localStorage.getItem("lastCity");
    if (storedCities !== null) {
        cities = storedCities;
        lastCity = storedLastCity;

        renderCities();
        showWeather(lastCity);
    }
}

// store cities array
function storeCities() {
    localStorage.setItem("lastCity", city);
    localStorage.setItem("cities", JSON.stringify(cities));
    
}

// render cities array
function renderCities() {
    citiesDiv.empty();
    for (i=0; i < cities.length; i++) {
      var cityBtn = $("<button>");
      cityBtn.attr("style", "width: 170px; height: 50px; border-radius: 10px;");
      cityBtn.attr("class", "cityBtn");
      cityBtn.attr("data-city", cities[i]);
      cityBtn.text(cities[i]);
      citiesDiv.prepend("<br>");
      citiesDiv.prepend(cityBtn);
      }
}

// push new city to the cities array
function addCity() {
    var newCity = $("#cityName").val();
    cities.push(newCity);
    renderCities();
}

// show weather of the selected city
function showWeather(showCity) {
  console.log("hello");

  $("#day1").empty();
  $("#day2").empty();
  $("#day3").empty();
  $("#day4").empty();
  $("#day5").empty();

  // current weather ajax call
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + showCity +"&appid=430c1d68fb49da82de0adb57f3d4371a&units=imperial";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

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


    // current uv index ajax call
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=430c1d68fb49da82de0adb57f3d4371a",
      method: "GET"
    }).then(function(response) {
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

  // future weather ajax call
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + showCity + "&appid=430c1d68fb49da82de0adb57f3d4371a&units=imperial",
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var iconLink0 = "http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png";
    var iconImg0 = $("<img>");
    iconImg0.attr("src", iconLink0);

    $("#title").text("5-Day Forecast");
    $("#day1").append("<br>");
    $("#day1").append(response.list[0].dt_txt.slice(0,10));
    $("#day1").append("<br><br>");
    $("#day1").append(iconImg0);
    $("#day1").append("<br><br>");
    $("#day1").append("Temp: " + response.list[0].main.temp + "\xB0" + "F");
    $("#day1").append("<br><br>");
    $("#day1").append("Humidity: " + response.list[0].main.humidity + "%");
    $("#day1").append("<br><br>");


    var iconLink8 = "http://openweathermap.org/img/w/" + response.list[8].weather[0].icon + ".png";
    var iconImg8 = $("<img>");
    iconImg8.attr("src", iconLink8);
    $("#title").text("5-Day Forecast");
    $("#day2").append("<br>");
    $("#day2").append(response.list[8].dt_txt.slice(0,10));
    $("#day2").append("<br><br>");
    $("#day2").append(iconImg8);
    $("#day2").append("<br><br>");
    $("#day2").append("Temp: " + response.list[8].main.temp + "\xB0" + "F");
    $("#day2").append("<br><br>");
    $("#day2").append("Humidity: " + response.list[8].main.humidity + "%");
    $("#day2").append("<br><br>");


    var iconLink16 = "http://openweathermap.org/img/w/" + response.list[16].weather[0].icon + ".png";
    var iconImg16 = $("<img>");
    iconImg16.attr("src", iconLink16);
    $("#title").text("5-Day Forecast");
    $("#day3").append("<br>");
    $("#day3").append(response.list[16].dt_txt.slice(0,10));
    $("#day3").append("<br><br>");
    $("#day3").append(iconImg16);
    $("#day3").append("<br><br>");
    $("#day3").append("Temp: " + response.list[16].main.temp + "\xB0" + "F");
    $("#day3").append("<br><br>");
    $("#day3").append("Humidity: " + response.list[16].main.humidity + "%");
    $("#day3").append("<br><br>");


    var iconLink24 = "http://openweathermap.org/img/w/" + response.list[24].weather[0].icon + ".png";
    var iconImg24 = $("<img>");
    iconImg24.attr("src", iconLink24);
    $("#title").text("5-Day Forecast");
    $("#day4").append("<br>");
    $("#day4").append(response.list[24].dt_txt.slice(0,10));
    $("#day4").append("<br><br>");
    $("#day4").append(iconImg24);
    $("#day4").append("<br><br>");
    $("#day4").append("Temp: " + response.list[24].main.temp + "\xB0" + "F");
    $("#day4").append("<br><br>");
    $("#day4").append("Humidity: " + response.list[24].main.humidity + "%");
    $("#day4").append("<br><br>");


    var iconLink32 = "http://openweathermap.org/img/w/" + response.list[32].weather[0].icon + ".png";
    var iconImg32 = $("<img>");
    iconImg32.attr("src", iconLink32);
    $("#title").text("5-Day Forecast");
    $("#day5").append("<br>");
    $("#day5").append(response.list[32].dt_txt.slice(0,10));
    $("#day5").append("<br><br>");
    $("#day5").append(iconImg32);
    $("#day5").append("<br><br>");
    $("#day5").append("Temp: " + response.list[32].main.temp + "\xB0" + "F");
    $("#day5").append("<br><br>");
    $("#day5").append("Humidity: " + response.list[32].main.humidity + "%");
    $("#day5").append("<br><br>");
  });
}


// ------------------ event listeners -----------------------

// click city buttons to show weather
$(document).on("click",".cityBtn", function(event){
  event.preventDefault();
  
  
  city = $(this).attr("data-city");
  console.log(city);

  showWeather(city);
});


// click search button to show weather and add city buttons
$("#run-search").on("click",function(event){
    event.preventDefault();

    city = $("#cityName").val();
    console.log(city);

    addCity();
    storeCities();
    showWeather(city);
});

