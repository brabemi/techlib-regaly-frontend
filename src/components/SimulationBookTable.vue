<template>
  <b-container fluid>
    <b-row>
      <b-col cols="9" class="text-left">
        {{
          'Total volumes: ' + totalVolumes.toLocaleString('cs-CZ') +
          ' (cca ' + Math.ceil(totalVolumes * 3.5).toLocaleString('cs-CZ') + ' cm)'
        }}
      </b-col>
      <b-col cols="3" class="text-right">
         <b-button @click="removeAll">Remove All</b-button>
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
        signature_number: { label: 'Signature', sortable: false },
        volumes_in_timerange: { label: 'Volumes', sortable: false },
        actions: { label: 'Actions' }
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
