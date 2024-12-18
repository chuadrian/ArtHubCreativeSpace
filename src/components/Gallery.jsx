function Gallery({ artworks }) {
    return (
      <div className="container">
        <h2 className="text-center mb-4">Art Gallery</h2>
        <div className="gallery-grid">
          {artworks.map(artwork => (
            <div key={artwork.id} className="artwork-card">
              <img 
                src={artwork.image} 
                alt={artwork.title}
                className="artwork-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available'
                }}
              />
              <div className="p-3">
                <h5 className="card-title">{artwork.title}</h5>
                <p className="card-text text-muted">{artwork.artist}</p>
                <small className="text-muted">{artwork.date}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default Gallery