<template>
  <b-container>
    <b-row class='mb-2'>
      Description
    </b-row>
    <b-row>
      <b-form-textarea placeholder="Enter description" v-model="store.state.description"/>
    </b-row>
    <b-row v-if="store.state.description !== ''" class='mt-2'>
      Preview
    </b-row>
    <b-row>
      <simulation-description-view/>
    </b-row>
  </b-container>
</template>

<script>
import store from '@/stores/SimulationStore'
import SimulationDescriptionView from '@/components/SimulationDescriptionView'

export default {
  data() {
    return {
      store: store,
    }
  },
  components: {
    SimulationDescriptionView,
  },
}
</script>
