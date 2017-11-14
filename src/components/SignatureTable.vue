<template>
  <b-container fluid>
    <b-form-row>
      <!-- <b-col cols="3" class="text-left">
        <input v-model="filter" placeholder="Type to Search" />
      </b-col> -->
      <b-col cols="9" class="text-left">
        {{
          'Total volumes: ' + totalVolumes.toLocaleString('cs-CZ') +
          ' (approximately ' + Math.ceil(totalVolumes * 3.5).toLocaleString('cs-CZ') + ' cm)'
        }}
      </b-col>
      <b-col cols="3" class="text-right">
         <b-button @click="addBooksToSim">Add all</b-button>
      </b-col>
    </b-form-row>
    <b-table striped hover bordered show-empty
      :items="store.state.data"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :sort-by.sync="sortBy"
      :filter="filter"
       @filtered="onFiltered">
      <template slot="signature_number" slot-scope="row">
        {{ row.item.signature }}
      </template>
      <template slot="actions" slot-scope="row">
        <b-btn size="sm" @click.stop="store.commit('removeRow', row.item)">Remove</b-btn>
      </template>
    </b-table>
    <b-row>
      <b-col cols="4" class="text-left">
        <select v-model="perPage" class="btn dropdown-toggle">
          <option v-for="po in pageOpts" :key="po.value" :value="po.value">{{ po.label }}</option>
        </select>
        <span>per page</span>
      </b-col>
      <b-col cols="4" class="text-center">
      </b-col>
      <b-col cols="4" class="text-right">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" align="right" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import store from '@/stores/SignatureStore'
import simulationStore from '@/stores/SimulationStore'

export default {
  data() {
    return {
      store: store,
      fields: {
        signature_number: { label: 'Signature', sortable: true },
        volumes_in_timerange: { label: 'Volumes', sortable: true },
        actions: { label: 'Actions' }
      },
      currentPage: 1,
      perPage: 10,
      totalRows: store.state.data.length,
      pageOpts: [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '20', value: 20 }
      ],
      filter: '',
      sortBy: null,
    }
  },
  computed: {
    totalVolumes: function() {
      var volumes = 0
      store.state.data.forEach(function(book) {
        volumes += book.volumes_in_timerange
      })
      return volumes
    }
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    addBooksToSim() {
      simulationStore.commit('addBooks', store.state.data)
      store.commit('clearData')
    },
  }
}
</script>
