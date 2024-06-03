var timeout;

/**
 * @title  SCANNER DE DOCUMENT
 * @description Transaction bancaire standard
*/

/**
 * simple capture du document 
 * */
function start1() {
    console.log("DEBUT - Lancement de la capture du document");
    Kiosk.DocumentScanning.addEventListener("imageCapture", onImageDocumentCapture);
    Kiosk.DocumentScanning.captureImage();
}
/**
 * simple preview du document
 * */
function start2() {
    console.log("DEBUT - Lancement de la preview du document");
    Kiosk.DocumentScanning.addEventListener("previewStart", onPreview);
    Kiosk.DocumentScanning.startPreview();
    timeoutCamera();
}
/**
 * preview + capture du document
 * */
function start3() {
    console.log("DEBUT - Lancement de la preview du document + capture du document");
    Kiosk.DocumentScanning.addEventListener("previewStart", onPreview);
    Kiosk.DocumentScanning.startPreview();
    timeoutCameraBeforeCapture();
}
function onPreview(e) {
    switch (e.data.dataType) {
        case 'PreviewStarted':
            console.log("UTILISATEUR - Preview du document en cours");
            let previewWebsocket = new WebSocket(e.data.serverUrl);
            previewWebsocket.onmessage = (preview) => {
                console.log("PREVIEW - " + preview.data);
            };
            previewWebsocket.onclose = function () {
            };
            break;
        case 'PreviewStopped':
            
            break;
        default:
            console.error(e.data.code + ": " + e.data.description);
            break;
    }
}

function onImageDocumentCapture(e) {
    switch (e.data.dataType) {
        case 'ImageCaptured':
            console.log("UTILISATEUR - Image du document capturée");
            console.log("CAPTURE - " + Kiosk.DocumentScanning.lastCapture.raw);
            console.log("FIN - Arret de la capture du document");
            Kiosk.DocumentScanning.removeEventListener("imageCapture", onImageDocumentCapture);
            break;
        case 'ImageCaptureError':
            console.error(e.data.code + ": " + e.data.description);
            Kiosk.DocumentScanning.removeEventListener("imageCapture", onImageDocumentCapture);
            break;
    }
}
function timeoutCamera() {
    timeout = setTimeout(() => {
        Kiosk.DocumentScanning.stopPreview();
        Kiosk.DocumentScanning.removeEventListener( "previewStart", onPreview);
        console.log("FIN - preview du document arrete");
    }, 5000);
}
function timeoutCameraBeforeCapture(){
    timeout = setTimeout(() => {
        Kiosk.DocumentScanning.stopPreview();
        Kiosk.DocumentScanning.addEventListener("imageCapture", onImageDocumentCapture);
        Kiosk.DocumentScanning.captureImage();
    }, 5000);
}
function stop1() {
    console.info("stop1");
    console.log("FIN - Arret de la capture du document")
    Kiosk.DocumentScanning.removeEventListener("imageCapture", onImageDocumentCapture);
    clearTimeout(timeout);
}
function stop2() {
    console.info("stop2");
    console.log("FIN - Arret de la preview du document");
    Kiosk.DocumentScanning.removeEventListener("previewStart", onPreview); 
    Kiosk.DocumentScanning.stopPreview();
    clearTimeout(timeout);
}
function stop3() {
    console.info("stop3");
    console.log("FIN - Arret de la preview du document");
    Kiosk.DocumentScanning.removeEventListener("previewStart", onPreview);
    Kiosk.DocumentScanning.stopPreview();
    clearTimeout(timeout);
}