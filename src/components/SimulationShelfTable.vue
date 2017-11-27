<template>
  <b-container fluid class="rounded border border-info">
    <b-row class="mt-2 mb-2">
      <b-col xl="9" class="text-left">
        {{
          'Total length: ' + totalLength.toLocaleString('cs-CZ') +
          ' mm (cca ' + Math.floor(1.0 * totalLength / store.state.volumeWidth).toLocaleString('cs-CZ') + ' volumes)'
        }}
      </b-col>
      <b-col xl="3" class="text-right">
        <b-button variant="danger" @click="removeAll" size="sm">Remove All</b-button>
      </b-col>
    </b-row>
    <b-table striped hover bordered show-empty
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage">
      <template slot="row_length" slot-scope="row">
        {{ row.value + ' mm' }}
      </template>
      <template slot="actions" slot-scope="row">
        <b-button variant="danger" size="sm" @click.stop="removeRow(row.item)">
          <span class="fa fa-trash"/>
        </b-button>
        <b-button variant="warning" size="sm" @click.stop="moveUp(row.item)">
          <span class="fa fa-arrow-up"/>
        </b-button>
        <b-button variant="warning" size="sm" @click.stop="moveDown(row.item)">
          <span class="fa fa-arrow-down"/>
        </b-button>
      </template>
    </b-table>
    <b-row>
      <b-col xl="4" class="text-left">
        <select v-model="perPage" class="button dropdown-toggle">
          <option v-for="po in pageOpts" :key="po.value" :value="po.value">{{ po.label }}</option>
        </select>
        <span>per page</span>
      </b-col>
      <b-col xl="4" class="text-center">
     </b-col>
      <b-col xl="4" class="text-right">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" align="right" size="sm"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import store from '@/stores/SimulationStore'

export default {
  data() {
    return {
      store: store,
      currentPage: 1,
      perPage: 10,
      filter: '',
      pageOpts: [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '20', value: 20 }
      ],
      fields: {
        floor_name: { label: 'Section', tdClass: 'align-middle pt-1 pb-1' },
        name: { label: 'Name', sortable: false, tdClass: 'align-middle pt-1 pb-1' },
        row_length: { label: 'Length in mm', sortable: false, tdClass: 'align-middle pt-1 pb-1' },
        levels: { label: 'Levels', sortable: false, tdClass: 'align-middle pt-1 pb-1' },
        actions: { label: 'Actions', tdClass: 'align-middle pt-1 pb-1' },
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
        length -= store.state.volumeWidth * shelf.levels * shelf.segment_lengths.length
      })
      return length
    },
    items: function() {
      return this.store.state.shelfs
    },
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    removeRow(shelf) {
      store.commit('removeShelf', shelf)
      store.commit('unusedShelf', shelf)
    },
    moveUp(shelf) {
      store.commit('moveShelfUp', shelf)
    },
    moveDown(shelf) {
      store.commit('moveShelfDown', shelf)
    },
    removeAll(shelf) {
      store.state.shelfs.forEach(function(shelf) {
        store.commit('unusedShelf', shelf)
      })
      store.commit('removeAllShelfs')
    },
  },
}
</script>
