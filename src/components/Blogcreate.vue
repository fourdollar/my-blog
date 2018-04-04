<template>
  <div id="Blogcreate">
    <header class="header-main">
      <div class="header-logo">
        <img src="../assets/favicon.png" alt="">
        <a @click="goTopPage">Fourdollar's World</a>
      </div>
      <div class="header-nav">
        <ul>
          <!-- <li @click="goCreatePage">Create</li> -->
          <li><a href="#/blogcreate">Create</a></li>
          <li><a href="#/visualization">D3</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#smallapp">Apps</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </div>
    </header>
    <div class="main-creater">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data () {
    return {
      msg: 'Blogcreatepage'
    }
  },
  methods: {
    goTopPage () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style>
#Blogcreate {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main-creater {
  margin-top: 75px;
  padding: 30px;
}

</style>
