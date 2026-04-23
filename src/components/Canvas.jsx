// File: Canvas.jsx

// Have a component in charge of fetching this data rather than have said fetch
// scattered all over the place.

import { useLayoutSlots } from "../hooks/useLayoutSlots.js";

import styles from "./Canvas.module.css";
import baseLayoutData from "../data/base-layouts.json";

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

    const theSlots = useLayoutSlots(slotsData, 0);

    return (
        <div className={styles.theCanvas}>
            <h1>The Slots!</h1>

            {/*{slotsData.map((sData) => (*/}
            {/*    <ol>*/}
            {/*        {Object.keys(sData).map((key) => (*/}
            {/*            <li key={key}>{key} - {sData[key]}</li>*/}
            {/*        ))}*/}
            {/*    </ol>*/}
            {/*))}*/}

            {theSlots.map((slot, index) => (
                <div>
                    <h2>Slot {index + 1}!</h2>
                    <p><strong>Center:</strong> &#123; x: {slot.center.x}, y: {slot.center.y} &#125;</p>

                    <h3>Vertices:</h3>

                    <ul>
                        {slot.vertices.map((vertex) => (
                            <li>&#123; x: {vertex.x}, y: {vertex.y} &#125;</li>
                        ))}
                    </ul>
                </div>
            ))}

            {/*<svg viewBox="0 0 1 1" preserveAspectRatio="none">*/}
            {/*</svg>*/}
        </div>
    );
}
