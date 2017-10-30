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
          <shelf-table/>
        </b-tab>
        <b-tab title="Books">
          <signature-loader/>
          <signature-table/>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import SignatureLoader from '@/components/SignatureLoader'
import SignatureTable from '@/components/SignatureTable'
import ShelfTable from '@/components/ShelfTable'

export default {
  components: {
    SignatureLoader,
    SignatureTable,
    ShelfTable,
  },
}
</script>
