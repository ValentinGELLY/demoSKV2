# DEMOSKV2 

## Fonctionnalité 

- [~] Choix du profil utilisateur 
- [ ] Picker de scénario 
- [x] Portail vers les applications de démonstration
- [x] Page de lancement et de surveillance des tests / scénarios de fonctionnalités 



## Portail vers les applications de démonstration

Cette paris de l'application permet de lancer les applications de démonstration.

A chaque nouvelle application il faut rajouter un bouton dans le fichier `app-demo-choice.html` 

Exemple :
```html
<div class="containerDemo mwc4000Choice" routerLink="/homepageEK4000">
      <img src="./assets/MoovHop/logo-app.png" class="demoImage">
      <div class="description">
        <h3> MoovHop - version EK4000 </h3>
        <p> Application transports - version complète   </p>
      </div>
      <img class="playButton" src="./assets/DemoSKV2/all-pages-icon/play-button-arrowhead.png">
    </div>
```

## Page de lancement et de surveillance des tests / scénarios de fonctionnalités

Cette page permet de lancer les tests de fonctionnalités et de les surveiller. 

Pour rajouter un test il faut que le développeur 