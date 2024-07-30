/**
 * @title CashPayment_Bank
 * @description Gestion de la transaction Cash avec la banque
 * @service CashPayment (CashColumn)
 */


/**
 * Lancement de la transaction Cash
* @param {number} amountInCents - Default: 100 - Montant en centimes
 * @param {string} refTransaction - Default: ref-deb-0000 - Référence de la transaction
 * @param {string} refShoppingCart - Default: ticket-1234 - Référence du panier
 */
function start1() {
    let amountInCents = 100;
    let refTransaction = "ref-deb-0000";
    let refShoppingCart = "ticket-123";
    console.log("START - lancement de la transaction Cash d'une valeur de " + amountInCents / 100 + " €");
	// Écoute de l'événement de surveillance de la transaction Cash
	Kiosk.CashPayment.addEventListener("transactionBank", onTransactionBank);

	// Démarrage de la transaction
	Kiosk.CashPayment.bankTransaction({
		amountInCents: amountInCents,
		refTransaction: refTransaction,
		refShoppingCart: refShoppingCart
	});
}

function stop1(){
    console.log("END - Annulation de la transaction");
	Kiosk.CashPayment.removeEventListener("transactionBank", onTransactionBank);
    Kiosk.CashPayment.cancelTransaction();
}

/**
 * Fonction de rappel associée à l'événement de surveillance de la transaction Cash
 */
function onTransactionBank(e) {
	switch (e.data.dataType) {
		case "CashAccepted":
			console.log("USER - Espèces acceptées : " + e.data.totalInserted / 100.0 + " €");
			break;
		case "CashRejected":
			console.log("USER - Espèces rejetées");
			break;
		case "TransactionAuthorized":
			console.log("USER - Transaction autorisée (" + e.data.refTransaction + ")");

			// Délivrance de biens, prenant 3s
			setTimeout(deliver, 3000);
			break;
		case "TransactionBanked":
			console.log("USER - Transaction terminée (" + e.data.refTransaction + ")");
			console.log("USER - Montant rendu: " + e.data.totalReturned / 100.0 + " €");

			// Fin d'écoute de l'événement de surveillance
			Kiosk.CashPayment.removeEventListener("transactionBank", onTransactionBank);

			// Impression du reçu
			printReceipt();
			break;
		case "TransactionBankError":
			// Gestion des cas d'erreur
			handleBankError(e.data.code);

			// Fin d'écoute de l'événement de débit
			Kiosk.CashPayment.removeEventListener("transactionBank", onTransactionBank);
            console.log("ERROR - Annulation de la transaction");
			// Impression du reçu
			printReceipt();
			break;
	}
}

/**
 * Gestion d'une erreur durant la transaction selon son code
 */
function handleBankError(code) {
	switch (code) {
		case "StatusError":
			console.error("ERROR - "+code + ": Opération interdite dans le status actuel");
            console.log("ERROR - "+code + ": Opération interdite dans le status actuel");
			break;
		case "StateError":
			console.error("ERROR - "+code + ": Opération interdite dans le state actuel");
            console.log("ERROR - "+code + ": Opération interdite dans le state actuel");
			break;
		case "ApplicationCancelled":
			console.error("ERROR - "+code + ": Transaction annulée par l'application");
            console.log("ERROR - "+code + ": Transaction annulée par l'application");
			break;
		case "Hardware":
			console.error("ERROR - "+code + ": Problème matériel");
            console.log("ERROR - "+code + ": Problème matériel");
			// Le status du service de paiement est mis à jour (status 'Critical')
			break;
		case "Timeout":
			console.error("ERROR - "+code + ": Temps écoulé");
            console.log("ERROR - "+code + ": Temps écoulé");
			break;
		case "FraudAttempt":
			console.error("ERROR - "+code + ": Tentative de fraude utilisateur détectée");
            console.log("ERROR - "+code + ": Tentative de fraude utilisateur détectée");
			break;
		case "Jam":
			console.error("ERROR - "+code + ": Bourrage");
            console.log("ERROR - "+code + ": Bourrage");
			break;
		case "UnsupportedChange":
			console.error("ERROR - "+code + ": Monnaie inconnue");
            console.log("ERROR - "+code + ": Monnaie inconnue");
			break;
		case "CannotPayout":
			console.error("ERROR - "+code + ": Rendu de monnaie impossible");
            console.log("ERROR - "+code + ": Rendu de monnaie impossible");
			break;
		default:
			console.error("ERROR - "+code + ": Erreur non traitée");
            console.log("ERROR - "+code + ": Erreur non traitée");
			break;
	}
}

