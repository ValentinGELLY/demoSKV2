/**
 * format console.log("USER - message"); ==> message est affiché dans la console pour les utilisateurs lambad 
 * 
 */

var timeout;

/**
 * simple capture du document
 */
function test1() {
    console.log("DEBUT - Lancement de la capture du document");
    Kiosk.DocumentScanning.addEventListener("imageCapture", onImageDocumentCapture)
    Kiosk.DocumentScanning.captureImage();
}

/**
 *  preview du document
 */
function test2() {
    console.log("DEBUT - Lancement de la preview du document");
    Kiosk.DocumentScanning.addEventListener("previewStart", onPreview);
    Kiosk.DocumentScanning.startPreview();
    timeoutCamera();
}

/**
 * preview du document + capture du document
 */
function test3() {
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
            console.log("UTILISATEUR - azufqusdfqifydt");
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
            break;
    }
}

function timeoutCamera() {
    timeout = setTimeout(() => {
        console.log("FIN - Arret de la preview du document");
        Kiosk.DocumentScanning.stopPreview();
        Kiosk.DocumentScanning.removeEventListener("previewStart", onPreview);
    }, 5000);
}

function timeoutCameraBeforeCapture(){
    timeout = setTimeout(() => {
        Kiosk.DocumentScanning.stopPreview();
        Kiosk.DocumentScanning.removeEventListener( "previewStart", onPreview);
        console.log("UTILISATEUR - Arret de la preview du document");
        Kiosk.DocumentScanning.addEventListener("imageCapture", onImageDocumentCapture);
        Kiosk.DocumentScanning.captureImage();
    }, 5000);
}


function stop1() {
    console.log("FIN - Arret de la capture du document")
    Kiosk.DocumentScanning.removeEventListener("imageCapture", onImageDocumentCapture);
    clearTimeout(timeout);
}

function stop2() {
    console.log("FIN - Arret de la preview du document");
    Kiosk.DocumentScanning.stopPreview();
    Kiosk.DocumentScanning.removeEventListener("previewStart", onPreview);   

    clearTimeout(timeout);
}

function stop3() {
    console.log("FIN - Arret de la preview du document")
    Kiosk.DocumentScanning.stopPreview();
    Kiosk.DocumentScanning.removeEventListener( "previewStart", onPreview);
    clearTimeout(timeout);
}