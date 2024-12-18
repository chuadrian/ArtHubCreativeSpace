import { useEffect, useRef, useState } from 'react'

function Canvas() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.lineCap = 'round'
    context.strokeStyle = color
    context.lineWidth = brushSize
  }, [color, brushSize])

  const startDrawing = (e) => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    context.beginPath()
    context.moveTo(x, y)
    setIsDrawing(true)
  }

  const draw = (e) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    context.lineTo(x, y)
    context.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="container">
      <div className="canvas-container">
        <h2 className="text-center mb-4">Drawing Canvas</h2>
        <div className="tools">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="form-control form-control-color"
          />
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(e.target.value)}
            className="form-range"
          />
          <button className="btn btn-custom" onClick={clearCanvas}>
            Clear Canvas
          </button>
        </div>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
      </div>
    </div>
  )
}

export default Canvas