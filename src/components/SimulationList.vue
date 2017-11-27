<template>
  <b-container fluid>
    <b-row class="mt-2 mb-2">
      <b-col xl="6" class="text-left">
      </b-col>
      <b-col xl="6" class="text-right pr-0">
        <router-link :to="{ name: 'simulation-new' }">
          <b-button variant="success">New simulation</b-button>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-table striped hover bordered show-empty
        ref="shelf-table"
        :items="store.state.simulations"
        :current-page="currentPage"
        :per-page="perPage"
        :fields="fields">
        <template slot="name" slot-scope="row">
          <router-link :to="{ name: 'simulation-edit', params: { id: row.item.id } }">
            {{ row.value }}
          </router-link>
        </template>
        <template slot="actions" slot-scope="row">
          <router-link :to="{ name: 'simulation-edit', params: { id: row.item.id } }">
            <b-button variant="primary" size="sm">Edit</b-button>
          </router-link>
          <b-button variant="danger" size="sm" @click.stop="removeRow(row.item)">
            <span class="fa fa-trash"/>
          </b-button>
        </template>
      </b-table>
    </b-row>
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
        <b-pagination :total-rows="store.state.simulations.length" :per-page="perPage" v-model="currentPage" align="right" />
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
      items: store.state.simulations,
      totalRows: store.state.simulations.length,
      currentPage: 1,
      perPage: 10,
      pageOpts: [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '20', value: 20 }
      ],
      fields: {
        name: { label: 'Name' },
        volume_width: { label: 'Volume width' },
        actions: { label: 'Actions' },
      },
    }
  },
  mounted: function() {
    store.dispatch('fetchSimulations')
  },
  methods: {
    removeRow(simulation) {
      store.dispatch('deleteSimulation', simulation.id)
    },
  }
}
</script>
