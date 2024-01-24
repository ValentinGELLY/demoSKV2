# DemoSKV2

# Rapide présentation 

Démonstrateur interactif contenant des applications illustrant les parcours clients et les cas d'utilisations typiques des besoins du marché (voir ticket Jira SK2-1779). 

Trois applis de "demos" sont contenues dans DemoSKV2: 
  + MoovHop (appli transports) pour la borne EK8000 -> version salon AGIR2023
  + MoovHop (appli santé version simplifiée pour la borne EK1000CVM) -> version salon AGIR2023
  + Labizi (appli santé)

# Informations générales

# Code Keypad

Le code keypad de l'application est 153103 (cf ticket Jira n°1779).

## Codes de lancement des applications demos

Pour lancer la bonne démo, on peut entrer les paramètres suivants dans le customerData (onglet borne de la maitenance):

 + "Labizi" -> lancera Labizi
 + "MoovHop1000" -> lancera MoovHop version EK1000CVM - AGIR 2023
"MoovHop8000" -> lancera MoovHop version EK8000 - AGIR 2023. Dans le répertoire Dist, son assets est dans application/assets/MoovHop (on y retrouve les images du front). 
+ "MoovHop4000" -> lancera MoovHop Version EK4000 - RNTP 2023.
+ "MoovHop8000-RNTP" -> lancera MoovHop Version EK 8000 - RNTP 2023
+ "TELEFONICA-EK3000-2024-MOVISTAR" -> lancera MoovHop Version EK 3000 - Telefonica 2024
+ "" -> lancera DemoSKV2 (interface client avec menu de choix de profil utilisateur et de demos/parcours client/fonctionnalites/test)
et si vous rentrez n'importe quopi, et bien vous retomberez sur l'application DemoSKV2

# Mise en place de l'environnement de travail

## Angular

Pour pouvoir travailler sur l'application, il faut avoir installé NodeJs au préalable.
Ensuite, il faut procéder à l'installation du CLI d'Angular, voir https://www.knowledgehut.com/blog/web-development/local-environment-set-up-angular#prerequisites%C2%A0.

Une fois que l'environment de travail est prêt, se rendre en ligne de commande dans DemoSKV2/src puis lancer la commande : npm install.
Les dépendances Angular vont s'installer et le projet peut ainsi être buildé.
Si il y a des erreurs d'installation de packages npm, lancer la commade : npm audit fix.

### Pour builder

Il faut utiliser la commande npm run build depuis la racine du répertoire DemoSKV2. 
Le build sera redirigé dans le répertoire SKV2/SoftKiosk-V2/src/Applications/Dist/DemoSKV2/application.

Ne pas utiliser la commande ng build, cela va créer un hashing sur les fichiers et risque de superposer plusieurs versions sur borne lorsque l'on fait plusieurs tests. 

### Server de prévisualisation 

Il existe un server de prévisualisation dans angular, mais ne fonctionne pas ici puisque l'on appelle des méthodes de l'API SKV2, non connues par un navigateur. Il faudrait peut-être en assurer la compatibilité (lorsque demoSKV2 tourne dans navigateur quelconque et ou dans SK) 
Potentielle évolution ????
# Workflow

## Git

Châque tâches à faire ou bugs doivent être déclarés dans Jira avec un ticket.
Les règles suivantes concernant l'utilisaton de GitHub sont à suivre

Convention de nommage et d'utilisation des branches :
  - Chaque branche doit être associée à un ticket Jira
  - Le nom de la branche sera composé des quatre premières lettres de notre prénom nom ainsi que d'un slash suivi de SK2-d[n° du ticket]. Par exemple, si je m'appelle Roberto Matthews et que traite le ticket n° 3940, la branche sera appellée :
  RMAT/SK2-3940.
  - Chaque banche devra être créé (à jour sur le master) avec la commande : git checkout -b [nomDeLaBranche]

Convention de nommage des commits :
  - Noms du commit : SK2-[n°ticket] [TitreDuTicket]
  - Des commits fréquents sur une même branche

Pour mettre à jour sa branche avec le master :
  1. Se rendre sur le master : git checkout master
  1. Mettre le master à jour :
        1. git fetch -p
        1. git pull origin master --rebase
  1. Ensuite, se repositionner sur sa branche personnelle:
        git checkout [nomDeLaBranche]
  1. Créer une branche de suavegarde (au cas ou le master viendrai écraser nos modifications sur notre branche): 
        git checkout -b [nomDeLaBranche]-sav
  1. Et revenir sur sa branche de départ:
        git checkout [nomDeLaBranche]
  1. Et enfin remettre sa branche à jour avec le master :
        git rebase master
  1. Résoudre les éventuels conflits
  1. Si besoin, commit et pousser ses modifications :
        1. git add .
        1. git commit -m "[message]
        1. git push origin [nomDeLaBranche] -f

