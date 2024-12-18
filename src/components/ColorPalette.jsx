import { useState } from 'react'

function ColorPalette() {
  const [colors, setColors] = useState(['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'])
  
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const generateNewPalette = () => {
    const newColors = Array(5).fill().map(() => generateRandomColor())
    setColors(newColors)
  }

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color)
    alert(`Color ${color} copied to clipboard!`)
  }

  return (
    <div className="container">
      <div className="color-palette">
        <h2 className="text-center mb-4">Color Palette Generator</h2>
        <div className="d-flex justify-content-center flex-wrap mb-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className="color-box"
              style={{ backgroundColor: color }}
              onClick={() => copyToClipboard(color)}
              title="Click to copy"
            >
              <div className="p-2 text-center">
                <small>{color}</small>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="btn btn-custom" onClick={generateNewPalette}>
            Generate New Palette
          </button>
        </div>
      </div>
    </div>
  )
}

export default ColorPalette