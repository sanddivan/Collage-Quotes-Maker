// File: Canvas.jsx

/** @typedef {import('../utils/types.mjs').LayoutDesc} LayoutDesc */

/**
 * @param {number} width
 * @param {number} height
 * @param {LayoutDesc} layout
 * @returns {React.JSX.Element}
 */

export default function Canvas({ width, height, layout }) {
    return (
        <div className="workspace">
            <div
                className="the-canvas"
                style={{
                    width: `${width}px`,
                    height: `${height}px`
                }}
            >
                <div className="the-grid">
                    <p>Coming Soon! {layout.rows}x{layout.columns}</p>
                </div>
            </div>
        </div>
    );
}
