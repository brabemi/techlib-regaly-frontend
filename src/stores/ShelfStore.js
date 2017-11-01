import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var instance = axios.create({
  baseURL: 'http://localhost:4567'
})

export default new Vuex.Store({
  state: {
    data: {'': []},
    floors: []
  },
  mutations: {
    updateFloors(state, floors) {
      state.floors = floors
      state.floors.forEach(function(e) {
        e.floor_name = Math.abs(e.floor).toString() + (e.floor < 0 ? 'PP' : 'NP')
      })
    },
    updateFloor(state, data) {
      state.data[data.floor.id] = data.shelfrows
      state.data[data.floor.id].forEach(function(e) {
        e.floor_name = data.floor.floor_name
      })
    },
  },
  actions: {
    fetchData({ commit, dispatch }) {
      instance.get('/floor')
      .then(function(response) {
        dispatch('loadFloors', response.data)
      })
      .catch(function(error) {
        console.log(error.message)
      })
    },
    loadFloors({ commit }, floors) {
      commit('updateFloors', floors)
      this.state.floors.forEach(function(element) {
        instance.get('/floor/' + element.id + '/shelfrows')
        .then(function(response) {
          commit('updateFloor', { floor: element, shelfrows: response.data })
        })
        .catch(function(error) {
          console.log(error.message)
        })
      })
    }
  }
})
