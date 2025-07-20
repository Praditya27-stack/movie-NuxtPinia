<template>
    <div class="flex flex-col items-center gap-4">
      <input
        v-model="searchQuery"
        @keyup.enter="onSearch"
        type="text"
        placeholder="Cari Film"
        class="w-full max-w-md p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="onSearch"
        class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >Cari
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useMovieStore } from '@/stores/movie'
  
  const store = useMovieStore()
  const searchQuery = ref('')
  
  function onSearch() {
    if (searchQuery.value.trim() !== '') {
      store.searchMovies(searchQuery.value.trim())
    }
  }
  </script>
  