Pour livrer un commit (une fois que le ticket Jira est terminé) sur le master :
  1. Se rendre sur sa branche perso
  1. Fixer tous les commit (n commits) en un seul et même commit :
        1. git rebase -i HEAD~n (cette commande ouvre un fichier)
        1. Remplacer les 'pick' des commits par un f (pour les fusionner entre eux) en laissant le 'pick' qui est placé en haut du fichier (suivant l'ordre dans lequel on souhaite rebaser).
        1. Enregistrer le fichier et le fermer.
        1. Répéter des deux actions jusqu'à atteindre le premier commit de la branche
        1. On obtient alors un unique commit que l'on peut pousser sur le master avec les commandes :
          1. git checkout master
          1. git cherry-pick [commit-hash]
          1. Si des conflits sont détectés, les résoudre, les enregistrer et continuez le process de cherry-pick avec : git cherry-pick --continue
          1. Si vous souhaitez abandonner le cherry-pick (à cause des conflits ou pour tout autre raison) : git cherry-pick --abort

# Architecture

## Démos

Le répertoire "demos" contient tous le code des démos ainsi qu'une bibliothèque.
Chaque démos est un module avec :
  + un fichier de routing
  + un fichier de module (gestion des composants)
  + un fichier scss global
  + un service

Si l'on souhaite créer de nouvelles démos, créer un nouveau module dans ce répertoire et suivre la structure ci-dessus ainsi que les conventions de nommages
Attention, ce module de démos devra obligatoirement être importé dans :
  + app.module et déclaré dans le tableau des imports
  + app.routing.module
(regarder dans ces fichiers là pour voir comment s'est déclaré).

# Codage

## Pour le parcours client des démos

### Penser au cycle de vie des composants
Les abonnements et appels à l'api doivent se faire dans le hook ngAfterViewInit (au lieu de nghOnInit), afin de ne pas retarder les transitions entre les vues.
Les désabonnements se font dans le ngOnDestroy, qui sera déclenché lorsque l'on passe à la vue suivante.

### Dans les callbacks que l'on surcharge localement

Si les callbacks sont surchargés et que l'on appelle l'API dans un dataType, il est primordial de mettre une tempo avant.
Exemple avec le dataType BarcodeReadError dans le cas ou un a un Timeout utilisateur :

```  override onBarcodeRead = (e: any): void => {
    switch (e.data.dataType) {
      case 'BarcodeRead':
        console.log("Code barre lu: " + e.data.barcode);
        console.log("je vais changer de page dans 1 seconde");
        // traitement pour le changement de vue
        let navEvent = new CustomEvent("labiziNav", {
          detail: {
            "delay": 1000,
            "goTo": "/labiziRdv"
          }
        });
        window.dispatchEvent(navEvent);
        break;
      case 'BarcodeReadError':
        console.log("Erreur de lecture de code barre: " + e.data.code);
        switch (e.data.code) {
          case 'StatusError':
            console.log("Erreur de status");
            break;
          case 'StateError':
            console.log("Erreur de state");
            break;
          case 'ConfigError':
            console.log("Erreur de config");
            break;
          case 'Timeout':
            console.log("Timeout utilisateur de lecture de code bar dépassé");
            console.log("Relance immédiate de la lecture");
            setTimeout( () => {
              this.skService.barcodeReadingManual()
            }, 500);
            this.skService.barcodeReadingManual();
            break;
        }
    }
  }
```

Cela évitera des problèmes d'appels synchrones et l'absence de renvoi de données du périphérique matériel vers le client.

### Insertion d'images

Les ressources telles que les images ou police de caractère doivent être placés dans le répertoire app/assets, ordonné par démo.
Elles doivent également être présente dans le répertoire d'installation de DemoSKV2, dans DemoSKV2/application/assets. Ce répertoire doit être un reflet de app/assets (dans Angular).

## Conventions de nommages

Chaque module, composants, variables doit être écrit en anglais

### Composants et modules

Noms de modules : Flat Case

Noms de composants : Kebab Case
eh ba oui c'est bon les Kebabs !!!

De plus, les composants angular propre à une démo doivent avoir un nom explicite en lien avec leur utilité dans un parcours client (cf voir composants de labizi).

### Variables TS

Noms de variables : Camel Case

# Bibliothèques

Il existe trois "librairies" dans DemoSKV2 pour les usages suivants : 

## Appels à l'API

On utilise le service softkiosk.service afin de centraliser et surcharger les méthodes d'appels à l'api SKV2.
Toute nouvelle méthode d'appel qui va être utilisée dans une démo devra être déclarée dans ce service comme l'indiquent les conventions.

## Callbacks de SKV2

Afin de rendre des callbacks génériques, il existe la librairie GenericComponent.
Tout component angular nécessitant des appels à l'api peut en hériter (s'il n'est pas nécessaire de la surcharger au vue de son implémentation générique) ou la surcharger si besoin.
Dans ce cas, il convient de faire comme dans le fichier labizi-qr-code.ts (dans le répertoire demos/labizi).

## requestHelper

Librairie de l'API JS, elle nous permet d'avoir accès à des méthodes pour gérer des scénarios ou des scripts.
Elle est importée dans softKioskService, si besoin de surcharger une méthode de celle-ci, faire comme avec la méthode activeSoftkioskScenario() (de softKioskService).

# Simulation

Le contenu du dossier "scenarios" est recopié automatiquement dans "C:\ProgramData\softkioskV2\scripts\scenarios" à l'installation de l'application.
Il s'agit des scénarios en rapport avec les parcours client de l'application DemoSKV2.
Si l'on souhaite utiliser un scénarios dans une application métier dez manière automatique, il doit être impérativement déclaré dans la fonction afterInstall() comme suit :

```
function afterInstall() {
    // Compléments à l'installation
    console.log('Recopie des scénarios');
    let src = 'C:\\Program Files\\SKV2-Borne\\SKRestAPI\\wwwroot\\DemoSKV2\\scenarios\\';
    let dst = scriptPath.SoftKioskScriptsPath() + '\\scenarios\\';
    let scn1 = 'CardPayment_Debit_Without_ReceiptPrinting.json'; // scénarios 1
    let scn2 = 'CashPayment_Bank_MoovHop.json'; // scénarios 2
    file.Move(src + scn1, dst + scn1, true);
    file.Move(src + scn2, dst + scn2, true);
  }
```

Et pour l'activer depuis le code Typescript d'une démo :
```
this.skService.activeSoftkioskScenario("CardPayment_Debit_Without_ReceiptPrinting");
```

# Configurations logicielles

La config relative à DemoSKV2 est définie dans le fichier application.js dans SoftKiosk-V2/src/Applications/Dist/DemoSKV2.

## Paramétrages spécifiques

## Phase et sous-phase

L'application DemoSKV2 doit être en phase EXPL (exploitation) et sous-phase "STD". 
La valeur STD doit rester présente (elle permet de palier à des problèmes de config côté SK), en attente de corrections sur les prochaines versions.  
Ces propriétés doivent figurer dans la balise "phase" du fichier application.js
### Admin et autologon

L'application doit être en admin (flag admin à true) mais pas en autologon (flag à false).
Le paramètre autologon doit être renseigné dans la config depuis la maintenance et non dans ce fichier (pour des raisons d'ergonomie d'utilisation).

### AppManual

Ce flag doit toujours être à true.
Ainsi l'applicaton signale sa fin d'initialisation et peut basculer sur le splash-screen (sans générer d('erreur)).

### Déclaration des services

Tous les services utilisés par l'application (c'est-à-dire dans toutes les démos/pages de tests) doivent être déclarés dans dans la balise <services>.
Même si l'on package une distribution pour une appli qui ne nécessite pas tous ces services, il est primordial de les laisser, cela évitera des erreurs de config par la suite.


### TODO

## Corrections 

# Interface DemoSKV2 

 - Changer l'icon de la vue courante (en haut à droite) lorsqu'on a modifié le profil utilisateur
 - Afficher correctement les listes de démos, parcours clients, fonctionnalités,... (certaines sont cachés par la div) une fois la vue choisie. 
 - Changer les icon des tests (en profil ivq) pour quelles correspondent à celle sur Figma (on peut trouver de nouvelles icon sur flaticon).  

## Evolutions à poursuivre (selon ticket Jira SK2-1779)

 - Meilleure gestion des affichages status périphériques en critical avec message adapté selon profil (marketing, ivq,...)
 - Possibilité de revenir à la vue précédente dans une démo(bouton previous uniquement pour profil marketing) -> se baser sur le skip avec table de routage (previousRouterDict) dans les fichiers de services des démos (labizi.service par ex).
 - Faire un petit menu interactif (en faisant un double clic dans un un coin ???) proposant de redémarrer la borne, l'arrêter, ou revenir au menu pricnipal lorsque l'on est dans une demo. Une option redémarrer existe déjà si l'on clique en haut à droite de l'écran depuis la démo MoovHopEK8000. 
 - Rajouter menu déroulant de choix de scénarios à lancer dans le cas ou l'on simule certians périphériques
 - continuer le test de page de video call pour qu'il choisisse l'entrée/sortie son (composant video-call dans réperoire tests-ivq dans module demoSKV2). 
