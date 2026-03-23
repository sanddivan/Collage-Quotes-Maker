// File: useDownloadCollage.mjs

import html2canvas from 'html2canvas';

/**
 * @param {RefObject<HTMLElement>} canvasRef
 * @returns {Promise<void>}
 */

export async function downloadCollage(canvasRef) {
    if (!canvasRef.current) return;

    const fullCollageObj = await html2canvas(
        canvasRef.current,
        { useCORS: true, logging: false, scale: window.devicePixelRatio || 2 }
    );

    const imageToDownload = fullCollageObj.toDataURL('image/png');
    const virtualLink = document.createElement('a');

    virtualLink.href = imageToDownload;
    virtualLink.download = `my-collage-${Date.now()}.png`
    virtualLink.click();
}
