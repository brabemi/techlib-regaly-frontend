<template>
  <b-container fluid>
    <b-row>
      <b-col class="text-left">
        {{
          'Total length: ' + totalLength.toLocaleString('cs-CZ') +
          ' cm (approximately ' + Math.floor(totalLength / 3.5).toLocaleString('cs-CZ') + ' volumes)'
        }}
      </b-col>
      <b-col class="text-right">
        <b-button @click="removeAll">Remove All</b-button>
      </b-col>
    </b-row>
    <b-table striped hover bordered show-empty
      :items="store.state.shelfs"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage">
      <template slot="row_length" slot-scope="row">
        {{ row.value + ' cm' }}
      </template>
      <template slot="actions" slot-scope="row">
        <b-btn size="sm" @click.stop="removeRow(row.item)">Remove</b-btn>
      </template>
    </b-table>
    <div class="row">
      <div class="col-sm-4 text-left">
        <select v-model="perPage" class="btn dropdown-toggle">
          <option v-for="po in pageOpts" :key="po.value" :value="po.value">{{ po.label }}</option>
        </select>
        <span>per page</span>
      </div>
      <div class="col-sm-4 text-center">
      </div>
      <div class="col-sm-4 text-right">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" align="right" />
      </div>
    </div>
  </b-container>
</template>

<script>
import store from '@/stores/SimulationStore'
import shelfStore from '@/stores/ShelfStore'

// store.dispatch('fetchData')

export default {
  data() {
    return {
      store: store,
      currentPage: 1,
      perPage: 5,
      filter: '',
      pageOpts: [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '20', value: 20 }
      ],
      fields: {
        floor_name: { label: 'Floor' },
        name: { label: 'Name', sortable: false },
        row_length: { label: 'Length in cm', sortable: false },
        levels: { label: 'Levels', sortable: false },
        actions: { label: 'Actions' },
      },
    }
  },
  computed: {
    totalRows: function() {
      return store.state.shelfs.length
    },
    totalLength: function() {
      var length = 0
      store.state.shelfs.forEach(function(shelf) {
        length += shelf.row_length * shelf.levels
      })
      return length
    },
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    removeRow(shelf) {
      store.commit('removeShelf', shelf)
      shelfStore.commit('unusedShelf', shelf)
    },
    removeAll(shelf) {
      store.state.shelfs.forEach(function(shelf) {
        shelfStore.commit('unusedShelf', shelf)
      })
      store.commit('removeAllShelfs')
    },
  },
}
</script>
