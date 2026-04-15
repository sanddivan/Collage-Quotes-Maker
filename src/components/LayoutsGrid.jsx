// File: LayoutsGrid.jsx

/** @typedef {import("../types/layoutTypes.js").LayoutContext} T_LayoutContext */

/**
 * @param {Object} props
 * @param {Object} props.layoutsData // TODO: Make an actual type for the JSON this object represents.
 * @param {T_LayoutContext} props.layoutCtx
 * @param {string} props.btnStyle
 * @returns {React.JSX.Element}
 */

export default function LayoutsGrid({ layoutsData, layoutCtx, btnStyle }) {
    if (!layoutsData || !layoutCtx.layoutFamilyData) {
        return (<div></div>);
    }

    return (
        <div className="layouts-area">
            <h4 style={{ textTransform: "capitalize" }}>
                {layoutCtx.layoutFamilyKey} Layouts
            </h4>

            <div className="layouts-grid">
                {Object.keys(layoutCtx.layoutFamilyData).map((lKey) => (
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
