import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Blogcreate from '../components/Blogcreate'
import Blog from '../components/Blog'
import Visualization from '../components/Visualization'
import Map from '../d3-components/basic-map-tooltip/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/blogcreate',
      name: 'Blogcreate',
      component: Blogcreate
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/visualization',
      name: 'Visualization',
      component: Visualization
    },
    {
      name: 'Basic map: html tooltip & events',
      path: '/map',
      folder: true,
      component: Map
    }
  ]
})
