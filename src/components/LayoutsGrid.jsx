// File: LayoutsGrid.jsx

/**
 * @param {Object} props
 * @param {import("../data/base-layouts.json")} props.layoutsData
 * @param {import("../types/layoutTypes.js").LayoutContext} props.layoutCtx
 * @param {string} props.btnStyle
 * @returns {React.JSX.Element}
 */

export default function LayoutsGrid({ layoutsData, layoutCtx, btnStyle }) {
    if (!layoutsData || !layoutCtx.layoutFamily) {
        return (<div></div>);
    }

    return (
        <div className="layouts-area">
            <h4 style={{ textTransform: "capitalize" }}>
                {layoutCtx.layoutFamilyKey} Layouts
            </h4>

            <div className="layouts-grid">
                {Object.keys(layoutCtx.layoutFamily).map((lKey) => (
                    <button
                        key={lKey}
                        className={btnStyle}
                        onClick={() => layoutCtx.setLayoutKeyAction(lKey)}
                        style={{
                            fontWeight: lKey === layoutCtx.layoutKey
                                ? "bold"
                                : "normal"
                        }}
                    >
                        {lKey}
                    </button>
                ))}
            </div>
        </div>
    )
}
