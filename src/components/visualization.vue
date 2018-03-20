<template>
  <div id="Visualization">

    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Visualization',
  data () {
    return {
      msg: 'D3.js page'
    }
  }
}
</script>

<style>
#Visualization {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
