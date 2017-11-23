import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import binarySearch from 'binary-search'

import router from '@/router'

Vue.use(Vuex)

var instance = axios.create({
  baseURL: 'http://localhost:4567'
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
    simulations: [],
  },
  mutations: {
    addShelf(state, shelf) {
      shelf.index = state.shelfIndex
      state.shelfIndex += 1
      state.shelfs.push(shelf)
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
    },
  },
  actions: {
    saveData() {
      var data = {
        shelfs: this.state.shelfs,
        books: this.state.books,
        name: this.state.name,
        volume_width: this.state.volumeWidth,
      }
      if (this.state.id !== '') {
        instance.post('/simulation/' + this.state.id, data)
          .then(function(r) {
            console.log(r)
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
      instance.get('/simulation/' + id)
        .then(function(response) {
          commit('addBooks', response.data.books)
          commit('addShelfs', response.data.shelfs)
          commit('setName', response.data.name)
          commit('setID', response.data.id)
          commit('setVolumeWidth', response.data.volume_width)
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
    }
  }
})
