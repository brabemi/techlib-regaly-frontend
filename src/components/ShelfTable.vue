<template>
  <b-container fluid>
    <b-form-row>
      <div class="col-sm-4 text-left">
        <input v-model="filter" placeholder="Type to Search" />
      </div>
      <div class="col-sm-8 text-right">
        <label>Floor:</label>
        <select v-model="floor" @change="changeFloor(floor)" class="btn dropdown-toggle">
          <option v-for="floor in store.state.floors" :key="floor.id" :value="floor">
            {{ Math.abs(floor.floor).toString() + (floor.floor < 0 ? 'PP' : 'NP') }}
          </option>
        </select>
      </div>
    </b-form-row>
    <b-table striped hover bordered show-empty
      :items="store.state.data[floor.id]"
      :current-page="currentPage"
      :per-page="perPage"
      :fields="fields"
      :filter="filter"
       @filtered="onFiltered">
      <template slot="floor" slot-scope="row">
        {{ currentFloor }}
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
import store from '@/stores/ShelfStore'

store.dispatch('fetchData')

export default {
  data() {
    return {
      store: store,
      floor: '',
      currentFloor: '',
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      filter: '',
      pageOpts: [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '20', value: 20 }
      ],
      fields: {
        floor: { label: 'Floor' },
        name: { label: 'Name', sortable: true },
        row_length: { label: 'Length in cm', sortable: true },
        levels: { label: 'Levels', sortable: true },
      },
    }
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    changeFloor() {
      this.totalRows = store.state.data[this.floor.id].length
      this.currentFloor = Math.abs(this.floor.floor).toString() + (this.floor.floor < 0 ? 'PP' : 'NP')
    }
  },
}
</script>

<style>
.table {
  margin-bottom: 0px
}

.pagination {
  margin: 0px
}

.table th,
.table td {
  padding: 0.25rem
}
</style>
