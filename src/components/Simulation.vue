<template>
  <b-container fluid>
    <b-card no-body>
      <b-tabs pills card :vertical="$breakpoints.isLargeDesktop()">
        <b-tab title="Simulation" active>
          <b-row class="mb-2">
            <simulation-control-row/>
          </b-row>
          <b-row>
            <b-col>
              <simulation-book-table/>
            </b-col>
            <b-col>
              <simulation-shelf-table/>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <simulation-description-view/>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Books">
          <b-row class="mb-2">
            <signature-loader/>
          </b-row>
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
        <b-tab title="Description">
          <b-row>
            <b-col>
              <simulation-description/>
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
import SimulationDescriptionView from '@/components/SimulationDescriptionView'
import SimulationDescription from '@/components/SimulationDescription'

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
    SimulationControlRow,
    SimulationDescriptionView,
    SimulationDescription,
  },
}
</script>
