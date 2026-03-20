// npm install html2canvas

// CollageCanvas.jsx

export default function CollageCanvas({ width, height, layout, canvasRef }) {
    // ... your existing code ...

    return (
        <div className={styles.workspace}>
            <div
                ref={canvasRef} // <--- Attach the ref here!
                className={styles.theCanvas}
                style={{ width: `${width}px`, height: `${height}px` }}
            >
                {/* ... the rest of your grid ... */}
            </div>
        </div>
    );
}

// Download Logic

import html2canvas from 'html2canvas';
import { useRef } from 'react';

export default function App() {
    const canvasRef = useRef(null);
    const collage = useCollageState();

    const downloadCollage = async () => {
        if (!canvasRef.current) return;

        // 1. Capture the element
        const canvas = await html2canvas(canvasRef.current, {
            useCORS: true, // Helps with external images if you add them later
            backgroundColor: null, // Keeps transparency if your CSS allows it
            logging: false,
        });

        // 2. Convert to image data
        const image = canvas.toDataURL("image/png");

        // 3. Create a "fake" link to trigger the download
        const link = document.createElement('a');
        link.href = image;
        link.download = `my-collage-${Date.now()}.png`;
        link.click();
    };

    return (
        <div className="app">
            <Sidebar
                // ... other props ...
                onDownload={downloadCollage}
            />
            <CollageCanvas
                // ... other props ...
                canvasRef={canvasRef}
            />
        </div>
    );
}
