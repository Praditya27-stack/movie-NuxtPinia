<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <h1 class="text-3xl font-bold text-center mb-6">Movie</h1>

    <SearchBar />

    <div class="flex justify-center mt-6" v-if="store.loading">
      <span class="text-blue-600 font-medium animate-pulse">Loading...</span>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
      v-if="!store.loading && store.movies.length > 0"
    >
      <MovieCard
        v-for="movie in store.movies"
        :key="movie.imdbID"
        :movie="movie"
        @show-detail="showMovieDetail"
      />
    </div>

    <div v-if="!store.loading && store.movies.length === 0" class="text-center mt-10 text-gray-500">
      Tidak ada hasil ditemukan. Coba ketik judul lain.
    </div>
    <MovieDetailModal 
      :is-open="isModalOpen" 
      :movie-id="selectedMovieId"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue'
import MovieCard from '@/components/MovieCard.vue'
import MovieDetailModal from '@/components/MovieDetailModal.vue'
import { useMovieStore } from '@/stores/movie'
import { ref } from 'vue'

const store = useMovieStore()
const isModalOpen = ref(false)
const selectedMovieId = ref('')

const showMovieDetail = (movieId) => {
  selectedMovieId.value = movieId
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedMovieId.value = ''
}


onMounted(() => {
  store.fetchPopularMovies()
})
</script>
