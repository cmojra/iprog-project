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
					</div>

				</div>

			</nav>

		</div>
  </div>
</template>

<script>
import {modelInstance} from "./Model";
  export default {
    //props: ['model'],
    // this methods is called by React lifecycle when the
    // component is created that's a good place to setup model observer
    created() {
      modelInstance.addObserver(this)
    },

    // this is called when component is removed destroyed
    // good place to remove observer
    beforeDestroy() {
      modelInstance.removeObserver(this)
    },

    mounted(){

    },

    // we define and initalise the data we want to use and modify in the component
    data() {
      return {
        days: 7,
        numbers: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
        cities: [],
        citySelected: "",
        search: ""
      }
    },

    methods: {

      update(){

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
      }
    }
  }
</script>

<style scoped>

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

  #remove:hover{
    background-color: red;
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
