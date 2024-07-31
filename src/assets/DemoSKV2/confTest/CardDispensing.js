/**
 * @title Card Dispensing
 * @description Distribution d'une carte 
 * @service CardDispensing (CardDispenser)
 */


function start1(){
    console.log("START - Lancement de la distribution de carte");
    Kiosk.CardDispensing.addEventListener("CardDispensed", onCardDispensed);
    Kiosk.CardDispensing.dispenseCard();
}

function onCardDispensed(){
    console.log("END - Carte Distribué");
    Kiosk.CardDispensing.removeEventListener("CardDispensed", onCardDispensed);
}

function stop1(){
    console.log("END - Arret de la distribution de carte");
    Kiosk.CardDispensing.removeEventListener("CardDispensed", onCardDispensed);
}