// File: LayoutsGrid.jsx

export default function LayoutsGrid({ layoutFamily, layoutsSet }) {
    if (!layoutFamily || !layoutsSet) {
        return (
            <div></div>
        );
    }

    return (
        <div className="layout-picker">
            <h3>{layoutFamily}</h3>

            {layoutsSet.map((setName) => (
                <button>{setName}</button>
            ))}
        </div>
    );
}
