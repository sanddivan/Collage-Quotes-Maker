// File: Collage.jsx

/**
 * @param {Object} props
 * @param {import("../types.js").Dimensions} props.canvasDims
 * @param {import("../types.js").Layout} props.layout
 * @returns {React.JSX.Element}
 */

export default function Collage({ canvasDims, layout }) {
    // Return an empty div if either the dimensions or the layout are null/undefined,
    // or the dimensions are less than a specific number to be calculated.

    // Calculate the percentages of canvas that each line of each slot will
    // occupy. A hook for this?

    // Define the SVG object:
    // - First the <defs> for each slot.
    // - Render the images with <image>. Search what "xMidyMid slice" actually means.
    // - Render the borders.

    // We can experiment with inline styles, but we will definitely need the
    // collage's own CSS file.

    return (<div></div>);
}
