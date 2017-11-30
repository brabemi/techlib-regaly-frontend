<template>
  <b-container fluid>
    <b-form-row>
      <b-col xl="2">
        <b-input-group>
          <b-input-group-addon>Prefix</b-input-group-addon>
          <b-form-select v-model="sig_pref" :options="options"/>
        </b-input-group>
      </b-col>
      <b-col xl="4">
        <b-input-group>
          <b-input-group-addon>Number</b-input-group-addon>
          <b-form-input v-model.number="sig_num_min" type="number" min="0"></b-form-input>
          <b-input-group-addon>-</b-input-group-addon>
          <b-form-input v-model.number="sig_num_max" type="number" min="0"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col xl="4">
        <b-input-group>
          <b-input-group-addon>Year</b-input-group-addon>
          <b-form-input v-model.number="from_year" type="number" min="0"></b-form-input>
          <b-input-group-addon>-</b-input-group-addon>
          <b-form-input v-model.number="to_year" type="number" min="0"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col xl="2" class="text-right">
        <b-button v-if="store.state.loadingData" variant="secondary" disabled>
          Load data <span class="fa fa-spinner fa-spin"/>
        </b-button>
        <b-button v-else variant="primary" @click="loadData">Load data</b-button>
      </b-col>
    </b-form-row>
  </b-container>
</template>

<script>
import store from '@/stores/SignatureStore'

export default {
  data() {
    return {
      store: store,
      sig_pref: '',
      sig_num_min: '',
      sig_num_max: '',
      from_year: '',
      to_year: ''
    }
  },
  computed: {
    options: function() {
      var options = [{ value: '', text: '' }]
      options = options.concat(store.state.prefixes.map(function(prefix) {
        return { value: prefix, text: prefix }
      }))
      return options
    },
  },
  mounted: function() {
    store.dispatch('fetchPrefixes')
  },
  methods: {
    loadData() {
      var filter = {
        sig_pref: this.sig_pref,
        sig_num_min: this.sig_num_min,
        sig_num_max: this.sig_num_max,
        from_year: this.from_year,
        to_year: this.to_year
      }
      store.dispatch('fetchData', filter)
    }
  }
}
</script>
