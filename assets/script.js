var userFormEl = document.getElementById('city-form');
var cityInputEl = document.getElementById('city-input');
var historyContainer = document.getElementById('cities-buttons');
var weatherInformation = document.getElementById('weatherData');
  //blank array for the cities history
  var citiesHistory = [];

  //------------------------------------------------------------------------------------------------------------------------
  /* FORM SUBMIT HANDLER. ON SUBMIT BUTTON CLICK IT WILL TAKE THE USERS INPUT AND IF
  IT IS VALID IT WILL PUSH INTO THE GETLONGANDLAT FUNCTION
  */
var formSubmitHandler = function(event) {
  event.preventDefault();

  var city = cityInputEl.value.trim();

  if (city) {
    getLongAndLat(city); 
  } 
}

  //------------------------------------------------------------------------------------------------------------------------
  /* FUNCTION RUNS AFTER THE SUBMIT BUTTON IS CLICKED. READS THE USER INPUT AND PLACES IT INOT THE API.
  */
  function getLongAndLat(userCityInput){
    var LLApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + userCityInput + "&limit=1&appid=a873b655819c186e5b36d85b35271417"

    fetch(LLApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var lat = data[0].lat;
        console.log(lat);
        var lon = data[0].lon;
        console.log(lon);
        searchCities(lat, lon);
        console.log(data[0].name);
        var cityName = document.createElement('h1')
        var name = document.createTextNode(data[0].name);
        cityName.appendChild(name);
        weatherInformation.appendChild(cityName);
      });
    };

  //------------------------------------------------------------------------------------------------------------------------
  // FUNCTION TO SEARCH FOR CITIES FROM LONG AT LAT INPUT
  function searchCities(lat, lon){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat+ "&lon=" + lon + "&exclude=&appid=a873b655819c186e5b36d85b35271417")
      .then(function (response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        HisBtn = document.createElement('button')
        HisBtn.textContent = data.timezone;
        citiesHistory.push(data.timezone);
        historyContainer.append(HisBtn);

        renderWeatherData(data);
      });
    };

  //------------------------------------------------------------------------------------------------------------------------
  // RENDERING THE WEATHER DATA

  function renderWeatherData(data){

    var now = dayjs();
    $('#today').text(now.format('MMM D, YYYY'));
    console.log(data.current.temp);
    var currentTemp = document.createElement('h2')
    var temp = document.createTextNode("Current Temperature: " + data.current.temp);
    currentTemp.appendChild(temp);
    weatherInformation.appendChild(currentTemp);
    // var date = document.createTextNode(currentDate)
    // holidayContainer.appendChild(date);
  };

  //------------------------------------------------------------------------------------------------------------------------
  // READING THE CLICK OF THE BUTTON




  // BY CLICKING THE SUBMIT BUTTON IT WILL RUN THE GET LONG AND LAT BUTTON
  userFormEl.addEventListener('submit', formSubmitHandler);




 
