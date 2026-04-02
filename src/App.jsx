// File: App.jsx

import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from "./constants.js";
import { useLayoutGenerator } from "./hooks/useLayoutGenerator.js";

import Canvas from "./components/Canvas.jsx";
import Sidebar from "./components/Sidebar.jsx";

/**
 * Setup function!
 */

export default function App() {
    const layoutsDict = useLayoutGenerator();

    return (
        <div className="app">
            <Sidebar layouts={layoutsDict} />
            <Canvas width={DEFAULT_CANVAS_WIDTH} height={DEFAULT_CANVAS_HEIGHT} />
        </div>
    );
}
