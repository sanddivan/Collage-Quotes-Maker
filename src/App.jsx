// File: App.jsx

import { useCanvasContext } from "./hooks/useCanvasContext.js";
import { useLayoutContext } from "./hooks/useLayoutContext.js";

import Canvas from "./components/Canvas.jsx";
import Sidebar from "./components/Sidebar.jsx";

/**
 * Setup function!
 *
 * @returns {React.JSX.Element}
 */

export default function App() {
    const canvasCtx = useCanvasContext();
    const layoutCtx = useLayoutContext();

    return (
        <div className="app">
            <Sidebar canvasCtx={canvasCtx} layoutCtx={layoutCtx} />
            <Canvas canvasCtx={canvasCtx} layoutCtx={layoutCtx} />
        </div>
    )
}
