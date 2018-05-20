<template>
  <div id="Main">
    <header class="header-main">
      <div class="header-logo">
        <img src="../assets/favicon.png" alt="">
        <a href="#/">Fourdollar's World</a>
      </div>
      <div class="header-nav">
        <ul>
          <!-- <li @click="goCreatePage">Create</li> -->
          <li><a href="#/map">Map</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#smallapp">Apps</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </div>
    </header>
    <div class="top-wrapper">
      <div class="container">
        <span style="font-size:50px;">Welcome to my World</span>
        <p>program rookie<br>powered by vue.js and python</p>
      </div>
    </div>
    <div class="container">
      <div class="region-inner">
        <section id="blog" class="row">
          <div class="col-md-9">
            <div class="blogs">
              <div class="each-post">
                <h3>blog title</h3>
                <div class="post-time">
                  Thursday, March 15, 2018
                </div>
                <div class="post-body">
                  balabalabala
                </div>
              </div>
              <div class="blog-pager">

              </div>
            </div>
          </div>
          <div class="col-md-3 sidebar">
            <div class="search-box">
              <input type="text" placeholder="Search Blog" name="" value="">
            </div>
            <div class="widget blog-list">
              <h2>blog list</h2>
              <div class="blog-list">
                <ul>
                  <li><a href="#">第一篇blog</a></li>
                  <li><a href="#">第二篇blog</a></li>
                  <li><a href="#">第三篇blog</a></li>
                </ul>
              </div>
            </div>
            <div class="widget connect">
              <address>
                <strong>Fourdollar, Inc.</strong><br>
                1355 Market Street, Suite 900<br>
                San Francisco, CA 94103<br>
                <abbr title="Phone">P:</abbr> (123) 456-7890
              </address>

              <address>
                <strong>Full Name</strong><br>
                <a href="mailto:#">first.last@example.com</a>
              </address>
            </div>
            <div class="widget recommend" style="border-bottom:0">
              <p>还没想好</p>
            </div>
          </div>
        </section>
        <hr>
        <section id="smallapp">app</section>
        <hr>
        <section id="about">about me</section>
      </div>
    </div>
    <footer>
      <div class="footer-nav">
        <ul>
          <li><a href="#">没想好</a></li>
          <li><a href="#">没想好</a></li>
          <li><a href="#">还是没想好</a></li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      formLabelWidth: '60px'
    }
  },
  methods: {
    goCreatePage () {
      this.$router.push({
        path: '/dashboard'
      })
    }
  }
}
</script>

<style>
#Main {
  font-family:'Muli', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* -----------------header------------------- */
.header-main {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  height: 75px;
  line-height: 75px;
  box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
  z-index: 200;
}

.header-main .header-logo {
  float: left;
  margin: 0 0 0 15px;
  font-family:'Muli', Arial, sans-serif;
  font-size: 20px;
  position: absolute;
}

.header-main .header-logo img {
  width: 50px;
  -webkit-border-radius: 25px;
}

.header-nav ul li {
  margin: 0 36px 0 0;
  display: inline-block;
  line-height: 74px;
  text-transform: uppercase;
}
/* -----------------header------------------- */

.top-wrapper {
  margin-top: 75px;
  z-index: 100;
  height: 600px;
  padding: 100px;
  background-image: url(../assets/top.png);
  background-position:center;
  background-size: cover;
  color: white;
  text-align: center;
}

/* -----------------blog------------------- */
.each-post .post-time {
  margin: 20px 0px;
}
.search-box input {
  border: 1px solid #eee;
  color: #212121;
  color: rgba(0,0,0,.87);
  font-size: 16px;
  padding: 8px 8px 8px 40px;
  width: 200px;
  font-family: Roboto, sans-serif;
  background: url(https://www.gstatic.com/images/icons/material/system/1x/search_grey600_24dp.png) 8px center no-repeat;
}

.sidebar .widget {
  margin: 0;
  padding: 15px 0;
  min-height: 20px;
  border-bottom: 1px solid #eee;
  line-height: 1.4;
}

.sidebar .widget h2 {
  color: #444;
  font-family: "Roboto Slab", serif;
  padding-bottom: 3px;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 16px;
  font-weight: 900;
  display: inline-block;
  text-decoration: none;
}

.sidebar .widget h2:before{
  content: url(https://www.gstatic.com/images/icons/material/system/1x/star_grey600_24dp.png);
  position: relative;
  top: 5px;
  padding: 0 10px 0 0;
}



/* -----------------blog------------------- */


#blog{
  text-align: left;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

h1, h2 {
  font-weight: normal;
}

#Main section {
  padding: 100px;
}

footer {
  padding: 24px;
  background-color: #474747;
  box-sizing: border-box;
  color: #ffffff;
  position: relative;
  z-index: 98;
  height: 75px;
}
.footer-nav {
  width: auto;
  height:27px;
}
.footer-nav ul li{
  float: left;
  display: inline-block;
  line-height: 27px;
  margin: 0 15px 0 0;
}
.footer-nav a {
  color: #ccc;
  font-size: 14px;
  text-decoration: none;
  text-transform: uppercase;
}
/* -----------------modal------------------- */
.el-dialog--center .el-dialog__body {
    text-align: initial;
    padding: 25px 25px 0px;
}
/* -----------------modal------------------- */
</style>
