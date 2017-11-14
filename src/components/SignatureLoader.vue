<template>
  <b-container fluid>
    <b-form-row>
      <b-col cols="3">
        <b-form inline>
        <label>Signature prefix:</label>
        <b-input v-model="sig_pref" type="text" style="width: 6em"/>
        </b-form>
      </b-col>
      <b-col cols="5">
        <b-form inline>
        <label>Signature number:</label>
        <b-input v-model.number="sig_num_min" type="number" style="width: 8em"/> - <b-input v-model.number="sig_num_max" type="number" style="width: 8em"/>
        </b-form>
      </b-col>
      <b-col cols="3">
        <b-form inline>
        <label>Year:</label>
        <b-input v-model.number="from_year" type="number" style="width: 5em"/> - <b-input v-model.number="to_year" type="number" style="width: 5em"/>
        </b-form>
      </b-col>
      <b-col cols="1" class="text-right">
        <b-button @click="loadData">Load data</b-button>
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
