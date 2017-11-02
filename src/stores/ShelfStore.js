import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import binarySearch from 'binary-search'

Vue.use(Vuex)

var instance = axios.create({
  baseURL: 'http://localhost:4567'
})

export default new Vuex.Store({
  state: {
    indexes: {},
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
      state.data[data.floor.id].forEach(function(e, i) {
        e.floor_name = data.floor.floor_name
        e.index = i
        e._used = false
      })
      state.indexes[data.floor.id] = state.data[data.floor.id].length
    },
    removeRow(state, row) {
      var index = binarySearch(state.data[row.floor_id], row, function(a, b) { return a.index - b.index })
      state.data[row.floor_id].splice(index, 1)
    },
    unusedShelf(state, shelf) {
      var element = state.data[shelf.floor_id].find(function(e) { return e.id === shelf.id })
      element._used = false
    }
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