/**
 * Impression du reçu de transaction
 */
function printReceipt() {
    console.log("USER - Impression du reçu");
	// Écoute de l'événement d'impression de reçu
	Kiosk.CashPayment.addEventListener("receiptPrint", onReceiptPrint);

	// Impression d'un reçu
	Kiosk.CashPayment.printReceipt({
		"htmlHeader": "<h1 style='font-size: 20px; font-weight:bold; font-family: Verdana, sans-serif; text-align: center;'>Votre reçu</h1><h2  style='font-size: 15px; font-weight:bold; font-family: Verdana, sans-serif; text-align: center;'>Panier " + Kiosk.CashPayment.currentTransaction.refShoppingCart + "</h2><div><pre style='font-size: 14px; font-family: Verdana, sans-serif;'>",
		"htmlFooter": "</pre></div><hr><p style='font-family: Verdana, sans-serif; text-align: center;'>Au revoir</p>"
	});
}

/**
 * Délivrance de biens
 */
function deliver() {
	// Gestion personnalisée de la délivrance de biens

	// Démarrage de la procédure de confirmation de transaction en cas de succès de délivrance
	// Écoute de l'événement de confirmation, pour le cas d'erreur de désynchro applicative
	Kiosk.CashPayment.addEventListener("transactionConfirm", onTransactionConfirm);
    
	// Confirmation de la transaction
	Kiosk.CashPayment.confirmTransaction({
		"confirmAmountInCents": Kiosk.CashPayment.currentTransaction.initialAmount
	});
}

/**
 * Fonction de rappel associée à l'événement de confirmation de transaction
 */
function onTransactionConfirm(e) {
    console.log("USER - Confirmation de la transaction");
	// Pour le cas d'erreur de désynchro applicative, sinon géré dans onTransactionBank
	switch (e.data.dataType) {
		case "TransactionConfirmError":
            console.log("ERROR - "+e.data.code + " " + e.data.dataType);
			console.error(e.data.dataType + ": désynchro applicative");
			break;
	}
    console.log("END - Transaction terminée");

	// Fin d'écoute de l'événement de confirmation
	Kiosk.CashPayment.removeEventListener("transactionConfirm", onTransactionConfirm);
}

/**
 * Fonction de rappel associée à l'événement d'impression de reçu
 */
function onReceiptPrint(e) {
	switch (e.data.dataType) {
		case "ReceiptPrinted":
			console.log("Reçu imprimé");
            console.log("USER - Reçu imprimé")
			break;
		case "ReceiptPrintError":
            console.log("USER -  "+e.data.code + ": Erreur d'impression de reçu");
			handlePrintError(e.data.code);
			break;
	}

	// Fin d'écoute de l'événement d'impression
	Kiosk.CashPayment.removeEventListener("receiptPrint", onReceiptPrint);
}

/**
 * Gestion d'une erreur d'impression de reçu selon son code
 */
function handlePrintError(code) {
	switch (code) {
		case "StatusError":
			console.log("ERROR - Opération interdite dans le status actuel de l'impression");
			break;
		case "StateError":
			console.log("ERROR - Opération interdite dans le state actuel du paiement");
			break;
		default:
			console.log("ERROR - "+ code + ": Erreur d'impression de reçu");
			break;
	}
}