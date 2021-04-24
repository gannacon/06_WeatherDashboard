var userFormEl = document.getElementById('city-form');
var cityInputEl = document.getElementById('city-input');
var historyContainer = document.getElementById('cities-buttons');
  //blank array for the cities
  var cities = [];

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
        searchCities(lat, lon)
      });
    };

  //------------------------------------------------------------------------------------------------------------------------
  // FUNCTION TO SEARCH FOR CITIES FROM LONG AT LAT INPUT
  function searchCities(lat, lon){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat+ "&lon=" + lon + "&exclude=hourly,daily&appid=a873b655819c186e5b36d85b35271417")
      .then(function (response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        var HisBtn = document.createElement('button')
        HisBtn.textContent = data.timezone;
        historyContainer.append(HisBtn);

      });
    };

  //------------------------------------------------------------------------------------------------------------------------
  // READING THE CLICK OF THE BUTTON




  // BY CLICKING THE SUBMIT BUTTON IT WILL RUN THE GET LONG AND LAT BUTTON
  userFormEl.addEventListener('submit', formSubmitHandler);



// searchCities();
 
