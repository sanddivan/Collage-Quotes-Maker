// File: App.jsx

import Canvas from "./components/Canvas.jsx";
import Sidebar from "./components/Sidebar.jsx";

/**
 * Setup function!
 *
 * @returns {React.JSX.Element}
 */

export default function App() {
    return (
        <div className="app">
            <Sidebar />
            <Canvas />
        </div>
    )
}
