import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  // Sidebar States
  const [spacing, setSpacing] = useState(10);
  const [frameColor, setFrameColor] = useState('#333333');
  const [cols, setCols] = useState(3);
  
  // Image Data State (Array of image URLs)
  const [images, setImages] = useState(Array(6).fill(null));

  // Handle image upload for a specific slot
  const handleSlotClick = (index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        const newImages = [...images];
        newImages[index] = url;
        setImages(newImages);
      }
    };
    input.click();
  };

  return (
    <div className="app-container">
      {/* Sidebar Controls */}
      <aside className="sidebar">
        <h3>Collage Settings</h3>
        <label>Columns: {cols}</label>
        <input type="range" min="1" max="5" value={cols} onChange={(e) => setCols(e.target.value)} />
        
        <label>Spacing: {spacing}px</label>
        <input type="range" min="0" max="50" value={spacing} onChange={(e) => setSpacing(e.target.value)} />
        
        <label>Frame Color</label>
        <input type="color" value={frameColor} onChange={(e) => setFrameColor(e.target.value)} />
        
        <button className="download-btn">Download PNG</button>
      </aside>

      {/* The Collage Canvas */}
      <main className="canvas">
        <div 
          className="collage-grid" 
          style={{ 
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: `${spacing}px`,
            backgroundColor: frameColor,
            padding: `${spacing}px`
          }}
        >
          {images.map((img, index) => (
            <div 
              key={index} 
              className="image-slot" 
              onClick={() => handleSlotClick(index)}
            >
              {img ? <img src={img} alt="slot" /> : <span>Click to add</span>}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;