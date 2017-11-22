<template>
  <b-container fluid>
    <b-row>
      <router-link :to="{ name: 'simulation-new' }">New</router-link>
      <router-link :to="{ name: 'simulation-edit', params: { id: 'ba875b2a-08d1-469d-a412-c444855471af' }}">Simulation</router-link>
      <router-link :to="{ name: 'simulation-edit', params: { id: 'ba875b2a-08d1-469d-a412-c444855471' }}">Bad-Simulation</router-link>
    </b-row>
    <!-- <b-row>
      <b-col xl="12">
        <h1>Table</h1>
      </b-col>
    </b-row> -->
    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab title="Simulation" active>
          <b-row>
            <simulation-control-row/>
          </b-row>
          <hr>
          <b-row>
            <b-col>
              <simulation-book-table/>
            </b-col>
            <b-col>
              <simulation-shelf-table/>
            </b-col>
          </b-row>
          <b-row>
            <b-container fluid>
              <b-col class="text-right">
              </b-col>
            </b-container>
          </b-row>
        </b-tab>
        <b-tab title="Books">
          <b-row>
            <b-col>
              <signature-loader/>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col>
              <simulation-book-table/>
            </b-col>
            <b-col>
              <signature-table/>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Shelfs">
          <b-row>
            <b-col>
              <simulation-shelf-table/>
            </b-col>
            <b-col>
              <shelf-table/>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Visualization">
          <b-row>
            <b-col>
              <simulation-visualization/>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>

<script>
import store from '@/stores/SimulationStore'
import SignatureLoader from '@/components/SignatureLoader'
import SignatureTable from '@/components/SignatureTable'
import SimulationBookTable from '@/components/SimulationBookTable'
import SimulationShelfTable from '@/components/SimulationShelfTable'
import SimulationControlRow from '@/components/SimulationControlRow'
import ShelfTable from '@/components/ShelfTable'
import SimulationVisualization from '@/components/SimulationVisualization'

export default {
  data() {
    return {
      store: store,
    }
  },
  // created: function() {
  //   console.log(this.$route)
  // },
  components: {
    SignatureLoader,
    SignatureTable,
    ShelfTable,
    SimulationShelfTable,
    SimulationBookTable,
    SimulationVisualization,
    SimulationControlRow,
  },
}
</script>

<style>
/* .table {
  margin-bottom: 0px
}

.pagination {
  margin: 0px
}

.table th,
.table td {
  padding: 0.25rem
} */
</style>
