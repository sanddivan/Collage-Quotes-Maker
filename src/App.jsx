// File: App.jsx

import { useCanvasContext } from "./hooks/useCanvasContext.js";
import { useLayoutGenerator } from "./hooks/useLayoutGenerator.js";

import Canvas from "./components/Canvas.jsx";
import Sidebar from "./components/Sidebar.jsx";

/**
 * Setup function!
 */

export default function App() {
    const canvasContext = useCanvasContext();
    const layoutsDict = useLayoutGenerator();

    return (
        <div className="app">
            <Sidebar canvasCtx={canvasContext} layouts={layoutsDict} />
            <Canvas width={canvasContext.dimensions.width}
                    height={canvasContext.dimensions.height} />
        </div>
    );
}
