// File: Canvas.jsx

// Have a component in charge of fetching this data rather than have said fetch
// scattered all over the place.

import styles from "./Canvas.module.css";
import baseLayoutData from "../data/base-layouts.json";
import shapesData from "../data/shapes.json";

/**
 * @returns {React.JSX.Element}
 */

export default function Canvas() {
    const layout = '2x2';
    const layoutDesc = baseLayoutData[layout];
    const slotsData = layoutDesc['slots'];

    // Create a hook to use here, where we map each slot's data to an actual
    // set of points, by applying Maths to the shapes' data.
    //
    // This hook should receive the layout data, and return the array of slots.
    //
    // Later on, inside that hook, we will call another hook that applies the
    // inset polygon calculations for when there is spacing between slots.
    //
    // We'll also need an ImageSlot.module.css, where we'll implement the
    // slots' animations.

    const theSlots = slotsData.map((sData) => {
        const sShape = sData['shape'];
        const shapeData = shapesData[sShape];
    });

    return (
        <div className={styles.theCanvas}>
            <h1>The Slots!</h1>

            {slotsData.map((sData) => (
                <ol>
                    {Object.keys(sData).map((key) => (
                        <li key={key}>{key} - {sData[key]}</li>
                    ))}
                </ol>
            ))}

            {/*<svg viewBox="0 0 1 1" preserveAspectRatio="none">*/}
            {/*</svg>*/}
        </div>
    );
}
