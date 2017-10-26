<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-sm-10">
        <h1>Table</h1>
      </div>
    </div>
    <b-card no-body>
      <b-tabs ref="tabs" card>
        <b-tab title="Tab 1">
        </b-tab>
        <b-tab title="Tab 2" active>
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

export default {
  components: {
    SignatureLoader,
    SignatureTable,
  },
}
</script>
