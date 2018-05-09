<template>
  <div class="col-12 offset-md-3 col-md-9" id="rightContainer">
		<div class="container-fluid">
      <div class="row">

        <div v-for="(city, index) in weatherList" class="col-12 col-md-4 mt-4">
          <div id="result2">
            <div class="row pb-3">
              <div class="col-1"  @click="remove(weatherList[weatherList.length - index -1].id)">
                <button class='btn btn-primary'>X</button>
              </div>

              <div class="col-10" @click="setCurrentCity(weatherList[weatherList.length - index -1].id)">
                <router-link v-bind:to="'/detailedview/' + weatherList[weatherList.length - index -1].id">
                  <div class="col-12 pt-3 text-center">
                    <h4>{{weatherList[weatherList.length - index - 1].name}}</h4>
                  </div>

                  <div class="col-12 text-center">
                    <h6>Clouds: {{weatherList[weatherList.length - index - 1].clouds.all}} %</h6>
                  </div>

                  <div class="col-12 text-center">
                    <h6>Temp: {{Math.round(weatherList[weatherList.length - index - 1].main.temp - 273.15)}} C</h6>
                  </div>

                  <div class="col-12 text-center">
                    <h6>{{weatherList[weatherList.length - index - 1].weather[0].description}}</h6>
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
      this.weatherList = modelInstance.getWeatherList();
    },

    beforeDestroy() {
      modelInstance.removeObserver(this)
    },

    data() {
      return {
        active: false,
        status: 'INITIAL',
        search: "",
        weatherList: []
      }
    },

    methods: {

      setCurrentCity(id){
        modelInstance.setCurrentCity(id);
      },

      remove(id){
        modelInstance.removeFromWeatherList(id);
      },

      update(){
        this.weatherList = modelInstance.getWeatherList()
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



</style>
