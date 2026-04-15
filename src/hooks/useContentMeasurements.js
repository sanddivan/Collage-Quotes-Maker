// File: useContentMeasurements.js

// /**
//  * @param {import("../types/canvasTypes.js").Dimensions} canvasDims
//  * @param {import("../types/slotTypes.js").ImageSlot[]} slots
//  * @param {number} spacing
//  * @returns {import("../types/slotTypes.js").ImageSlot[]}
//  */
//
// export function useContentMeasurements(canvasDims, slots, spacing) {
//     // The slots' points' data we receive have their coordinates in percentages
//     // of the canvas' size. So, we have to convert those percentages into actual
//     // pixel values, and additionally account for the spacing (if any).
//
//     return slots.map((slot) => ({
//         id: slot.id,
//         points: slot.points.map((pt) => ({
//             x: pt.x * canvasDims.width / 100,
//             y: pt.y * canvasDims.height / 100
//         })),
//         imageUrl: slot.imageUrl
//     }));
// }
