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
    },
    updateFloor(state, data) {
      state.data[data.floor.id] = data.shelfrows
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
      floors.forEach(function(element) {
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
