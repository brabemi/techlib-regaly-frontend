<template>
  <b-container fluid>
    <b-form-row>
      <b-col sm="3">
        <div class="form-group">
        <label>Signature prefix:</label>
        <input v-model="sig_pref" type="text" style="width: 6em"/>
        </div>
      </b-col>
      <b-col sm="4">
        <div class="form-group">
        <label>Signature number:</label>
        <input v-model.number="sig_num_min" type="number" style="width: 6em"/> - <input v-model.number="sig_num_max" type="number" style="width: 6em"/>
        </div>
      </b-col>
      <b-col sm="4">
        <div class="form-group">
        <label>Year:</label>
        <input v-model.number="from_year" type="number" style="width: 5em"/> - <input v-model.number="to_year" type="number" style="width: 5em"/>
        </div>
      </b-col>
      <b-col class="text-right" sm="1">
        <b-button @click="loadData">Load data</b-button>
      </b-col>
    </b-form-row>
  </b-container>
</template>

<script>
import store from '@/stores/store'

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
