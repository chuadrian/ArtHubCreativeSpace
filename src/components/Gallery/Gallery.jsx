import { useState, useEffect, useCallback } from 'react'
import GalleryHeader from './GalleryHeader'
import FilterBar from './FilterBar'
import SearchBar from './SearchBar'
import ArtworkCard from './ArtworkCard'
import { fetchArtworks, searchArtworks } from '../../utils/apiUtils'
import { debounce } from '../../utils/helpers'

function Gallery() {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [view, setView] = useState('grid')
  const [filter, setFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.length > 2) {
        setLoading(true)
        try {
          const results = await searchArtworks(query)
          setArtworks(results)
          setHasMore(false)
        } catch (err) {
          setError('Failed to search artworks')
        }
        setLoading(false)
      } else if (query.length === 0) {
        setPage(1)
        loadArtworks(true)
      }
    }, 500),
    []
  )

  const loadArtworks = async (reset = false) => {
    setLoading(true)
    setError(null)
    try {
      const newArtworks = await fetchArtworks(reset ? 1 : page)
      setArtworks(prev => reset ? newArtworks : [...prev, ...newArtworks])
      setHasMore(newArtworks.length === 12)
    } catch (err) {
      setError('Failed to load artworks')
    }
    setLoading(false)
  }

  useEffect(() => {
    loadArtworks()
  }, [page])

  const handleSearch = (query) => {
    setSearchQuery(query)
    debouncedSearch(query)
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    setPage(1)
    loadArtworks(true)
  }

  return (
    <div className="gallery-container">
      <GalleryHeader onViewChange={setView} currentView={view} />
      
      <div className="gallery-controls">
        <SearchBar onSearch={handleSearch} />
        <FilterBar onFilterChange={handleFilterChange} activeFilter={filter} />
      </div>
      
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}
      
      <div className={`gallery-grid ${view === 'masonry' ? 'masonry' : ''}`}>
        {artworks.map(artwork => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
      
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
      {!loading && !error && hasMore && (
        <div className="text-center my-5">
          <button 
            className="btn btn-lg btn-custom"
            onClick={() => setPage(prev => prev + 1)}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Load More Artworks
          </button>
        </div>
      )}
    </div>
  )
}

export default Gallery