import Vue from 'vue'
import Router from 'vue-router'
import NewSimulation from '@/components/NewSimulation'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NewSimulation',
      component: NewSimulation
    }
  ]
})
