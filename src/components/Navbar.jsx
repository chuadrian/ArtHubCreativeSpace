function Navbar({ activeTab, setActiveTab }) {
    return (
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="bi bi-palette-fill me-2"></i>
            ArtistHub
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeTab === 'gallery' ? 'active' : ''}`}
                  onClick={() => setActiveTab('gallery')}
                  href="#"
                >
                  <i className="bi bi-grid-3x3-gap me-1"></i>
                  Gallery
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeTab === 'palette' ? 'active' : ''}`}
                  onClick={() => setActiveTab('palette')}
                  href="#"
                >
                  <i className="bi bi-droplet-fill me-1"></i>
                  Color Palette
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeTab === 'canvas' ? 'active' : ''}`}
                  onClick={() => setActiveTab('canvas')}
                  href="#"
                >
                  <i className="bi bi-brush me-1"></i>
                  Canvas
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
  
  export default Navbar