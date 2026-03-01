// File: Canvas.jsx

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
