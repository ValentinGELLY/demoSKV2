/**
 * @title Session_PresenceCaptor
 * @description Surveillance du comportement de la session avec le capteur de présence
 * @service Session
*/

/**
 * lancement de la surveillance de la session utilisateur
 **/
function start1(){
    console.log("START - Surveillance de la session utilisateur");
    Kiosk.Session.addEventListener("inactivityChange", onInactivity());
}

function onInactivity(e) {
    // Surveillance du dernier jalon de la session utilisateur (approche de l'inactivité)
    if (e.data.dataType === "InputChanged" && e.data.name === "PresenceCaptor"  // filtrage d'un chgt de valeur d'entrée pour le capteur de présence
        && e.data.value === "On"   // détection de présence
        && !Kiosk.Session.hasUser  //  session sans utilisateur (screensaver actif)
    ) {
        // Sortie du screensaver par ouverture de session
        Kiosk.Session.close({ "information": "Sortie du screensaver sur détection de présence / ouverture d'une session utilisateur" });
    }
}

function stop1(){
    console.log("STOP - Surveillance de la session utilisateur");
    Kiosk.Session.removeEventListener("inactivityChange", onInactivity());
}