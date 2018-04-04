<!--
Links:
  Events: https://vuejs.org/v2/guide/events.html
  Computed properties: https://vuejs.org/v2/guide/computed.html
Data:
  http://worldpopulationreview.com/states/
-->

<template>
  <div id="map">
    <header class="header-main">
      <div class="header-logo">
        <img src="../../assets/favicon.png" alt="">
        <a href="#/">Fourdollar's World</a>
      </div>
      <div class="header-nav">
        <ul>
          <!-- <li @click="goCreatePage">Create</li> -->
          <li><a href="#/blogcreate">Create</a></li>
          <li><a href="#/map">Map</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#smallapp">Apps</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </div>
    </header>
    <div id="holder">
      <div class="mapHolder">
        <us-map
          v-on:stateSelected="onStateSelected"
          v-on:stateDeselected="onStateDeselected"
        />
      </div>
      <tooltip
        v-if="currentState"
        :title="currentState.Name"
        :description="currentStateDescription"
      />
    </div>
  </div>

</template>

<script>

var _ = require('lodash');
import map from '@/d3-components/basic-map-tooltip/map'
import tooltip from '@/d3-components/basic-map-tooltip/tooltip'

const STATES_DATA_PATH = 'static/data/states-data.csv';

// lets load with vue-resource, but parse with d3
// just because we can
import * as d3 from 'd3-dsv';


export default {
  components: {
    usMap: map,
    tooltip: tooltip
  },
  created: function() {
    var that = this;

    this.$http.get(STATES_DATA_PATH)
      .then(function(res) {
        this.statesData = {};
        d3.dsvFormat(';')
          .parse(res.data, d => {
            var population = d["2017 Population"].split(',').join('');
            d.value = +population;
            that.statesData[d.STATE_ABBR] = d;
            delete d["2017 Population"];
            delete d["STATE_ABBR"];
            return d;
          });
      })
  },
  data: function() {
    return {
      statesData: undefined,
      currentState: undefined
    }
  },
  computed: {
    currentStateDescription: function() {
      return "Population: " + this.currentState.value;
    }
  },
  methods: {
    onStateSelected: function(stateCode) {
      this.currentState = this.statesData[stateCode];
    },
    onStateDeselected: function(stateCode) {
      this.currentState = undefined;
    }
  }
}

</script>

<style scoped>
#map {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#holder {
  height: 300px;
  width: 500px;
  margin: auto;
}
.mapHolder {
  top: 75px;
  position: absolute;
  margin: 30px auto;
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
  font-family: "Roboto",sans-serif;
  font-size: 20px;
  position: absolute;
}

.header-main .header-logo img {
  width: 50px;
  -webkit-border-radius: 25px;
}

.header-main .header-nav {
  float: right;
  height: 75px;
  top: 0;
  width: auto;
  background: #ffffff;
  list-style: none;
  margin: 0;
  overflow: scroll;
  padding: 0;
  position: fixed;
  right: 0;
  z-index: 300;
}

.header-nav ul li {
  margin: 0 36px 0 0;
  display: inline-block;
  line-height: 74px;
  text-transform: uppercase;
}
/* -----------------header------------------- */
</style>
