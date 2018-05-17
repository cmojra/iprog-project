<template>
  <div class="col-12 offset-md-3 col-md-9" id="rightContainer">
		<div class="container-fluid">
      <div class="row">

        <em v-if="loading === true">Loading...</em>
        <div v-for="(city, index) in weatherList" class="col-12 col-md-4 mt-4 pr-1">
          <div id="result2">
            <div class="row">
              <div class="col-1"  @click="remove(weatherList[weatherList.length - index -1])">
                <div class='box'>&#9746</div>
              </div>
              <div class="col-1 offset-9" @click="addToFavorites(weatherList[weatherList.length - index -1])">
                <div class='star'>&#9733</div>
              </div>
            </div>
            <div class="row pb-3">

              <div class="col-12" @click="setCurrentCity(weatherList[weatherList.length - index -1].id)">
                <router-link v-bind:to="'/detailedview/' + weatherList[weatherList.length - index -1].id">
                  <div class="col-12 pt-3 text-center">
                    <h4>{{weatherList[weatherList.length - index - 1].name}}</h4>
                  </div>

                  <div class="col-12 text-center">
                    <h6>Clouds: {{weatherList[weatherList.length - index - 1].clouds}} %</h6>
                  </div>

                  <div class="col-12 text-center">
                    <h6>Temp: {{Math.round(weatherList[weatherList.length - index - 1].temp - 273.15)}} C</h6>
                  </div>

                  <div class="col-12 text-center">
                    <h6>{{weatherList[weatherList.length - index - 1].info}}</h6>
                  </div>
                </router-link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {modelInstance} from "./Model";

  export default {

    created() {
      modelInstance.addObserver(this)
      this.loading = modelInstance.getLoading();
      this.weatherList = modelInstance.getWeatherList();
    },

    mounted(){
      this.loading = modelInstance.getLoading();
    },

    beforeDestroy() {
      modelInstance.removeObserver(this)
    },

    data() {
      return {
        active: false,
        status: 'INITIAL',
        search: "",
        weatherList: [],
        loading: true,
      }
    },

    methods: {

      setCurrentCity(id){
        modelInstance.setCurrentCity(id);
      },

      remove(obj){
        modelInstance.removeFromWeatherList(obj);
      },

      update(){
        this.weatherList = modelInstance.getWeatherList()
      },

      addToFavorites(obj){
        modelInstance.setFavorites(obj);
      }

    }
  }

</script>

<style scoped>

a:hover,  a:visited,  a:link,  a:active {
  color: white;
  text-decoration: none;
}

#result2{
  color: white;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
}

#result2:hover{
  box-shadow: 10px 10px 10px cyan;
}

#title{
  padding-bottom: 5px;
}


.star{
  background: rgba(0, 0, 0, 0.1);
  font-size: 30px;
}

.box{
  margin-left: 7px;
  background: rgba(0, 0, 0, 0.1);
  font-size: 30px;
}

.star:hover{
 color: yellow;
 cursor: pointer;
}

.box:hover{
 color: black;
 cursor: pointer;
}

.col-10{
  text-align: center;
}



</style>
