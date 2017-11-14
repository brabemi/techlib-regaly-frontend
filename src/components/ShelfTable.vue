<template>
  <b-container fluid>
    <b-form-row>
      <!-- <b-col cols="4" class="text-left">
        <input v-model="filter" placeholder="Type to Search" />
      </b-col> -->
      <b-col cols="9" class="text-left">
      </b-col>
      <b-col cols="3" class="text-right">
        <label>Floor:</label>
        <select v-model="floor" @change="changeFloor(floor)" class="btn dropdown-toggle">
          <option v-for="floor in store.state.floors" :key="floor.id" :value="floor">
            {{ floor.floor_name }}
          </option>
        </select>
      </b-col>
    </b-form-row>
    <b-table striped hover bordered show-empty
      ref="shelf-table"
      :items="items"
      :current-page="currentPage"
      :per-page="perPage"
      :fields="fields"
      :filter="filter"
       @filtered="onFiltered">
      <template slot="row_length" slot-scope="row">
        {{ row.value + ' cm' }}
      </template>
      <template slot="actions" slot-scope="row">
        <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-btn size="sm" :disabled="row.item._used" @click.stop="addShelfToSim(row.item)">Add</b-btn>
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
import store from '@/stores/ShelfStore'
import simulationStore from '@/stores/SimulationStore'

store.dispatch('fetchData')

export default {
  data() {
    return {
      store: store,
      floor: '',
      items: [],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      filter: '',
      pageOpts: [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '20', value: 20 }
      ],
      fields: {
        floor_name: { label: 'Floor' },
        name: { label: 'Name', sortable: true },
        row_length: { label: 'Length in cm', sortable: true },
        levels: { label: 'Levels', sortable: true },
        actions: { label: 'Actions' },
        // index: {},
      },
    }
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    changeFloor() {
      this.items = store.state.data[this.floor.id]
      this.totalRows = this.items.length
    },
    addShelfToSim(shelf) {
      shelf._used = true
      var tmpShelf = JSON.parse(JSON.stringify(shelf))
      simulationStore.commit('addShelf', tmpShelf)
    },
  },
}
</script>
