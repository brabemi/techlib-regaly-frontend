import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var instance = axios.create({
  // baseURL: 'http://localhost:4567'
})

export default new Vuex.Store({
  state: {
    floors: [],
    floor_shelfs: { '': [] },
  },
  mutations: {
    setFloors(state, floors) {
      state.floors = floors
    },
    setFloor(state, data) {
      state.floor_shelfs[data.floor.id] = data.shelfrows
      state.floor_shelfs[data.floor.id].forEach(function(e) {
        e.floor_name = data.floor.name
      })
    },
  },
  actions: {
    fetchFloors({ commit, dispatch, state }) {
      instance.get('/floorsection')
        .then(function(response) {
          commit('setFloors', response.data)
          state.floors.forEach(function(floor) {
            dispatch('fetchFloor', floor)
          })
        })
        .catch(function(error) {
          console.log(error.message)
        })
    },
    fetchFloor({ commit }, floor) {
      instance.get('/floorsection/' + floor.id + '/shelfrows')
        .then(function(response) {
          commit('setFloor', { floor: floor, shelfrows: response.data })
        })
        .catch(function(error) {
          console.log(error.message)
        })
    },
    shelfEnable({ commit }, shelf) {
      instance.get('/shelfrow/' + shelf.id + '/enable')
        .then(shelf.enabled = true)
        .catch(e => console.log(e))
    },
    shelfDisable({ commit }, shelf) {
      instance.get('/shelfrow/' + shelf.id + '/disable')
        .then(shelf.enabled = false)
        .catch(e => console.log(e))
    },
  }
})
