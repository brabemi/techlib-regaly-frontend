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
    shelfIndex: 0,
    shelfs: [],
    bookIndex: 0,
    books: [],
    volumeWidth: 3.5,
  },
  mutations: {
    addShelf(state, shelf) {
      shelf.index = state.shelfIndex
      state.shelfIndex += 1
      state.shelfs.push(shelf)
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

  },
  actions: {
    saveData() {
      var data = {
        shelfs: this.state.shelfs,
        books: this.state.books,
      }
      instance.put('/simulation', data)
      .then(r => console.log(r.status))
      .catch(e => console.log(e))
    },
  }
})
