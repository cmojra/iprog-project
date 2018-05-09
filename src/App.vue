<template >
  <div>
    <header>
  	   <h1>Vacation Weather Forecast</h1>
	  </header>
    <div class="row">
      <router-view name="navbar" id="fixed"></router-view>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import Welcome from './components/Welcome.vue';
import Search from './components/Search.vue';
import Destinations from './components/Destinations.vue';
import DetailedView from './components/DetailedView.vue';



export default {
//  name: 'App'
  components: {
       'welcome': Welcome,
       'detailedview': DetailedView,
       'search': Search,
       'destinations': Destinations,
     }
 }
</script>

<style scoped>

  #fixed{
    position: fixed;
  }

  header {
    background: white;
    color: cyan;
    margin: 0;
    opacity: 1;
    padding: 5px;
    text-align: center;
  }

  @media only screen and (max-width: 768px) {
    #fixed {
        position: relative;
    }
  }

</style>
