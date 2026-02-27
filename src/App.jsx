// File: App.jsx

import React, { useState, useRef } from 'react';
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from './constants.mjs'
import GridLayout from "./gridlayout.mjs";

const layouts = new Map();

/**
 * Setup function!
 */

export default function App() {
    initLayouts();

    const [dimensions, setDimensions] = useState({
        width: DEFAULT_CANVAS_WIDTH,
        height: DEFAULT_CANVAS_HEIGHT
    });

    const [layout, setLayout] = useState(layouts.get('0x0'));
    const imgInputRef = useRef(null);

    const handleWidthChange = (event) => {
        setDimensions({...dimensions, width: event.target.value});
    }

    const handleHeightChange = (event) => {
        setDimensions({...dimensions, height: event.target.value});
    }

    const handleLayoutChange = (r, c) => {
        const lName = `${r}x${c}`
        setLayout(layouts.get(lName));
    };

    return (
        <div className="app">
            <div className="sidebar">
                <h2>Settings</h2>

                <div className="field">
                    <label>Canvas Width: </label>
                    <input
                        type="number"
                        value={dimensions.width}
                        onChange={(evt) => handleWidthChange(evt)}
                    />
                </div>

                <div className="field">
                    <label>Canvas Height: </label>
                    <input
                        type="number"
                        value={dimensions.height}
                        onChange={(evt) => handleHeightChange(evt)}
                    />
                </div>

                <h3>Layout</h3>
                <div className="layout-picker">
                    {Array.from(layouts).map(([name, obj]) => (
                        <button
                            key={name}
                            onClick={() => handleLayoutChange(obj.rows, obj.columns)}
                        >
                            {name}
                        </button>
                    ))};
                </div>
            </div>

            <div className="workspace">
                <div
                    className="the-canvas"
                    style={{
                        width: `${dimensions.width}px`,
                        height: `${dimensions.height}px`
                    }}
                >

                    <div className="the-grid">
                        <p>Coming Soon! {layout.name}</p>
                    </div>
                </div>
            </div>

            <input
                ref={imgInputRef}
                type="file"
                accept="image/*"
            />
        </div>
    )
}

/**
 * Create the GridLayout objects corresponding to each of the supported layouts.
 * For now, we will be using 0x0 as a placeholder for a clear canvas.
 */

function initLayouts() {
    const layoutDimsPairs = [[0, 0], [2, 2], [3, 3], [2, 3], [3, 2]];

    layoutDimsPairs.forEach((pair) => {
        const numRows = pair[0];
        const numCols = pair[1];
        const name = `${numRows}x${numCols}`
        layouts.set(name, new GridLayout(numRows, numCols, name));
    });
}
