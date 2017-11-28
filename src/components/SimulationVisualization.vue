<template>
  <b-container fluid class="text-center">
    <b-card v-if="bookMap.unplaced"
      header="Unable to place"
      border-variant="danger"
      header-border-variant="danger"
      header-text-variant="danger"
      class="text-center m-3">
      <p class="card-text">
        {{
          bookMap.unplaced.start.signature + ' - ' + bookMap.unplaced.end.signature +
          ' (' +  Math.ceil(bookMap.unplaced.length).toLocaleString('cs-CZ') + ' mm)'
         }}
      </p>
    </b-card>
    <b-card v-for="(shelf, index) in bookMap" :key="index"
      :header="
        (index + 1) + ': ' + shelf.shelf.name +
        ' (' + shelf.shelf.levels + ' × ' + shelf.shelf.row_length.toLocaleString('cs-CZ') + ' mm)'
      "
      class="text-center d-inline-block m-3">
      <p v-for="(level, index) in shelf.books" :key="index" class="card-text">
        {{
          (level.start != null ? level.start.signature + ' - ' + level.end.signature : 'empty') +
          ' (free ' + level.free.toLocaleString('cs-CZ') + ' mm)'
        }}
      </p>
    </b-card>
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
        return {shelf: shelf, books: [], unplaced: null}
      })
      if (store.state.books.length > 0) {
        var i = 0
        var rest = store.state.books[i].volumes_in_timerange * store.state.volumeWidth
        var freeSpace = 0
        bookMap.forEach(function(shelf) {
          var deadSpace = store.state.volumeWidth * shelf.shelf.segment_lengths.length
          for (var level = 0; level < shelf.shelf.levels; level++) {
            if (i < store.state.books.length) {
              var start = store.state.books[i]
              freeSpace = shelf.shelf.row_length - deadSpace
              while (
                (freeSpace > rest) &&
                (i < store.state.books.length)
              ) {
                freeSpace -= rest
                i++
                if (i < store.state.books.length) {
                  rest = store.state.books[i].volumes_in_timerange * store.state.volumeWidth
                }
              }
              if (i >= store.state.books.length) {
                shelf.books.push({start: start, end: store.state.books[i - 1], free: freeSpace})
                continue
              }
              shelf.books.push({start: start, end: store.state.books[i], free: 0})
              rest -= freeSpace
              if (rest <= 0) {
                i++
                if (i < store.state.books.length) {
                  rest = store.state.books[i].volumes_in_timerange * store.state.volumeWidth
                }
              }
            } else {
              shelf.books.push({start: null, end: null, free: shelf.shelf.row_length})
            }
          }
        })
        if (i < store.state.books.length) {
          var start = store.state.books[i]
          i++
          while (i < store.state.books.length) {
            rest += store.state.books[i].volumes_in_timerange * store.state.volumeWidth
            i++
          }
          bookMap.unplaced = {start: start, end: store.state.books[i - 1], length: rest}
        }
      }
      return bookMap
    }
  },
  methods: {
  },
}
</script>
