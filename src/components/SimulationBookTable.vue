<template>
  <b-container fluid class="rounded border border-info">
    <b-row class="mt-2 mb-2">
      <b-col xl="9" class="text-left">
        {{
          'Total volumes: ' + totalVolumes.toLocaleString('cs-CZ') +
          ' (cca ' + Math.ceil(totalVolumes * store.state.volumeWidth).toLocaleString('cs-CZ') + ' mm)'
        }}
      </b-col>
      <b-col xl="3" class="text-right">
         <b-button variant="danger" @click="removeAll" size="sm">Remove All</b-button>
      </b-col>
    </b-row>
    <b-table striped hover bordered show-empty
      :items="store.state.books"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage">
      <template slot="signature_number" slot-scope="row">
        {{ row.item.signature }}
      </template>
      <template slot="actions" slot-scope="row">
        <b-button variant="danger" size="sm" @click.stop="removeRow(row.item)">Remove</b-button>
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
        signature_number: { label: 'Signature', sortable: false, tdClass: 'align-middle pt-1 pb-1' },
        volumes_in_timerange: { label: 'Volumes', sortable: false, tdClass: 'align-middle pt-1 pb-1' },
        actions: { label: 'Actions', tdClass: 'align-middle pt-1 pb-1' }
      },
    }
  },
  computed: {
    totalRows: function() {
      return store.state.books.length
    },
    totalVolumes: function() {
      var volumes = 0
      store.state.books.forEach(function(book) {
        volumes += book.volumes_in_timerange
      })
      return volumes
    }
  },
  methods: {
    removeRow(book) {
      store.commit('removeBook', book)
    },
    removeAll() {
      store.commit('removeAllBooks')
    },
  },
}
</script>
