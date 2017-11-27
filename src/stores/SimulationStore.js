import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import binarySearch from 'binary-search'

import router from '@/router'

Vue.use(Vuex)

var instance = axios.create({
  // baseURL: 'http://localhost:4567'
})

export default new Vuex.Store({
  state: {
    id: '',
    shelfIndex: 0,
    shelfs: [],
    bookIndex: 0,
    books: [],
    volumeWidth: 35,
    name: '',
    description: '',
    simulations: [],
    floors: [],
    floor_shelfs: { '': [] },
  },
  mutations: {
    addShelf(state, shelf) {
      shelf.index = state.shelfIndex
      state.shelfIndex += 1
      state.shelfs.push(shelf)
    },
    moveShelfUp(state, shelf) {
      var index = binarySearch(state.shelfs, shelf, function(a, b) { return a.index - b.index })
      if (index > 0) {
        for (var property in shelf) {
          if (shelf.hasOwnProperty(property)) {
            var tmp = state.shelfs[index][property]
            state.shelfs[index][property] = state.shelfs[index - 1][property]
            state.shelfs[index - 1][property] = tmp
          }
        }
        var tmpIndex = state.shelfs[index].index
        state.shelfs[index].index = state.shelfs[index - 1].index
        state.shelfs[index - 1].index = tmpIndex
      }
    },
    moveShelfDown(state, shelf) {
      var index = binarySearch(state.shelfs, shelf, function(a, b) { return a.index - b.index })
      if (index < (state.shelfs.length - 1)) {
        for (var property in shelf) {
          if (shelf.hasOwnProperty(property)) {
            var tmp = state.shelfs[index][property]
            state.shelfs[index][property] = state.shelfs[index + 1][property]
            state.shelfs[index + 1][property] = tmp
          }
        }
        var tmpIndex = state.shelfs[index].index
        state.shelfs[index].index = state.shelfs[index + 1].index
        state.shelfs[index + 1].index = tmpIndex
      }
    },
    addShelfs(state, shelfs) {
      shelfs.forEach(function(e) {
        e.index = state.shelfIndex
        state.shelfIndex += 1
      })
      state.shelfs = state.shelfs.concat(shelfs)
    },
    removeShelf(state, shelf) {
      var index = binarySearch(state.shelfs, shelf, function(a, b) { return a.index - b.index })
      state.shelfs.splice(index, 1)
    },
    removeAllShelfs(state) {
      state.shelfs = []
      state.shelfIndex = 0
    },
    addBooks(state, books) {
      books.forEach(function(e) {
        e.index = state.bookIndex
        state.bookIndex += 1
      })
      state.books = state.books.concat(books)
    },
    removeBook(state, book) {
      var index = binarySearch(state.books, book, function(a, b) { return a.index - b.index })
      state.books.splice(index, 1)
    },
    removeAllBooks(state) {
      state.books = []
      state.bookIndex = 0
    },
    setName(state, name) {
      state.name = name
    },
    setID(state, id) {
      state.id = id
    },
    setVolumeWidth(state, volumeWidth) {
      state.volumeWidth = volumeWidth
    },
    setDescription(state, description) {
      state.description = description
    },
    setSimulations(state, simulations) {
      state.simulations = simulations
    },
    cleanSimulation(state) {
      state.id = ''
      state.shelfIndex = 0
      state.shelfs = []
      state.bookIndex = 0
      state.books = []
      state.volumeWidth = 35
      state.name = ''
      state.description = ''
    },
    removeSimulation(state, id) {
      var i = 0
      for (i = 0; i < state.simulations.length; i++) {
        if (state.simulations[i].id === id) {
          break
        }
      }
      if (i < state.simulations.length) {
        state.simulations.splice(i, 1)
      }
    },
    setFloors(state, floors) {
      state.floors = floors
      // state.floors.forEach(function(e) {
      //   e.floor_name = Math.abs(e.floor).toString() + (e.floor < 0 ? 'PP' : 'NP')
      // })
    },
    setFloor(state, data) {
      state.floor_shelfs[data.floor.id] = data.shelfrows
      state.floor_shelfs[data.floor.id].forEach(function(e) {
        e.floor_name = data.floor.name
        e._used = false
      })
    },
    unusedShelf(state, shelf) {
      var element = state.floor_shelfs[shelf.floor_section_id].find(function(e) { return e.id === shelf.id })
      if (element) {
        element._used = false
      }
    },
    markUsedShelfsInFloor(state, floor) {
      var usedShelfs = new Set(state.shelfs.map(e => e.id))
      state.floor_shelfs[floor.id].forEach(function(e) {
        if (usedShelfs.has(e.id)) {
          e._used = true
        } else {
          e._used = false
        }
      })
    },
  },
  actions: {
    saveSimulation({ state }) {
      var data = {
        shelfs: state.shelfs,
        books: state.books,
        name: state.name,
        volume_width: state.volumeWidth,
        description: state.description,
      }
      if (state.id !== '') {
        instance.post('/simulation/' + state.id, data)
          .then(function(r) {
            // console.log(r)
          })
          .catch(e => console.log(e))
      } else {
        instance.put('/simulation', data)
          .then(function(r) {
            router.push({ name: 'simulation-edit', params: { id: r.data } })
          })
          .catch(e => console.log(e))
      }
    },
    fetchSimulation({ commit, dispatch }, id) {
      commit('cleanSimulation')
      instance.get('/simulation/' + id)
        .then(function(response) {
          commit('addBooks', response.data.books)
          commit('addShelfs', response.data.shelfs)
          commit('setName', response.data.name)
          commit('setID', response.data.id)
          commit('setVolumeWidth', response.data.volume_width)
          commit('setDescription', response.data.description)
          dispatch('fetchFloors')
        })
        .catch(function(error) {
          console.log(error.message)
        })
    },
    fetchSimulations({ commit, dispatch }) {
      instance.get('/simulation/')
        .then(function(response) {
          commit('setSimulations', response.data)
        })
        .catch(function(error) {
          console.log(error.message)
        })
    },
    deleteSimulation({ commit, dispatch }, id) {
      instance.delete('/simulation/' + id)
        .then(function(response) {
          commit('removeSimulation', id)
        })
        .catch(function(error) {
          console.log(error.message)
        })
    },
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
      instance.get('/floorsection/' + floor.id + '/shelfrows/enabled')
        .then(function(response) {
          commit('setFloor', { floor: floor, shelfrows: response.data })
          commit('markUsedShelfsInFloor', floor)
        })
        .catch(function(error) {
          console.log(error.message)
        })
    },
    initClear({ commit, dispatch }) {
      commit('cleanSimulation')
      dispatch('fetchFloors')
    },
  }
})
