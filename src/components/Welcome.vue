<template>
  <div class="container-fluid vertical-center">
    <div class="row justify-content-center text-center align-middle">
      <div class="col-12 col-md-4 p-3 mt-5" id="results">

        <h6> {{ msg }} </h6>

        <div class="col-12">
             <router-link class='btn btn-primary' to="/destinations" exact>Plan your perfect holiday</router-link>
  			</div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Welcome to the Vacation Weather Forecast where you can plan you perfect holiday according' +
            ' to the weather forecast coming from us. To get started, please press the button below'
      }
    }
  }
</script>

<!-- Example of styling Vue components -->
<!-- With the scoped attribute, CSS will apply to elements of the current component only -->
<style scoped>

#results{
  color: white;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
}


#results:hover{
  box-shadow: 10px 10px 10px cyan;
  background: rgba(0, 0, 0, 0.7);
}

.vertical-center {
  min-height: 60%;  /* Fallback for browsers do NOT support vh unit */
  min-height: 60vh; /* These two lines are counted as one :-)       */

  display: flex;
  align-items: center;
}

</style>
