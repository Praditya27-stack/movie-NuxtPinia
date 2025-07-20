<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition name="fade">
          <div v-if="isOpen" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>
        </Transition>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <Transition name="popup">
          <div v-if="isOpen" class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
            <div v-if="store.loading" class="p-8 text-center">
              <p class="text-lg font-medium">Loading movie details...</p>
            </div>
            
            <div v-else-if="store.selectedMovie" class="bg-white">
              <div class="sm:flex">
                <div class="w-full sm:w-1/3">
                  <img 
                    :src="store.selectedMovie.Poster !== 'N/A' ? store.selectedMovie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'" 
                    :alt="store.selectedMovie.Title"
                    class="w-full h-auto object-cover"
                  >
                </div>
                <div class="p-6 sm:w-2/3">
                  <div class="flex justify-between items-start">
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ store.selectedMovie.Title }}</h2>
                    <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                      <span class="sr-only">Close</span>
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div class="mt-2 space-y-2 text-gray-600">
                    <p><span class="font-medium">Year:</span> {{ store.selectedMovie.Year }}</p>
                    <p v-if="store.selectedMovie.Rated"><span class="font-medium">Rated:</span> {{ store.selectedMovie.Rated }}</p>
                    <p><span class="font-medium">Released:</span> {{ store.selectedMovie.Released }}</p>
                    <p><span class="font-medium">Runtime:</span> {{ store.selectedMovie.Runtime }}</p>
                    <p><span class="font-medium">Genre:</span> {{ store.selectedMovie.Genre }}</p>
                    <p><span class="font-medium">Director:</span> {{ store.selectedMovie.Director }}</p>
                    <p><span class="font-medium">Actors:</span> {{ store.selectedMovie.Actors }}</p>
                    <p><span class="font-medium">IMDb Rating:</span> {{ store.selectedMovie.imdbRating }}/10</p>
                  </div>
                  
                  <div class="mt-4">
                    <h3 class="font-medium text-gray-900">Plot:</h3>
                    <p class="text-gray-600 mt-1">{{ store.selectedMovie.Plot }}</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-gray-50 px-6 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="closeModal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useMovieStore } from '~/stores/movie'

const store = useMovieStore()
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  movieId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

watch(() => props.isOpen, async (isOpen) => {
  if (isOpen) {
    await store.getMovieDetail(props.movieId)
  }
}, { immediate: true })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.popup-enter-active {
  transition: all 0.2s ease-out;
}

.popup-leave-active {
  transition: all 0.2s ease-in;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
