const API_BASE_URL = 'https://api.artic.edu/api/v1/artworks'
const IMAGE_BASE_URL = 'https://www.artic.edu/iiif/2'

const processArtwork = (artwork) => ({
  id: artwork.id,
  title: artwork.title,
  artist: artwork.artist_display,
  image: artwork.image_id ? 
    `${IMAGE_BASE_URL}/${artwork.image_id}/full/843,/0/default.jpg` :
    null,
  date: artwork.date_display,
  medium: artwork.medium_display,
  dimensions: artwork.dimensions,
  thumbnail: artwork.thumbnail ? artwork.thumbnail.lqip : null
})

export const fetchArtworks = async (page = 1, limit = 12) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/artworks/search?q=&page=${page}&limit=${limit}&fields=id,title,artist_display,image_id,date_display,medium_display,dimensions,thumbnail`
    )
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    return data.data.map(processArtwork)
  } catch (error) {
    console.error('Error fetching artworks:', error)
    throw error
  }
}

export const searchArtworks = async (query, limit = 12) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/artworks/search?q=${encodeURIComponent(query)}&limit=${limit}&fields=id,title,artist_display,image_id,date_display,medium_display,dimensions,thumbnail`
    )
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    return data.data.map(processArtwork)
  } catch (error) {
    console.error('Error searching artworks:', error)
    throw error
  }
}

export const getArtworkDetails = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/artworks/${id}?fields=id,title,artist_display,image_id,date_display,medium_display,dimensions,thumbnail,description,provenance_text,exhibition_history,publication_history`
    )
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    return processArtwork(data.data)
  } catch (error) {
    console.error('Error fetching artwork details:', error)
    throw error
  }
}