
import json from "./city.list.json"
const Model = function () {

  let observers = [];
  let cities = json;
  let currentCity = "";
  let weatherList = [];
  let days = 0;
  let favorites = [];

  var storage = firebase.storage();
  //var storageRef = storage.ref();
  //var imageRef = storageRef.child('bigbang.jpg');
  var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/iprog-project-76738.appspot.com/o/bigbang.jpg?alt=media&token=be91f910-e935-4b20-8255-4c7cbb524a61');
  var imgUrl = 'https://firebasestorage.googleapis.com/v0/b/iprog-project-76738.appspot.com/o/bigbang.jpg?alt=media&token=be91f910-e935-4b20-8255-4c7cbb524a61';

  // function for autocompleting input in searchbar
  this.autoComplete = function (str){
    var results = [];
    var nrOfResults = 1;
    str = str.toLowerCase();
    if (str.length >= 1) {
      nrOfResults = 0;
      for (var i = 0; i < json.length; i++) {
        if (json[i].name.toLowerCase().startsWith(str)) {
          results.push(json[i]);
          nrOfResults++;
        }
      }
    }
    if(nrOfResults < 10 && nrOfResults >= 1) {
      results.sort();
      return results;
    }
    else if(nrOfResults > 10) {
      nrOfResults = 10;
      console.log("hej");
      results = results.slice(0,nrOfResults);
      results.sort();
      return results;
    }
    else{
      results = [];
      return results;
    }
  }

  this.setFavorites = function(obj){
    for(var i=0; i< favorites.length; i++){
        if(obj.id === favorites[i].id){
          alert("You already added this city as your favorite");
          return;
        }
      }
    favorites.push(obj);
    console.log(favorites);
    notifyObservers();
  }

  this.getFavorites = function(){
    return favorites;
  }

  this.removeFromFavorites = function(obj){
    for(var i=0; i< favorites.length; i++){
      if(obj.id === favorites[i].id){
        favorites.splice(i, 1);
        return;
      }
    }
    notifyObservers();
  }

  this.setSelectedDays = function(num){
    days = num;
    notifyObservers();
  }

  this.getSelectedDays = function(){
    return days;
  }

  // pushing the weather object to our weatherList containing the weather of the destinations the user has chosen
  this.setWeatherList = function (weather){
    if(weatherList.length === 0){
      weatherList.push(weather);
      localStorage.setItem("weatherList", JSON.stringify(weatherList));
    }
    else{
      for(var i=0; i< weatherList.length; i++){
        if(weather.id === weatherList[i].id){
          alert("You already added this city");
          return;
        }
      }
      weatherList.push(weather);
      localStorage.setItem("weatherList", JSON.stringify(weatherList));
    }
    notifyObservers();
  }


  this.getWeatherList = function(){
    if(weatherList[0] != null){
      var storedWeather = JSON.parse(localStorage.getItem("weatherList"));
      if(storedWeather[0] != null){
        weatherList = storedWeather;
      }
    }else{
      var storedWeather = JSON.parse(localStorage.getItem("weatherList"));
      if(storedWeather[0] != null){
        weatherList = storedWeather;
      }
    }
    return weatherList;
  }

  // calculating the temperature/cloud/ or humidity values for the selected amount of days
  this.getValue = function(num, humidity, temp, clouds, humList, tempList, cloudList){
    if(humidity === true){
      var hum=0;
      for(var i=0; i<num*8; i++){
        hum += humList[i][1];
      }
      return (hum/(num*8)) + " %";
    }else if(clouds=== true){
      var cloud = 0;
      for(var i=0;i<num*8;i++){
        cloud +=cloudList[i][1];
      }
      return (cloud/(num*8)) + " %";
    }else{
      var temp = 0;
      for(var i=0;i<num*8;i++){
        temp +=tempList[i][1];
      }
      return (temp/(num*8)) + " C";
    }
  }

  // remove city from list of destinations
  this.removeFromWeatherList = function(id){
    for(var i=0; i< weatherList.length; i++){
      if(id === weatherList[i].id){
        weatherList.splice(i, 1);
        localStorage.setItem("weatherList", JSON.stringify(weatherList));
        return;
      }
    }
    notifyObservers();
  }

  this.setCurrentCity = function(id){
    currentCity = id;
    localStorage.currentCity = id;
  }

  this.getCurrentCity = function(){
    currentCity = localStorage.currentCity;
    return currentCity;
  }

  this.clearCurrentCity = function(){
    notifyObservers();
  }


  // API Calls

  this.getWeatherForecast = function(id){
    const url = "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&APPID=6136693860b8ed827adace0ea28df125"
    return fetch(url)
      .then(processResponse)
      .catch(handleError)
  }


  this.getWeather = function (id) {
    //https://api.openweathermap.org/data/2.5/forecast?id={city ID}
    const url = "https://api.openweathermap.org/data/2.5/weather?id=" + id + "&APPID=6136693860b8ed827adace0ea28df125"
    
    return fetch(url)
      .then(processResponse)
      .catch(handleError)
  }

  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }

  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getWeather() API Error:', error.message || error)
      })
    } else {
      console.error('getWeather() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
    

  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new Model();
