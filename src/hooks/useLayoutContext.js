// File: useLayoutContext.js

import { useState } from "react";
import baseLayoutData from "../data/base-layouts.json";

/** @typedef {import("../types/layoutTypes.js").Layout} T_Layout */
/** @typedef {import("../types/layoutTypes.js").LayoutFamily} T_LayoutFamily */
/** @typedef {import("../types/layoutTypes.js").LayoutContext} T_LayoutContext */

/**
 * @returns {T_LayoutContext}
 */

export function useLayoutContext() {
    const [familyKey, setFamilyKey] = useState(null);
    const [layoutKey, setLayoutKey] = useState(null);

    const currLayoutFamilyData = familyKey
        ? parseLayoutFamilyData(familyKey, baseLayoutData[familyKey])
        : null;

    const currLayoutData = currLayoutFamilyData
        ? parseLayoutData(layoutKey, currLayoutFamilyData[layoutKey])
        : null;

    return {
        layoutFamilyKey: familyKey,
        setLayoutFamilyKeyAction: setFamilyKey,
        layoutKey: layoutKey,
        setLayoutKeyAction: setLayoutKey,
        layoutFamilyData: currLayoutFamilyData,
        layoutData: currLayoutData
    }
}

/**
 * @param {string} famName
 * @param {Object.<string, Object[]>} rawLayoutsData
 * @returns {T_LayoutFamily}
 */

function parseLayoutFamilyData(famName, rawLayoutsData) {
    return {
    };
}

/**
 * @param {string} layName
 * @param {string} famName
 * @param {Object.<string, Object>[]} laySlotsData
 * @returns {T_Layout}
 */

function parseLayoutData(layName, famName, laySlotsData) {
    return {
        name: layName,
        familyName: famName,
        slots: laySlotsData.map((sData) => ({
            id: sData["slotId"],
            shape: null,
            imageUrl: null
        }))
    };
}
