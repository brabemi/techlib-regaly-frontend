<template>
  <b-container fluid>
    <b-form-row>
      <div class="col-sm-4 text-left">
        <input v-model="filter" placeholder="Type to Search" />
      </div>
      <div class="col-sm-8 text-right">
      </div>
    </b-form-row>
    <b-table striped hover bordered show-empty
      :items="store.state.data"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :sort-by.sync="sortBy"
      :filter="filter"
       @filtered="onFiltered">
      <template slot="actions" slot-scope="row">
        <b-btn size="sm" @click.stop="store.commit('removeRow', row.item)">Remove</b-btn>
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
import store from '@/stores/SignatureStore'

export default {
  data() {
    return {
      store: store,
      fields: {
        index: { label: 'Index', sortable: true },
        signature: { label: 'Signature', sortable: true },
        signature_prefix: { label: 'Signature prefix', sortable: true },
        signature_number: { label: 'Signature number', sortable: true },
        volumes_total: { label: 'Volumes total', sortable: true },
        volumes_in_timerange: { label: 'Volumes in timerange', sortable: true },
        year_min: { label: 'Since year', sortable: true },
        year_max: { label: 'To year', sortable: true },
        actions: { label: 'Actions' }
      },
      currentPage: 1,
      perPage: 5,
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
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  }
}
</script>
