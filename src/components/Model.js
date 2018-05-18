
import json from "./city.list.json";
import db from './firebaseInit';
import firebase from 'firebase';

//import firebase from 'firebase'
//import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
//const firebaseApp = firebase.initializeApp(firebaseConfig)
//export default firebaseApp.firestore()

//import * as firebase from './firebaseConfig';
const Model = function () {

  let observers = [];
  let cities = [];
  let currentCity = "";
  let weatherList = [];
  let days = 0;
  let favorites = [];
  let userId = 0 || localStorage.getItem("userId");
  var database = firebase.database();
  let results = [];
  let loading = true;

  this.getLoading = function(){
    return loading;
  }

  /* we choose how many cities we want to be able to search from. more cities -> slower
  the cities are then taken from the database (containing the JSON-file) in Firebase put in a special list called 'cities' */
  this.getCities = function(str){
    // we want to be able to search from 5000 cities. this can be changed but affects speed. database contains ca 250 000 cities
    cities = []
    if(str.length >= 1){
      for(var i=0; i<5000;i++){
        database.ref(i).on('value', function(snapshot) {
          if(snapshot.val().name.toLowerCase().startsWith(str)){
            cities.push(snapshot.val());
          }
          if (cities.length >= 10) {
            cities = cities.slice(0,10);
            cities.sort();
            return cities;
          }
        });
      }
    }
    return cities;
  }

  // the users favorite-cities are set here
  this.setFavorites = function(obj){
    db.collection('favourites' + this.getUser() + '/').doc("city" + obj.id).set({
      id: obj.id,
      name: obj.name
    })
    .then(function(){
      console.log("Success");
    })
    .catch(function(error){
      console.error("error", error);
    });

    // we only need the id and name of the cities in our favorites-list
    var favData = {
      id: obj.id,
      name: obj.name
    };
    for(var i=0; i<favorites.length; i++){
      if(favData.id === favorites[i].id){
          alert("You already added this city");
          return;
        }
    }
    favorites.push(favData);
    notifyObservers();
  }

  // collect the users favorites from the database
  this.getFavorites = function(){
    favorites = [];
    db.collection('favourites' + this.getUser()).get().then(function(querySnapshot){
          querySnapshot.forEach(function(doc) {
            const data = {
              'id': doc.data().id,
              'name': doc.data().name
            }
            favorites.push(data)
          })
        })
    return favorites;
  }

  // remove one of the users favorites from the favorites list
  this.removeFromFavorites = function(obj){
    for(var i=0; i< favorites.length; i++){
      if(obj.id === favorites[i].id){
        favorites.splice(i, 1);
        db.collection('favourites' + this.getUser()).doc('city' + obj.id).delete().then(function(){
        }).catch(function(error){
          alert("failed to remove city from favorites");
          console.error("error removing favorites", error);
        });
        return;
      }
    }
    notifyObservers();
  }

  // sets the current user
  this.setUser = function(id){
    userId = id;
    localStorage.setItem('userId', userId);
    notifyObservers();
  }

  this.getUser = function(){
    if(userId != 0){
      userId = localStorage.getItem("userId");
    }
    return userId;
  }

  this.setSelectedDays = function(num){
    days = num;
    notifyObservers();
  }

  this.getSelectedDays = function(){
    return days;
  }

  this.setWeatherList = function (obj){
    // adding the weather object to the users list of searched cities in the database
    db.collection('Searches' + this.getUser() + '/').doc("city" + obj.id).set({
      id: obj.id,
      name: obj.name,
      clouds: obj.clouds.all,
      temp: obj.main.temp,
      info: obj.weather[0].description
    }).then(function(){
      console.log("success");
    })
    .catch(function(error){
      console.error("error", error);
    });

    // pushing the weather object to the local weatherList which is used in Destinations.vue
    var weatherData = {
      id: obj.id,
      name: obj.name,
      clouds: obj.clouds.all,
      temp: obj.main.temp,
      info: obj.weather[0].description
    }
    if(weatherList.length === 0){
      weatherList.push(weatherData);
      
    }else{
      for(var i=0; i<weatherList.length; i++){
        if(weatherData.id === weatherList[i].id){
            alert("You already added this city");
            return;
          }
      }
      weatherList.push(weatherData);    
    }
    notifyObservers();
  }


  // returns all the user's searched cities aka weatherList
  this.getWeatherList = function(){
    weatherList = [];
    db.collection('Searches' + this.getUser() + '').get().then(function(querySnapshot){
          querySnapshot.forEach(function(doc) {
            const data = {
              'id': doc.data().id,
              'name': doc.data().name,
              'clouds': doc.data().clouds,
              'temp': doc.data().temp,
              'info': doc.data().info
            }
            weatherList.push(data)
          })
        })
    loading = false;
    return weatherList;
  }

  // remove city from the user's list of cities
  this.removeFromWeatherList = function(obj){

    for(var i=0; i< weatherList.length; i++){
      if(obj.id === weatherList[i].id){
        weatherList.splice(i, 1);
        db.collection('Searches' + this.getUser()).doc('city' + obj.id).delete().then(function(){
          console.log("successfully deleted")
        }).catch(function(error){
          alert("failed to remove city from your search results");
          console.error("error removing searh results", error);
        });
        return;
      }
    }
    notifyObservers();
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
