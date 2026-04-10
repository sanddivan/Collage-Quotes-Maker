// File: App.jsx

import { useCanvasContext } from "./hooks/useCanvasContext.js";

import Canvas from "./components/Canvas.jsx";
import Sidebar from "./components/Sidebar.jsx";

/**
 * Setup function!
 */

export default function App() {
    const canvasContext = useCanvasContext();

    return (
        <div className="app">
            <Sidebar canvasCtx={canvasContext} />
            <Canvas canvasCtx={canvasContext} />
        </div>
    );
}
