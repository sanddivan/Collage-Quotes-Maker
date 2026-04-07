const freestyleLayout = [
    { id: 'left-tall', top: 0, left: 0, width: 60, height: 100, color: '#fbbf24' },
    { id: 'right-top', top: 0, left: 60, width: 40, height: 50, color: '#ef4444' },
    { id: 'right-bottom', top: 50, left: 60, width: 40, height: 50, color: '#3b82f6' },
];

import React from 'react';

// --- The Individual Slot ---
const CollageSlot = ({ slot, gap, styling }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: `${slot.top}%`,
                left: `${slot.left}%`,
                width: `${slot.width}%`,
                height: `${slot.height}%`,
                padding: `${gap / 2}px`,
                boxSizing: 'border-box'
            }}
        >
            {/* The Inner Container gets the visual styling.
        This keeps the structural math completely separate from the design.
      */}
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: slot.color,

                    // --- Apply the Custom Styles Here ---
                    borderStyle: styling.borderWidth > 0 ? 'solid' : 'none',
                    borderWidth: `${styling.borderWidth}px`,
                    borderColor: styling.borderColor,
                    borderRadius: `${styling.borderRadius}px`,

                    // Ensures the border cuts inward and doesn't expand the div
                    boxSizing: 'border-box',

                    // Ensures the image inside doesn't spill over the rounded corners
                    overflow: 'hidden'
                }}
            >
                {/* <img src={slot.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
            </div>
        </div>
    );
};

// --- The Main Container ---
const CollageMaker = ({
                          layout,
                          ratio = "1 / 1",
                          gap = 8,
                          // Pass the styling values from your UI controls down to the maker
                          styling = { borderWidth: 4, borderColor: '#000000', borderRadius: 12 }
                      }) => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: ratio,
                backgroundColor: '#f3f4f6',
                padding: `${gap / 2}px`,
                boxSizing: 'border-box'
            }}
        >
            {layout.map((slot) => (
                <CollageSlot
                    key={slot.id}
                    slot={slot}
                    gap={gap}
                    styling={styling}
                />
            ))}
        </div>
    );
};

// --- CSS for Hovering and Clicking Animations
//
// .collage-slot-inner {
//     transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, border-color 0.2s;
//     cursor: pointer;
// }
//
// .collage-slot-inner:hover {
//     transform: scale(1.02); /* Slight pop-out effect */
//     box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//     z-index: 10; /* Bring the hovered item to the front */
// }
//
// .collage-slot-inner:active {
//     transform: scale(0.98); /* "Press" effect */
// }
//
// .collage-slot-wrapper:hover {
//     z-index: 50;
// }
//
// <div
//     className="collage-slot-inner"
//     style={{
//         width: '100%',
//         height: '100%',
//         backgroundColor: slot.color,
//         borderWidth: `${styling.borderWidth}px`,
//         // ... other dynamic styles
//     }}
// >

// --- The Shards Layout ---

const shardLayout = [
    // Shard 1 (e.g., a triangle shard)
    {
        id: 'shard-A',
        points: [ { x: 0, y: 0 }, { x: 70, y: 0 }, { x: 30, y: 60 } ],
        imageUrl: 'https://images.unsplash.com/photo-1599420186946-7b6fb4eaba02?q=80&w=600',
        color: '#3b82f6' // Fallback color
    },
    // Shard 2 (e.g., an irregular quad)
    {
        id: 'shard-B',
        points: [ { x: 70, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 80 }, { x: 30, y: 60 } ],
        imageUrl: 'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?q=80&w=600',
        color: '#ef4444'
    },
    // Shard 3 (fills the bottom)
    {
        id: 'shard-C',
        points: [ { x: 30, y: 60 }, { x: 100, y: 80 }, { x: 100, y: 100 }, { x: 0, y: 100 } ],
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600',
        color: '#fbbf24'
    }
];

import React from 'react';

// --- The Main SVG Container ---
const SvgCollageMaker = ({
                             layout,
                             aspectRatio = "1 / 1",
                             styling = { borderWidth: 4, borderColor: '#333', borderRadius: 0 }
                         }) => {
    // We calculate the border thickness relative to our 0-100 viewBox.
    // Assuming a 1000px wide canvas, a 4px border is 0.4 units.
    const normalizedBorderWidth = styling.borderWidth / 10;

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: aspectRatio, // Keeps the SVG canvas proportional
                backgroundColor: '#e5e7eb',
                boxSizing: 'border-box'
            }}
        >
            <svg
                // The ViewBox is key: it maps our percentage points to the pixel space.
                viewBox="0 0 100 100"
                width="100%"
                height="100%"
                style={{ display: 'block' }}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                {/* --- Phase 1: Define the Clip Paths (Shapes) --- */}
                <defs>
                    {layout.map((slot) => {
                        // Convert points array to a "x y, x y, ..." string
                        const pointsString = slot.points.map(p => `${p.x} ${p.y}`).join(', ');

                        return (
                            <clipPath key={`clip-${slot.id}`} id={`clip-${slot.id}`}>
                                <polygon points={pointsString} />
                            </clipPath>
                        );
                    })}
                </defs>

                {/* --- Phase 2: Render the Clipped Images --- */}
                {layout.map((slot) => (
                    <image
                        key={`img-${slot.id}`}
                        xlinkHref={slot.imageUrl} // Use href or xlinkHref
                        x="0" y="0"
                        width="100" height="100" // Occupies full viewBox, clipped by path
                        clipPath={`url(#clip-${slot.id})`}
                        // This replicates 'object-fit: cover' behavior
                        preserveAspectRatio="xMidYMid slice"
                    />
                ))}

                {/* --- Phase 3: Render the Borders (On top of images) --- */}
                {layout.map((slot) => {
                    const pointsString = slot.points.map(p => `${p.x} ${p.y}`).join(', ');

                    return (
                        <polygon
                            key={`border-${slot.id}`}
                            points={pointsString}
                            // Basic Styling
                            fill="none" // Transparent center
                            stroke={styling.borderColor}
                            strokeWidth={normalizedBorderWidth}
                            // This crucial property prevents the stroke from scaling when the canvas resizes
                            vectorEffect="non-scaling-stroke"

                            // Standard interactivity still works
                            className="collage-shard-edge"
                            style={{ cursor: 'pointer', transition: 'stroke-width 0.2s' }}
                            onClick={() => console.log(`Clicked Shard: ${slot.id}`)}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

// --- Usage Example ---
export default function App() {
    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
            <h1>Glass Shard Collage</h1>
            <SvgCollageMaker
                layout={shardLayout}
                aspectRatio="16 / 9" // Example with dynamic aspect ratio
                styling={{ borderWidth: 3, borderColor: '#000', borderRadius: 0 }}
            />
        </div>
    );
}

// --- Adding the hover animations ---

{layout.map((slot) => (
    <g key={slot.id} className="shard-group">
        {/* The Clipped Image */}
        <image
            xlinkHref={slot.imageUrl}
            width="100" height="100"
            clipPath={`url(#clip-${slot.id})`}
            preserveAspectRatio="xMidYMid slice"
        />

        {/* The Interactive Border */}
        <polygon
            points={slot.points.map(p => `${p.x} ${p.y}`).join(', ')}
            fill="transparent" // Important: allows clicking the middle of the shard
            stroke={styling.borderColor}
            strokeWidth={normalizedBorderWidth}
            vectorEffect="non-scaling-stroke"
            className="shard-border"
            onClick={() => handleShardClick(slot.id)}
        />
    </g>
))}

/* We target the border polygon */
// .shard-border {
//     transition: stroke 0.2s, stroke-width 0.2s, filter 0.2s;
//     cursor: pointer;
//     pointer-events: all; /* Ensures the transparent center still catches clicks */
// }
//
// /* Hover effect on the shard */
// .shard-border:hover {
//     stroke: #ffffff; /* Change border color on hover */
//     stroke-width: 6;  /* Make border thicker */
//     filter: drop-shadow(0px 0px 8px rgba(0,0,0,0.5)); /* Add a glow */
// }
//
// /* Hover effect on the image via the group */
// .shard-group:hover image {
//     filter: brightness(1.1);
//     transition: filter 0.2s;
// }

// Summary of Differences
// Target: Target the <polygon> or a wrapper <g>, not the <clipPath>.
//
// Properties: Use stroke and fill in your CSS instead of border and background-color.
//
// Stacking: Since there is no z-index, you'll need to re-order your data array if
//           you want a "pop to front" effect.
//
// Hit Area: SVG polygons with fill="none" won't catch clicks in the center.
//           Use fill="transparent" or pointer-events: visiblePainted to ensure
//           the whole shard area is interactive.
