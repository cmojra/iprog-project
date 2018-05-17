<template>
  <div class="sidebar col-12 col-md-3">
    <div class="" id="leftContainer" style="width: 100%;">

 			<nav class="navbar flex-md-column navbar-expand-lg bg-faded navbar-light" id="navView" >
				<div class="navbar-brand my-auto">
					<h3 id="text">Search City</h3>
				</div>

				<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent2" id="navBtn">
	   				<span class="navbar-toggler-icon"></span>
	 			</button>

	 			<div class="collapse navbar-collapse flex-md-column" id="navbarSupportedContent2" style="width: 100%;" >
					<div class="container-fluid">
            <div class="row">
              <div class="form-group col-12">
                <label>Last search: {{citySelected}}</label>
                <input type="text" class="form-control" id="search-input" placeholder="Search..." v-model="search" onkeypress="return event.keyCode != 13" v-on:keyup="getSearchOptions(search)">
                <div v-if="cities.length == 0 && search.length != 0">No results found</div>
                <div v-else v-for="(city, index) in cities" @click="setCity(cities[index].name, cities[index].id), getSearchOptions(' ')" class="col-12" id="cities">
                {{cities[index].name}} - {{cities[index].country}}
                </div>
              </div>
            </div>
            <div class="row">
              <h3>Favorites for user {{getUser()}}</h3>
              <div class="col-12" v-for="(city, index) in favorites">
                <div class="row">
                  <div class="col-1" @click="removeFavorite(favorites[index])">
                   <h6 id="remove">&#9746</h6>
                  </div>
                 <div class="col-10" @click="setCurrentCity(favorites[index].id)">
                    <router-link v-bind:to="'/detailedview/' + favorites[index].id">{{favorites[index].name}}</router-link>
                 </div>
               </div>
              </div>
            </div>
           <!-- <div class="row">
              <h3>Favorites</h3>
              <div v-for="(city, index) in favorites">
                {{cities[index].name}}
              </div>
            </div>-->
					</div>

				</div>


			</nav>

		</div>
  </div>
</template>

<script>
import {modelInstance} from "./Model";
//  import db from './firebaseInit';
  export default {
    //props: ['model'],
    // this methods is called by React lifecycle when the
    // component is created that's a good place to setup model observer
    created() {
      modelInstance.addObserver(this)
      this.favorites = modelInstance.getFavorites();
    },

    // this is called when component is removed destroyed
    // good place to remove observer
    beforeDestroy() {
      modelInstance.removeObserver(this)
    },

    mounted(){
      //this.favorites = modelInstance.getFavorites();
    },

    // we define and initalise the data we want to use and modify in the component
    data() {
      return {
        days: 7,
        numbers: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
        cities: [],
        citySelected: "",
        search: "",
        favorites: [],
      }
    },

  /*created () {
        db.collection('favourites').orderBy('name').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc)
            const data = {
              'id': doc.id, //firebase id
              'fav_id': doc.data().id,
              'name': doc.data().name
            }
            this.testing.push(data)
          })
        })
      },*/

    methods: {

      update(){
        //this.favorites = modelInstance.getFavorites();
        //this.favorites = [];
        //this.favorites = modelInstance.getFavorites();
      },

      getUser(){
        return modelInstance.getUser();
      },

      getSearchOptions(str){
        this.cities = modelInstance.autoComplete(str)
      },

      // when a city is clicked in the drop down menu
      // weather conditions are collected from API
      // and added to our list of destinations
      setCity(str, id){
        this.citySelected = str
        this.search = ""
        modelInstance.getWeather(id).then(weather => {
          modelInstance.setWeatherList(weather)
          this.status = 'LOADED'
        }).catch(() => {
          this.status = 'ERROR'
        })
      },

      setDays(number){
        this.days = number
      },

      setCurrentCity(id){
        modelInstance.setCurrentCity(id);
      },

      removeFavorite(obj){
        modelInstance.removeFromFavorites(obj);
      }
    }
  }
</script>

<style scoped>

  a:hover,  a:visited,  a:link,  a:active {
    color: white;
    text-decoration: none;
  }

  #remove{
    font-size: 20px;
  }

  #remove:hover{
    color: black;
    cursor: pointer;
  }

  #cities{
    background: rgba(0, 0, 0, 0.8);
    color: white;
  }

  #citiesText{
    color: white;
  }

  #cities:hover{
    background-color: #555;
  }

  #leftContainer{
    background: rgba(0, 0, 0, 0.8);
    color: white;
  }

  #leftContainer:hover{
    box-shadow: 10px 10px 10px cyan;
  }

  #menuItem{
    color: white;
  }

  #menuItem:hover{
    background-color: #999;
  }

  #menuTitel{
    color: white;
    border-bottom: 2px solid;
  }

  #navBtn{
    background-color: rgba(119,136,153, 0.8);
  }

  a:hover,  a:visited,  a:link,  a:active {
    text-decoration: none;
  }

  #text{
    color: white;
  }

  #title{
    color: black;
  }

  #total{
    color: white;
    border-top: 2px solid;
    padding-top: 10px;
    text-align: right;

  }
</style>
