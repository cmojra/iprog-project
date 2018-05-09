<template>
  <div v-if="ready" class="col-12">
    <div class="m-4 p-4"  id="results">
      <div class="row  text-center">
        <div class="col-12">
          <h2>{{currentCity}}</h2>
        </div>
      </div>

      <div class="row text-center">
        <div class="col-12 ">
          <div class='btn-group'>
            <button class='btn btn-primary' v-bind:class="{toggle: showHumidity}" @click="toggleHumidity()">Humidity</button>
            <button class='btn btn-primary' v-bind:class="{toggle: showTemp}" @click="toggleTemp()">Temperature</button>
            <button class='btn btn-primary' v-bind:class="{toggle: showClouds}" @click="toggleClouds()">Clouds</button>
          </div>
        </div>
      </div>

      </br>

      <div class="row text-center">
        <div class="col-12">
          <div class="dropdown">
            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
              Days
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" @click="changeDays(1)">1</a>
              <a class="dropdown-item" @click="changeDays(2)">2</a>
              <a class="dropdown-item" @click="changeDays(3)">3</a>
              <a class="dropdown-item" @click="changeDays(4)">4</a>
              <a class="dropdown-item" @click="changeDays(5)">5</a>
            </div>
            <span>Mean value for {{ days }} days:  {{gettingValue(days)}}</span>
          </div>
        </div>
      </div>

      </br>

       <div v-if="showHumidity"><line-chart :data="humChart" :colors="['#B8B8B8', '#b00']" xtitle="Date and Time" ytitle="% Humidity"></line-chart></div>
       <div v-else-if="showTemp"><line-chart :data="tempChart" :colors="['#B8B8B8', '#b00']" xtitle="Date and Time" ytitle="Temperature C"></line-chart></div>
       <div v-else-if="showClouds"><line-chart :data="cloudChart" :colors="['#B8B8B8', '#b00']" xtitle="Date and Time" ytitle="% Clouds"></line-chart></div>
       <div class="row text-center text-md-left">
         <div class="col-12">
           <router-link @click.native="back()" class='btn btn-primary' to="/destinations" exact>Back to search results</router-link>
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
      modelInstance.getWeatherForecast(modelInstance.getCurrentCity()).then(weather => {
        this.currentCity = weather.city.name
        this.forecast = weather.list
        this.ready = true
        this.temperatureList(weather.list);
        this.humidityList(weather.list);
        this.cloudList(weather.list);
        this.status = 'LOADED'
      }).catch(() => {
        this.status = 'ERROR'
      })
    },

    // this is called when component is removed destroyed
    // good place to remove observer
    beforeDestroy() {
      modelInstance.removeObserver(this)
    },

    data() {
      return {
        currentCity: '',
        forecast: [],
        humChart: [],
        tempChart: [],
        cloudChart: [],
        ready: false,
        showHumidity: false,
        showTemp: true,
        showClouds: false,
        days: 1,

      }
    },

    methods: {

      back(){
        modelInstance.clearCurrentCity();
      },

      // retrieving the amount of days (from the model) that mean values will be calculated on
      getDays(){
        return modelInstance.getSelectedDays();
      },

      // whenever the user changes the amount of days, the values will be updated
      onChange(){
        modelInstance.setSelectedDays(this.selected);
        gettingValue(modelInstance.getSelectedDays());
      },

      gettingValue(num){
        return modelInstance.getValue(num, this.showHumidity, this.showTemp, this.showClouds, this.humChart, this.tempChart, this.cloudChart);
      },

      changeDays(num){
        this.days = num;
      },

      toggleClouds(){
        this.showClouds = true;
        this.showHumidity = false;
        this.showTemp = false;
      },
      toggleHumidity(){
        this.showClouds = false;
        this.showHumidity = true;
        this.showTemp = false;
      },
      toggleTemp(){
        this.showClouds = false;
        this.showHumidity = false;
        this.showTemp = true;
      },

      update() {

      },

      // 3 methods for creating 3 lists for the graphs
      temperatureList(obj){
        for(var i=0; i< obj.length; i++){
          this.tempChart.push([obj[i].dt_txt, Math.round(obj[i].main.temp-273.15)]);
        }
      },
      humidityList(obj){
        for(var i=0; i< obj.length; i++){
          this.humChart.push([obj[i].dt_txt, Math.round(obj[i].main.humidity)]);
        }
      },
      cloudList(obj){
        for(var i=0; i< obj.length; i++){
          this.cloudChart.push([obj[i].dt_txt, obj[i].clouds.all]);
        }
      }

    }
  }

</script>

<style scoped>

#results{
  color: white;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
}

#results:hover{
  box-shadow: 10px 10px 10px cyan;
  background: rgba(0, 0, 0, 0.9);
}

.toggle{
  background: blue;
}

</style>
