<template>
  <b-container fluid>
    <b-card-group deck>
      <b-card v-for="(shelf, index) in bookMap" :key="index"
        :header="shelf.shelf.name"
        class="text-center">
        <p class="card-text">{{ shelf }}</p>
      </b-card>
    </b-card-group>
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
  computed: {
    bookMap: function() {
      var bookMap = store.state.shelfs.map(function(shelf) {
        return {shelf: shelf, books: []}
      })
      bookMap.forEach(function(shelf) {
        for (var level = 0; level < shelf.shelf.levels; level++) {
          shelf.books.push(level)
        }
      })
      return bookMap
    }
  },
  methods: {
  },
}
</script>
