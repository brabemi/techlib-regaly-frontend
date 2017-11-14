<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-sm-10">
        <h1>Table</h1>
      </div>
    </div>
    <b-card no-body>
      <b-tabs ref="tabs" card>
        <b-tab title="Simulation" active>
          <b-row>
            <b-col>
              <simulation-shelf-table/>
            </b-col>
            <b-col>
              <simulation-book-table/>
            </b-col>
          </b-row>
          <b-row>
            <b-container fluid>
              <b-col class="text-right">
                <!-- <b-button @click="store.dispatch('saveData')">Save simulation</b-button> -->
              </b-col>
            </b-container>
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
        <b-tab title="Visualization">
          <b-row>
            <b-col>
              <simulation-visualization/>
            </b-col>
          </b-row>
        </b-tab>

      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import store from '@/stores/SimulationStore'
import SignatureLoader from '@/components/SignatureLoader'
import SignatureTable from '@/components/SignatureTable'
import SimulationBookTable from '@/components/SimulationBookTable'
import SimulationShelfTable from '@/components/SimulationShelfTable'
import ShelfTable from '@/components/ShelfTable'
import SimulationVisualization from '@/components/SimulationVisualization'

export default {
  data() {
    return {
      store: store,
    }
  },
  components: {
    SignatureLoader,
    SignatureTable,
    ShelfTable,
    SimulationShelfTable,
    SimulationBookTable,
    SimulationVisualization,
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
