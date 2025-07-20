<template>
  <div 
    class="block bg-white rounded-xl shadow-md overflow-hidden hover:scale-[1.02] transition transform duration-200 cursor-pointer"
    @click="$emit('show-detail', movie.imdbID)"
  >
    <img
      :src="movie.Poster !== 'N/A' ? movie.Poster : fallbackPoster"
      :alt="movie.Title"
      class="w-full h-72 object-cover"
    />
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-1">{{ movie.Title }}</h3>
      <p class="text-gray-500">{{ movie.Year }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['show-detail'])

const fallbackPoster = 'https://via.placeholder.com/300x450?text=No+Poster'
</script>