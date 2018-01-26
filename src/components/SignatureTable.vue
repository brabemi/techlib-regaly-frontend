<template>
  <b-container fluid class="rounded border border-light">
    <div>
      <b-modal ref="modDupSig" title="Duplicit signatures" @ok="modalHandleOk">
        <p>
          {{ duplicitBooks.map(e => e.signature).join(', ') }}
        </p>
        <p>
          Do you want add books to simulation?
        </p>
      </b-modal>
    </div>
    <b-form-row class="mt-2 mb-2">
      <b-col xl="9" class="text-left">
        {{
          'Total volumes: ' + totalVolumes.toLocaleString('cs-CZ') +
          ' (cca ' + Math.ceil(totalVolumes * simulationStore.state.volumeWidth).toLocaleString('cs-CZ') + ' mm)'
        }}
      </b-col>
      <b-col xl="3" class="text-right">
         <b-button variant="success" @click="addAll" size="sm">Add all</b-button>
         <b-button variant="warning" @click="store.commit('clearData')" size="sm">Clear</b-button>
      </b-col>
    </b-form-row>
    <b-table striped hover bordered show-empty
      :items="store.state.data"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage">
      <template slot="signature_number" slot-scope="row">
        {{ row.item.signature }}
      </template>
      <template slot="actions" slot-scope="row">
        <b-button variant="danger" size="sm" @click.stop="removeRow(row.item)">
          <span class="fa fa-trash"/>
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
import store from '@/stores/SignatureStore'
import simulationStore from '@/stores/SimulationStore'

export default {
  data() {
    return {
      store: store,
      simulationStore: simulationStore,
      fields: {
        signature_number: { label: 'Signature', sortable: true, tdClass: 'align-middle pt-1 pb-1' },
        volumes_in_timerange: { label: 'Volumes', sortable: true, tdClass: 'align-middle pt-1 pb-1' },
        growth: { label: 'Growth', sortable: true, tdClass: 'align-middle pt-1 pb-1' },
        actions: { label: 'Actions', tdClass: 'align-middle pt-1 pb-1' }
      },
      currentPage: 1,
      perPage: 10,
      pageOpts: [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '20', value: 20 }
      ],
      filter: '',
      sortBy: null,
      duplicitBooks: [],
    }
  },
  mounted: function() {
    store.commit('clearData')
  },
  computed: {
    totalRows: function() {
      return store.state.data.length
    },
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
    removeRow(book) {
      store.commit('removeRow', book)
    },
    addAll() {
      var storeBooks = new Set(simulationStore.state.books.map(e => e.signature))
      this.duplicitBooks = store.state.data.filter(e => storeBooks.has(e.signature))
      if (this.duplicitBooks.length > 0) {
        this.$refs.modDupSig.show()
      } else {
        this.addBooksToSim()
      }
    },
    modalHandleOk(env) {
      this.addBooksToSim()
    },
  }
}
</script>
