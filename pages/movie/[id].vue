<template>
    <div class="min-h-screen bg-gray-100 py-10 px-4">
      <div v-if="store.loading" class="text-center text-blue-600 animate-pulse">
        Loading detail...
      </div>
  
      <div
        v-else-if="movie"
        class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div class="md:flex">
          <img
            :src="movie.Poster !== 'N/A' ? movie.Poster : fallbackPoster"
            alt="Poster"
            class="w-full md:w-1/3 h-auto object-cover"
          />
          <div class="p-6 space-y-3 md:w-2/3">
            <h1 class="text-3xl font-bold">{{ movie.Title }}</h1>
            <p><strong>Tahun:</strong> {{ movie.Year }}</p>
            <p><strong>Genre:</strong> {{ movie.Genre }}</p>
            <p><strong>Rating:</strong> {{ movie.imdbRating }}</p>
            <p><strong>Plot:</strong> {{ movie.Plot }}</p>
            <p><strong>Director:</strong> {{ movie.Director }}</p>
            <p><strong>Actors:</strong> {{ movie.Actors }}</p>
          </div>
        </div>
      </div>
  
      <div v-else class="text-center text-gray-500">
        Film tidak ditemukan.
      </div>
    </div>
  </template>
  
  <script setup>
  import { useMovieStore } from '@/stores/movie'
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const store = useMovieStore()
  const route = useRoute()
  const fallbackPoster = 'https://via.placeholder.com/300x450?text=No+Poster'
  
  const movie = store.selectedMovie
  
  onMounted(() => {
    const id = route.params.id
    store.getMovieDetail(id)
  })
  </script>
  