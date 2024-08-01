/**
 * @title Card Dispensing
 * @description Distribution d'une carte 
 * @service CardDispensing (CardDispenser)
 */


function start1(){
    console.log("START - Lancement de la distribution de carte");
    Kiosk.CardDispensing.addEventListener("cardDispense", onCardDispensed);
    Kiosk.CardDispensing.dispenseCard();
}

function onCardDispensed(e){
    console.log("USER - Carte en cours de distribution");
    switch (e.data.dataType) {
        case 'CardDispensed':
            console.log("USER - Carte Distribué");
            console.log("END - Carte Distribué");
            Kiosk.CardDispensing.removeEventListener("cardDispense", onCardDispensed);
            break;
        case 'CardDispenseError':
            console.error("ERROR - "+e.data.code + ": " + e.data.description);
            break;
    }
}

function stop1(){
    console.log("END - Arret de la distribution de carte");
    Kiosk.CardDispensing.removeEventListener("cardDispense", onCardDispensed);
}