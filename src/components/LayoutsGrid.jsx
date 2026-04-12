// File: LayoutsGrid.jsx

/**
 * @param {Object} props
 * @param {import("../data/base-layouts.json")} props.layoutsData
 * @param {import("../types.js").LayoutContext} props.layoutCtx
 * @param {string} props.btnStyle
 * @returns {React.JSX.Element}
 */

export default function LayoutsGrid({ layoutsData, layoutCtx, btnStyle }) {
    const currFamilyKey = layoutCtx.layoutFamilyKey

    if (!layoutsData || !currFamilyKey) {
        return (<div></div>);
    }

    if (!layoutsData.hasOwnProperty(currFamilyKey)) {
        return (<div>An error occurred. Layout {currFamilyKey} not found.</div>);
    }

    const layoutsToDisplay = layoutsData[currFamilyKey];

    return (
        <div className="layouts-area">
            <h4 style={{ textTransform: "capitalize" }}>
                {currFamilyKey} Layouts
            </h4>

            <div className="layouts-grid">
                {Object.keys(layoutsToDisplay).map((lKey) => (
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
