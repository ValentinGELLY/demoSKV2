/**
 * @title  VERIFICATION DE LA PRÉSENCE D'UNE CARTE VITALE
 * @description Attente de l'introduction d'une carte Vitale et lecture des données de la carte
 * @service VitaleCardReading (VitaleCardReader)
*/

/**
 * Lancement de la lecture de carte Vitale
 */
function start1(){
    console.log("START - Lancement de la lecture de carte Vitale");
    Kiosk.VitaleCardReading.addEventListener('cardDetect', onCardDetect);
    // Test de la présence préalable d'une carte
    Kiosk.VitaleCardReading.addEventListener('cardPresenceCheck', onCardPresenceCheck);
    Kiosk.VitaleCardReading.checkCardPresence();
}

/**
 * Arrêt de l'écoute de la carte Vitale
 */
function stop1(){
    console.log("END - Arrêt de l'écoute de la carte Vitale");
    Kiosk.VitaleCardReading.removeEventListener('cardPresenceCheck', onCardPresenceCheck);
    Kiosk.VitaleCardReading.removeEventListener('cardDetect', onCardDetect);
}

/**
 * Fonction de rappel associée à l'événement cardDetect
 */
function onCardPresenceCheck(e) {
	Kiosk.VitaleCardReading.removeEventListener('cardPresenceCheck', onCardPresenceCheck);
	switch (e.data.dataType) {
		case "CardPresenceChecked":
			if (e.data.isPresent) {
				console.log("USER - Carte présente - lecture en cours...");
				// Lecture du contenu de la carte présente
				Kiosk.VitaleCardReading.addEventListener('vitaleRead', onVitaleRead);
				Kiosk.VitaleCardReading.readVitale({});
			}
			break;

		case "CardPresenceCheckError":
		default:
			console.error(e.data.dataType + ":" + e.data.code + ": " + e.data.description);
			console.log("ERROR - Problème lors de la lecture de la carte Vitale");
			break;
	}
}

/**
 * Fonction de rappel associée à l'événement de lecture d'une carte Vitale
 */
function onVitaleRead(e) {
	Kiosk.VitaleCardReading.removeEventListener('vitaleRead', onVitaleRead);
	switch (e.data.dataType) {
		case 'VitaleRead':
			console.log("USER - Liste des bénéficiaires sur la carte");
			console.log(e.data.beneficiaires);
			console.log(" USER - Retirez votre carte");
            console.log("END - Fin de la lecture de la carte Vitale");
			break;

		case 'VitaleReadError':
			console.error(e.data.dataType + ":" + e.data.code + ": " + e.data.description);
			console.log("ERROR - Problème lors de la lecture de la carte Vitale");
			break;
	}
}