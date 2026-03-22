.slot img {
    position: absolute;
    top: 50%;
    left: 50%;

    // max-width: none;
    // max-height: none;

    transform: translate(-50%, -50%);
}

const slotRatio = slotWidth / slotHeight;
const imgRatio = imgWidth / imgHeight;

if (imgRatio > slotRatio) {
    // image is wider → fit height
} else {
    // image is taller → fit width
}

<img
    src={src}
    style={
        imgRatio > slotRatio
            ? { height: '100%', width: 'auto' }
            : { width: '100%', height: 'auto' }
    }
/>

// Custom Layouts

const layout = {
    gridTemplateColumns: '2fr 1fr',
    gridTemplateRows: 'repeat(4, 1fr)',
    areas: [
        'a b',
        'a c',
        'a d',
        'a e',
    ],
};

// <div
//     className="canvas"
//     style={{
//         display: 'grid',
//         gridTemplateColumns: layout.gridTemplateColumns,
//         gridTemplateRows: layout.gridTemplateRows,
//         gridTemplateAreas: layout.areas.join(' '),
//     }}
// >
const areaNames = ['a', 'b', 'c', 'd', 'e'];

{slots.map((img, i) => (
    <div
        key={i}
        className="slot"
        style={{ gridArea: areaNames[i] }}
    >
        {img ? <img src={img} /> : <Placeholder />}
    </div>
))}

// Other approach

const layout = [
    { col: 1, row: 1, colSpan: 1, rowSpan: 4 }, // big left
    { col: 2, row: 1 },
    { col: 2, row: 2 },
    { col: 2, row: 3 },
    { col: 2, row: 4 },
];

// <div
//     className="slot"
//     style={{
//         gridColumn: `${col} / span ${colSpan || 1}`,
//         gridRow: `${row} / span ${rowSpan || 1}`,
//     }}
// >

// Layout API

// layouts.js

export const layouts = {
    '2x2': {
        columns: '1fr 1fr',
        rows: '1fr 1fr',
        slots: [
            { id: 0, col: 1, row: 1 },
            { id: 1, col: 2, row: 1 },
            { id: 2, col: 1, row: 2 },
            { id: 3, col: 2, row: 2 },
        ],
    },

    'featured-left-5': {
        columns: '2fr 1fr',
        rows: 'repeat(4, 1fr)',
        slots: [
            { id: 0, col: 1, row: 1, rowSpan: 4 }, // big image
            { id: 1, col: 2, row: 1 },
            { id: 2, col: 2, row: 2 },
            { id: 3, col: 2, row: 3 },
            { id: 4, col: 2, row: 4 },
        ],
    },
};

function Canvas({ layoutKey, slots }) {
    const layout = layouts[layoutKey];

    return (
        <div
            className="canvas"
            style={{
                display: 'grid',
                gridTemplateColumns: layout.columns,
                gridTemplateRows: layout.rows,
            }}
        >
            {layout.slots.map((slotDef) => {
                const img = slots[slotDef.id];

                return (
                    <div
                        key={slotDef.id}
                        className="slot"
                        style={{
                            gridColumn: `${slotDef.col} / span ${slotDef.colSpan || 1}`,
                            gridRow: `${slotDef.row} / span ${slotDef.rowSpan || 1}`,
                        }}
                    >
                        {img ? <img src={img} /> : <Placeholder />}
                    </div>
                );
            })}
        </div>
    );
}

const layout = layouts[layoutKey];
const numSlots = layout.slots.length;

const { slots, ...handlers } = useGridState(numSlots);
