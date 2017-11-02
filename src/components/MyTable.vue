<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-sm-10">
        <h1>Table</h1>
      </div>
    </div>
    <b-card no-body>
      <b-tabs ref="tabs" card>
        <b-tab title="Shelfs" active>
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
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import SignatureLoader from '@/components/SignatureLoader'
import SignatureTable from '@/components/SignatureTable'
import SimulationBookTable from '@/components/SimulationBookTable'
import SimulationShelfTable from '@/components/SimulationShelfTable'
import ShelfTable from '@/components/ShelfTable'

export default {
  components: {
    SignatureLoader,
    SignatureTable,
    ShelfTable,
    SimulationShelfTable,
    SimulationBookTable,
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
