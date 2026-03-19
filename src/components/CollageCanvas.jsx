// File: CollageCanvas.jsx

/** @typedef {import('../utils/types.mjs').LayoutDesc} LayoutDesc */

import { useGridState } from '../hooks/useGridState.mjs'

/**
 * @param {number} width
 * @param {number} height
 * @param {LayoutDesc} layout
 * @returns {React.JSX.Element}
 */

export default function CollageCanvas({ width, height, layout }) {
    const numSlots = layout.rows * layout.columns;
    const grid = useGridState(numSlots);

    const gridDynamicCss = {
        '--grid-rows': layout.rows,
        '--grid-columns': layout.columns
    }

    return (
        <div className="workspace">
            <div
                className="the-canvas"
                style={{
                    width: `${width}px`,
                    height: `${height}px`
                }}
            >
                <div className="the-grid" style={gridDynamicCss}>
                    {slots.map((src, index) => (
                        <div
                            key={`slot-${index}`}
                            className="slot"
                            onClick={() => handleSlotClick(index)}
                        >
                            {src ? (
                                <img src={src} alt={`Image Slot ${index}`} />
                            ) : (
                                <div className="placeholder">
                                    <p>Click to Add Image</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <input
                type="file"
                ref={imgInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                hidden
            />
        </div>
    );
}
