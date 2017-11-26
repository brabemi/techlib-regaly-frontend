<template>
  <b-container class="rounded border mt-2 mb-2">
    <b-row>
      <b-col v-html="compiledMarkdown">
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import store from '@/stores/SimulationStore'
import marked from 'marked'

export default {
  data() {
    return {
      store: store,
      config: {
        gfm: true,
        tables: true,
        breaks: true,
        sanitize: true,
        smartLists: true,
        smartypants: true,
      },
    }
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.store.state.description, this.config)
    }
  },
}
</script>
