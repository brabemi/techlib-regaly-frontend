import Vue from 'vue'
import Router from 'vue-router'
import SimulationNew from '@/components/SimulationNew'
import SimulationEdit from '@/components/SimulationEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'simulation-new',
      component: SimulationNew
    },
    {
      path: '/:id',
      name: 'simulation-edit',
      component: SimulationEdit
    }
  ]
})
