// File: App.jsx

import CollageCanvas from "./components/CollageCanvas.jsx";
import Sidebar from "./components/Sidebar.jsx";
import useCollageState from './hooks/useCollageState.mjs'

/**
 * Setup function!
 */

export default function App() {
    const collage = useCollageState();

    const handleWidthChange = (evt) => {
        collage.updateDimensionFunc('width', evt.target.value);
    };

    const handleHeightChange = (evt) => {
        collage.updateDimensionFunc('height', evt.target.value);
    };

    return (
        <div className="app">
            <Sidebar
                dimensions={collage.dimensions}
                onWidthChange={handleWidthChange}
                onHeightChange={handleHeightChange}
                allLayouts={collage.allLayouts}
                selectedLayoutKey={collage.layoutKey}
                onLayoutChange={collage.setLayoutFunc}
            />

            <CollageCanvas
                width={collage.dimensions.width}
                height={collage.dimensions.height}
                layout={collage.currentLayout}
            />
        </div>
    );
}
