import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shelfs: [],
    books: []
  },
  mutations: {
    addShelf(state, shelf) {
      state.shelfs.push(shelf)
    },
    addBook(state, book) {
    },
  },
  actions: {
    fetchData({ commit, dispatch }) {
    },
  }
})
