function ArtworkCard({ artwork }) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)
  
    const handleImageLoad = () => {
      setImageLoaded(true)
    }
  
    const handleImageError = () => {
      setImageError(true)
      setImageLoaded(true)
    }
  
    return (
      <div className="artwork-card">
        <div className="artwork-image-container">
          {!imageLoaded && (
            <div className="artwork-placeholder">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <img 
            src={imageError ? 'https://via.placeholder.com/400x300?text=Image+Not+Available' : artwork.image}
            alt={artwork.title}
            className={`artwork-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className="artwork-overlay">
            <div className="artwork-actions">
              <button className="btn btn-light btn-sm me-2" title="View Details">
                <i className="bi bi-zoom-in"></i>
              </button>
              <button className="btn btn-light btn-sm me-2" title="Add to Favorites">
                <i className="bi bi-heart"></i>
              </button>
              <button className="btn btn-light btn-sm" title="Share">
                <i className="bi bi-share"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="artwork-info">
          <h5 className="artwork-title" title={artwork.title}>
            {artwork.title}
          </h5>
          <p className="artwork-artist mb-2">{artwork.artist}</p>
          <div className="artwork-details">
            <span className="artwork-date">
              <i className="bi bi-calendar3 me-1"></i>
              {artwork.date}
            </span>
            {artwork.medium && (
              <span className="artwork-medium">
                <i className="bi bi-palette me-1"></i>
                {artwork.medium}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  export default ArtworkCard