/**
 * PAIEMENT PAR CARTE BANCAIRE
 * Transaction bancaire standard
*/

/**
 * Fonction de lancement d'un débit de X centimes
 * @param {number} amountInCents - Default: 100 - Montant en centimes
 * @param {string} refTransaction - Default: ref-deb-0000 - Référence de la transaction
 * @param {string} refShoppingCart - Default: ticket-1234 - Référence du panier
 */
function start1() {
    // Écoute de l'événement de débit de carte bancaire
    Kiosk.CardPayment.addEventListener("cardDebit", onCardDebit);

    console.log("DEBUT - lancement d'une transaction de 1€")
    // Démarrage de la transaction
    Kiosk.CardPayment.debitCard({
        amountInCents: 100,
        refTransaction: "ref-deb-0000",
        refShoppingCart: "ticket-1234"
    });
}

function stop1() {
    console.log("FIN - Annulation de la transaction");
    // Fin d'écoute de l'événement de débit
    Kiosk.CardPayment.removeEventListener("cardDebit", onCardDebit);
    Kiosk.CardPayment.cancelTransaction();
}

/**
 * Fonction de rappel associée à l'événement de débit de carte bancaire
 */
function onCardDebit(e) {
    switch (e.data.dataType) {
        case "CardDebitError":
            console.log("ERROR - " + e.data.dataType);
            // Fin d'écoute de l'événement de débit
            Kiosk.CardPayment.removeEventListener("cardDebit", onCardDebit);
            break;
        case "CardDebited":
            console.log("FIN - Transaction terminée (" + e.data.refTransaction + ")");
            // Fin d'écoute de l'événement de débit
            Kiosk.CardPayment.removeEventListener("cardDebit", onCardDebit);
            break;
        default:
            console.log("UTILISATEUR - " + e.data.dataType);
            break;
    }
}

/**
 * Confirmation de transaction
 */
function start2() {
    // Gestion personnalisée de la délivrance de biens
    console.log("DEBUT - confirmation de transaction");
    // Démarrage de la procédure de confirmation de transaction en cas de succès de délivrance
    // Écoute de l'événement de confirmation, pour le cas d'erreur de désynchro applicative
    Kiosk.CardPayment.addEventListener("transactionConfirm", onTransactionConfirm);

    // Confirmation de la transaction
    Kiosk.CardPayment.confirmTransaction({
        "confirmAmountInCents": Kiosk.CardPayment.currentTransaction.amountInCents
    });
}

/**
 * Annulation de la transaction
 */
function stop2() {
    console.log("FIN - Annulation de la transaction");
    Kiosk.CardPayment.removeEventListener("transactionConfirm", onTransactionConfirm);
    Kiosk.CardPayment.cancelTransaction();
}


/**
 * Impression du reçu de transaction
 */
function start3() {
    // Écoute de l'événement d'impression de reçu bancaire
    Kiosk.CardPayment.addEventListener("receiptPrint", onReceiptPrint);

    console.log("DEBUT - impression du reçu");
    // Impression d'un reçu, au format utf-8
    Kiosk.CardPayment.printReceipt({
        "htmlHeader": "<h1 style='font-size: 20px; font-weight:bold; font-family: Tahoma, sans-serif; text-align: center;'>Votre reçu</h1><h2  style='font-size: 15px; font-weight:bold; font-family: Tahoma, sans-serif; text-align: center;'>Panier " + Kiosk.CardPayment.currentTransaction.refShoppingCart + "</h2><div><pre style='font-size: 14px; font-family: Tahoma, sans-serif;'>",
        "htmlFooter": "</pre></div><hr><p style='font-family: Tahoma; text-align: center;'>Au revoir</p>"
    });
}

/**
 * Annulation de l'impression du reçu
 */
function stop3() {
    console.log("FIN - Annulation de l'impression");
    Kiosk.CardPayment.removeEventListener("receiptPrint", onReceiptPrint);
}

/**
 * Fonction de rappel associée à l'événement de confirmation de transaction
 */
function onTransactionConfirm(e) {
    // Pour le cas d'erreur de désynchro applicative, sinon géré dans onCardDebit
    switch (e.data.dataType) {
        case "TransactionConfirmError":
            console.log("ERROR - " + e.code + " " + e.data.dataType);
            break;
    }

    // Fin d'écoute de l'événement de confirmation
    Kiosk.CardPayment.removeEventListener("transactionConfirm", onTransactionConfirm);
}

/**
 * Fonction de rappel associée à l'événement d'impression de reçu bancaire
 */
function onReceiptPrint(e) {
    switch (e.data.dataType) {
        case "ReceiptPrinted":
            console.log("FIN - Reçu imprimé");
            break;
        case "ReceiptPrintError":
            console.log("ERROR - "+ e.data.dataType);
            handlePrintError(e.data.code);
            break;
    }
    // Fin d'écoute de l'événement d'impression
    Kiosk.CardPayment.removeEventListener("receiptPrint", onReceiptPrint);
}

/**
 * Gestion d'une erreur d'impression de reçu selon son code
 */
function handlePrintError(code) {
    switch (code) {
        case "StatusError":
            console.log("Opération interdite dans le status actuel de l'impression");
            break;
        case "StateError":
            console.log("Opération interdite dans le state actuel du paiement");
            break;
        default:
            console.log(code + ": ERROR d'impression de reçu");
            break;
    }
}
