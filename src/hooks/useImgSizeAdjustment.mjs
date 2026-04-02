// File: useImgSizeAdjustment.mjs

/**
 * @param {Dimensions} imgNaturalDimensions
 * @param {Dimensions} slotDimensions
 * @returns {Dimensions}
 */

export function useImgSizeAdjustment(
    imgNaturalDimensions,
    slotDimensions
) {
    if (imgNaturalDimensions.width === 0 || imgNaturalDimensions.height === 0) {
        return {
            width: 0,
            height: 0,
            aspectRatio: 0
        }
    }

    let imgRenderWidth = imgNaturalDimensions.width;
    let imgRenderHeight = imgNaturalDimensions.height;
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
