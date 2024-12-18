function GalleryHeader({ onViewChange, currentView }) {
    return (
      <div className="gallery-header text-center mb-5">
        <h2 className="display-4 mb-4">Discover Amazing Artworks</h2>
        <p className="lead text-muted mb-4">Explore a curated collection of masterpieces from around the world</p>
        <div className="view-toggles">
          <div className="btn-group">
            <button 
              className={`btn ${currentView === 'grid' ? 'btn-custom' : 'btn-outline-custom'}`}
              onClick={() => onViewChange('grid')}
            >
              <i className="bi bi-grid-3x3"></i> Grid
            </button>
            <button 
              className={`btn ${currentView === 'masonry' ? 'btn-custom' : 'btn-outline-custom'}`}
              onClick={() => onViewChange('masonry')}
            >
              <i className="bi bi-columns-gap"></i> Masonry
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default GalleryHeader