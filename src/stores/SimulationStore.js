import Vue from 'vue'
import Vuex from 'vuex'
import binarySearch from 'binary-search'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shelfIndex: 0,
    shelfs: [],
    bookIndex: 0,
    books: []
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
    addBook(state, book) {
    },
    addBooks(state, books) {
      books.forEach(function(e) {
        e.index = state.bookIndex
        state.bookIndex += 1
      })
      state.books = state.books.concat(books)
      console.log(state.books)
    },
    removeBook(state, book) {
      var index = binarySearch(state.books, book, function(a, b) { return a.index - b.index })
      state.books.splice(index, 1)
    },

  },
  actions: {
    // fetchData({ commit, dispatch }) {
    // },
  }
})
