<template>
  <b-container fluid>
    <b-row>
      <b-col xl="3" class="text-left">
        <b-input-group>
          <b-input-group-addon>Name</b-input-group-addon>
          <b-form-input v-model="store.state.name" type="text"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col xl="3" class="text-left">
        <b-input-group>
          <b-input-group-addon>Volume size</b-input-group-addon>
          <b-form-input v-model.number="store.state.volumeWidth" type="number" min="1"></b-form-input>
          <b-input-group-addon>mm</b-input-group-addon>
        </b-input-group>
      </b-col>
      <b-col xl="3" class="text-left">
        <b-input-group>
          <b-input-group-addon>Reserve</b-input-group-addon>
          <b-form-input v-model.number="store.state.reserve" type="number" min="0"></b-form-input>
          <b-input-group-addon>years</b-input-group-addon>
        </b-input-group>
      </b-col>
      <b-col xl="3" class="text-right">
        <b-button variant="primary" @click="saveSimulation">Save simulation</b-button>
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
    saveSimulation() {
      store.dispatch('saveSimulation')
    }
  },
}
</script>
