// File: App.jsx

import { useCanvasContext } from "./hooks/useCanvasContext.js";
import Canvas from "./components/Canvas.jsx";
import Sidebar from "./components/Sidebar.jsx";

/**
 * Setup function!
 *
 * @returns {React.JSX.Element}
 */

export default function App() {
    const ctx = useCanvasContext();

    return (
        <div className="app">
            <Sidebar canvasCtx={ctx} />
            <Canvas canvasCtx={ctx} />
        </div>
    )
}
