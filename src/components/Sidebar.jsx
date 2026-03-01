// File: Sidebar.jsx

export default function Sidebar({
    dimensions,
    onWidthChange,
    onHeightChange,
    allLayouts,
    selectedLayoutKey,
    onLayoutChange
}) {
    return (
        <div className="sidebar">
            <h2>Settings</h2>

            <div className="field">
                <label>Canvas Width: </label>
                <input
                    type="number"
                    value={dimensions.width}
                    onChange={onWidthChange}
                />
            </div>

            <div className="field">
                <label>Canvas Height: </label>
                <input
                    type="number"
                    value={dimensions.height}
                    onChange={onHeightChange}
                />
            </div>

            <h3>Layout</h3>

            <div className="layout-picker">
                {Object.keys(allLayouts).map((lKey) => (
                    <button
                        key={lKey}
                        onClick={() => onLayoutChange(lKey)}
                        style={{
                            fontWeight: lKey === selectedLayoutKey ? "bold" : "normal"
                        }}
                    >
                        {lKey}
                    </button>
                ))}
            </div>
        </div>
    );
}
