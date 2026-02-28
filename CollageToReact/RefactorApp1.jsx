import { useRef } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Canvas from "./components/Canvas.jsx";
import useCollageState from "./hooks/useCollageState.js";

export default function App() {
  const collage = useCollageState();
  const imgInputRef = useRef(null);

  return (
    <div className="app">
      <Sidebar
        dimensions={collage.dimensions}
        onWidthChange={(e) => collage.setWidth(e.target.value)}
        onHeightChange={(e) => collage.setHeight(e.target.value)}
        layouts={collage.layouts}
        selectedLayoutKey={collage.layoutKey}
        onLayoutChange={collage.setLayout}
      />

      <Canvas
        width={collage.dimensions.width}
        height={collage.dimensions.height}
        layoutKey={collage.layoutKey}
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