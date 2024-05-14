
/**
 * lancement de la lecture de code barre 
 */
function start1(){
    console.log("DEBUT - Lancement de la lecture de code barre");
    Kiosk.BarcodeReading.addEventListener('barcodeRead', onBarcodeRead);
    Kiosk.BarcodeReading.readBarcode();
}

function onBarcodeRead(e) {
	switch (e.data.dataType) {
		case 'BarcodeRead':
			console.log("UTILISATEUR-Code barre lu: " + e.data.barcode);
            Kiosk.BarcodeReading.removeEventListener('barcodeRead', onBarcodeRead);
            console.log("FIN - Arret de la lecture de code barre");
			break;
		default:
			break;
	}
}

function stop1(){
    console.log("FIN - Arret de la lecture de code barre")
    Kiosk.BarcodeReading.stopReadBarcode();
    Kiosk.BarcodeReading.removeEventListener('barcodeRead', onBarcodeRead);
}

