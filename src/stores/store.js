import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import binarySearch from 'binary-search'

Vue.use(Vuex)

var instance = axios.create({
  baseURL: 'http://localhost:4567'
})

function processData(row, fromYear, toYear) {
  row.volumes_in_timerange = 0
  if (fromYear !== '' || toYear !== '') {
    for (var key in row.volumes) {
      var years = key.split(/[^0-9]+/)
      years = years.filter(function(e) { return e !== '' })
      years = years.map(function(e) { return parseInt(e, 10) })
      if (fromYear !== '' && fromYear > years[0]) continue
      if (toYear !== '' && toYear < years[0]) continue
      row.volumes_in_timerange += row.volumes[key]
    }
  } else row.volumes_in_timerange = row.volumes_total
  return row
}

export default new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    updateSavedData(state, data) {
      state.data = data
      // console.log(state.data)
    },
    removeRow(state, row) {
      var index = binarySearch(state.data, row, function(a, b) { return a.index - b.index })
      console.log(row === state.data[index])
      state.data.splice(index, 1)
    }
  },
  actions: {
    fetchData({ commit }, params) {
      var filter = []
      if (params.sig_pref !== '') { filter.push('sig_pref=' + escape(params.sig_pref)) }
      if (params.sig_num_min !== '') { filter.push('sig_num_min=' + escape(params.sig_num_min)) }
      if (params.sig_num_max !== '') { filter.push('sig_num_max=' + escape(params.sig_num_max)) }
      if (params.from_year !== '') { filter.push('from_year=' + escape(params.from_year)) }
      if (params.to_year !== '') { filter.push('to_year=' + escape(params.to_year)) }
      // console.log('/signature' + '?' + filter.join('&'))
      instance.get('/signature' + '?' + filter.join('&'))
      .then(function(response) {
        commit(
          'updateSavedData',
          response.data.map(function(row) { return processData(row, params.from_year, params.to_year) })
            .filter(function(e) { return e.volumes_in_timerange > 0 })
            .map(function(e, i) {
              e.index = i
              return e
            })
        )
      })
      .catch(function(error) {
        console.log(error.message)
      })
    }
  }
})
