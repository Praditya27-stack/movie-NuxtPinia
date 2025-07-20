// stores/movie.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'

export const useMovieStore = defineStore('movie', () => {
  const movies = ref<MovieSearchResult[]>([])                
  const selectedMovie = ref(null)      
  const loading = ref(false)

  const config = useRuntimeConfig()
  const apiKey = config.public.omdbApiKey

 
  async function searchMovies(query: string) {
    loading.value = true
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
      const data = await res.json()
      if (data.Response === 'True') {
        movies.value = data.Search
      } else {
        movies.value = [] 
      }
    } catch (err) {
      console.error('Error saat searchMovies:', err)
    } finally {
      loading.value = false
    }
  }

  async function getMovieDetail(id: string) {
    loading.value = true
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
      const data = await res.json()
      if (data.Response === 'True') {
        selectedMovie.value = data
      } else {
        selectedMovie.value = null
      }
    } catch (err) {
      console.error('Error saat getMovieDetail:', err)
    } finally {
      loading.value = false
    }
  }

interface MovieSearchResult {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

interface OMDBResponse {
  Search: MovieSearchResult[]
  totalResults: string
  Response: 'True' | 'False'
  Error?: string
}

async function fetchDefaultMovies() {
  loading.value = true
  try {

    const defaultQueries = ['action', 'comedy', 'drama', 'adventure', 'superhero']
    const randomQuery = defaultQueries[Math.floor(Math.random() * defaultQueries.length)]
    const res = await $fetch<OMDBResponse>(`https://www.omdbapi.com/?apikey=${apiKey}&s=${randomQuery}&type=movie`)
    
    if (res.Response === 'True') {
      movies.value = res.Search.slice(0, 8) 
    } else {
      movies.value = []
    }
  } catch (err) {
    console.error('Error fetching default movies:', err)
    movies.value = []
  } finally {
    loading.value = false
  }
}

async function fetchPopularMovies() {
  loading.value = true
  try {
    const popularQueries = ['avengers', 'spider-man', 'the dark knight', 'inception', 'interstellar', 'the shawshank redemption', 'the godfather', 'pulp fiction']
    
    const moviesPromises = popularQueries.slice(0, 8).map(query => 
      $fetch<OMDBResponse>(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&type=movie`)
    )
    
    const results = await Promise.all(moviesPromises)
    const popularMovies: MovieSearchResult[] = []
    
    for (const result of results) {
      if (result.Response === 'True' && result.Search.length > 0) {
        const movie = result.Search[0]
        if (!popularMovies.some(m => m.imdbID === movie.imdbID)) {
          popularMovies.push(movie)
        }
      }
    }
    
    movies.value = popularMovies
  } catch (err) {
    console.error('Error fetching popular movies:', err)
    movies.value = []
  } finally {
    loading.value = false
  }
}

return {
  movies,
  selectedMovie,
  loading,
  searchMovies,
  getMovieDetail,
  fetchDefaultMovies,
  fetchPopularMovies
}
})
