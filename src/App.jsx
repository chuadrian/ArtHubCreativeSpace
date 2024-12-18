import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Gallery from './components/Gallery'
import ColorPalette from './components/ColorPalette'
import Canvas from './components/Canvas'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('gallery')
  const [artworks, setArtworks] = useState([])

  useEffect(() => {
    // Fetch artworks from Art Institute of Chicago API
    fetch('https://api.artic.edu/api/v1/artworks?limit=12')
      .then(res => res.json())
      .then(data => {
        setArtworks(data.data.map(artwork => ({
          id: artwork.id,
          title: artwork.title,
          artist: artwork.artist_display,
          image: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
          date: artwork.date_display
        })))
      })
      .catch(err => console.error('Error fetching artworks:', err))
  }, [])

  const renderContent = () => {
    switch(activeTab) {
      case 'gallery':
        return <Gallery artworks={artworks} />
      case 'palette':
        return <ColorPalette />
      case 'canvas':
        return <Canvas />
      default:
        return <Gallery artworks={artworks} />
    }
  }

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App