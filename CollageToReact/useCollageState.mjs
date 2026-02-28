import { useState } from "react";
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from "../constants.mjs";

const LAYOUTS = {
  "0x0": { rows: 0, columns: 0 },
  "2x2": { rows: 2, columns: 2 },
  "3x3": { rows: 3, columns: 3 },
  "2x3": { rows: 2, columns: 3 },
  "3x2": { rows: 3, columns: 2 },
};

export default function useCollageState() {
  const [dimensions, setDimensions] = useState({
    width: DEFAULT_CANVAS_WIDTH,
    height: DEFAULT_CANVAS_HEIGHT,
  });

  const [layoutKey, setLayoutKey] = useState("0x0");

  const setWidth = (value) => {
    setDimensions((prev) => ({
      ...prev,
      width: Number(value),
    }));
  };

  const setHeight = (value) => {
    setDimensions((prev) => ({
      ...prev,
      height: Number(value),
    }));
  };

  const currentLayout = LAYOUTS[layoutKey];

  return {
    dimensions,
    layoutKey,
    currentLayout,
    layouts: LAYOUTS,
    setWidth,
    setHeight,
    setLayout: setLayoutKey,
  };
}