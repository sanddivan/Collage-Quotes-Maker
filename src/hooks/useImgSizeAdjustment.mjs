// File: useImgSizeAdjustment.mjs

/**
 * @param {number} imgNaturalWidth
 * @param {number} imgNaturalHeight
 * @param {Dimensions} slotDimensions
 * @returns {Dimensions}
 */

export function useImgSizeAdjustment(
    imgNaturalWidth,
    imgNaturalHeight,
    slotDimensions
) {
    if (imgNaturalWidth === 0 || imgNaturalHeight === 0) {
        console.error('Image has nonexistent width or height.');

        return {
            width: 0,
            height: 0,
            aspectRatio: 0
        }
    }

    let imgRenderWidth = imgNaturalWidth;
    let imgRenderHeight = imgNaturalHeight;
    let imgAspectRatio = imgRenderWidth / imgRenderHeight;

    // If the image is longer than the slot, then we have to fit the height
    // and crop the extra width.

    if (imgAspectRatio > slotDimensions.aspectRatio) {
        imgRenderWidth = slotDimensions.height * imgAspectRatio;
        imgRenderHeight = slotDimensions.height;
    }

    // If the image is taller than the slot, then we have to fit the width
    // and crop the extra height.

    else if (imgAspectRatio < slotDimensions.aspectRatio) {
        imgRenderHeight = slotDimensions.width / imgAspectRatio;
        imgRenderWidth = slotDimensions.width;
    }

    // If they are the same aspect ratio, then we just have to fit the
    // image to the slot.

    else {
        imgRenderWidth = slotDimensions.width;
        imgRenderHeight = slotDimensions.height;
    }

    return {
        width: imgRenderWidth,
        height: imgRenderHeight,
        aspectRatio: imgAspectRatio
    }
}
