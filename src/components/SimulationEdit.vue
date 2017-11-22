<template>
  <simulation/>
</template>

<script>
import Simulation from '@/components/Simulation'

import store from '@/stores/SimulationStore'

export default {
  data() {
    return {
      store: store,
    }
  },
  created: function() {
    store.dispatch('fetchData', this.$route.params.id)
    // console.log(this.$route.params.id)
  },
  components: {
    Simulation,
  },
}
</script>
