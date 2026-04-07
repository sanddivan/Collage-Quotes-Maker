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
