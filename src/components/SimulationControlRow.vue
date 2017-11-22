<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3" class="text-left">
        <b-input-group>
          <b-input-group-addon>Name</b-input-group-addon>
          <b-form-input v-model="store.state.name" type="text"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="3" class="text-left">
        <b-input-group>
          <b-input-group-addon>Volume size</b-input-group-addon>
          <b-form-input v-model.number="store.state.volumeWidth" type="number" min="0.00"></b-form-input>
          <b-input-group-addon>mm</b-input-group-addon>
        </b-input-group>
      </b-col>
      <b-col cols="3" class="text-left">
      </b-col>
      <b-col cols="3" class="text-right">
        <b-button variant="primary">Save simulation</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import store from '@/stores/SimulationStore'

export default {
  data() {
    return {
      store: store,
    }
  },
  methods: {
  },
}
</script>
