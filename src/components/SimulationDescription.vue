<template>
  <b-container>
    <b-row>
      <b-form-textarea v-model="store.state.description"/>
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
