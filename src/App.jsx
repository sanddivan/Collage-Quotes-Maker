// File: App.jsx

import { useRef } from 'react';
import Canvas from "./components/Canvas.jsx";
import Sidebar from "./components/Sidebar.jsx";
import useCollageState from './hooks/useCollageState.mjs'

/**
 * Setup function!
 */

export default function App() {
    const collage = useCollageState();
    const imgInputRef = useRef(null);

    return (
        <div className="app">
            <Sidebar
                dimensions={collage.dimensions}
                onWidthChange={(evt) => collage.setWidth(evt.target.value)}
                onHeightChange={(evt) => collage.setHeight(evt.target.value)}
                allLayouts={collage.allLayouts}
                selectedLayoutKey={collage.layoutKey}
                onLayoutChange={collage.setLayout}
            />

            <Canvas
                width={collage.dimensions.width}
                height={collage.dimensions.height}
                layout={collage.currentLayout}
            />

            <input
                ref={imgInputRef}
                type="file"
                accept="image/*"
                hidden
            />
        </div>
    );
}
