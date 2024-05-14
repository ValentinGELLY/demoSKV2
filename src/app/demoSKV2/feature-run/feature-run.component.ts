import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { GenericComponent } from 'src/app/demos/generic/generic.component';
import { SoftKioskService } from 'src/app/softkiosk.service';
import { marked } from 'marked';

declare var Formio: any;
declare var Kiosk: any;

@Component({
  selector: 'app-feature-run',
  templateUrl: './feature-run.component.html',
  styleUrls: ['./feature-run.component.scss'],
})

export class FeatureRunComponent extends GenericComponent implements OnInit {

  json: any;


  nomApp = "";
  description = "";
  methods: any;
  events: any;
  perifUsed: any;
  nbPerif: any;
  serviceUsed: any;
  nbService: any;

  fileName: string = this.appService.filename;

  historicStatusService: { [service: string]: any } = {};
  historicStateService: { [service: string]: any } = {};
  historicStatusDevice: { [device: string]: any } = {};

  FormJSON: any = [];

  actualStatusAllService: any = [];
  lastHourStatus: any = [];
  lastHourState: any = [];
  actualStatusAllDevice: any = [];
  actualStateAllService: any = [];

  parameters: any = {}

  listTestFunction: any = [];
  listStopFunction: any = [];
  listComments: any = [];

  actualLogLocation: string = "";


  firstPreview: boolean = true;
  compteur: number = 0;


  constructor(skService: SoftKioskService, private renderer: Renderer2, private appService: AppService) {
    super(skService);
  }


  override ngOnInit() {



    this.fileName = this.appService.filename;
    //console.log(this.fileName);

    document.getElementById("btnRead")!.addEventListener("click", function () {
      document.getElementById("popUpDescritionPage")!.style.opacity = "0.7";
      document.getElementById("popUpDescrition")!.style.opacity = "1";
      document.getElementById("popUpDescritionPage")!.style.display = "block";
      document.getElementById("popUpDescrition")!.style.display = "block";

      document.getElementById("popUpDescritionPage")!.addEventListener("click", function () {
        document.getElementById("popUpDescritionPage")!.style.opacity = "0";
        document.getElementById("popUpDescrition")!.style.opacity = "0";
        setTimeout(function () {
          document.getElementById("popUpDescritionPage")!.style.display = "none";
          document.getElementById("popUpDescrition")!.style.display = "none";
        }, 500); // Same as the transition time
      });
    });

    document.getElementById("crossPopUp")!.addEventListener("click", function () {
      document.getElementById("popUpDescritionPage")!.style.opacity = "0";
      document.getElementById("popUpDescrition")!.style.opacity = "0";
      setTimeout(function () {
        document.getElementById("popUpDescritionPage")!.style.display = "none";
        document.getElementById("popUpDescrition")!.style.display = "none";
      }, 500); // Same as the transition time
    });
    this.getjsonScript(this.fileName);

  }




  getShortenedDescription(): string {
    if (this.description.length <= 200) {
      return this.description;
    } else {
      let string = this.description.slice(0, 200) + "...";
      return string
    }
  }

  getActualStatusDevice(arg0: any) {
    console.log(this.historicStatusDevice);
    const cles = Object.keys(this.historicStatusDevice[arg0]);
    console.log(cles);

    const clePlusRecente = cles.reduce((a, b) => (new Date(b) > new Date(a) ? b : a));
    console.log(clePlusRecente);

    return this.historicStatusDevice[arg0][clePlusRecente];
  }


  async getjsonScript(arg0: string) {
    fetch(`http://localhost:5000/demoSKV2/application/assets/DemoSKV2/confTest/${arg0}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        this.json = json;
        this.nomApp = this.json.title;
        this.description = this.json.description;
        this.perifUsed = this.json.perifUsed;
        this.nbPerif = this.perifUsed.length;
        this.serviceUsed = this.json.serviceUSed;
        /*let allProperties = [];
        for (let index = 0; index < this.serviceUsed.length; index++) {
          const element = this.serviceUsed[index].name;
          console.info("element");
          console.info(element);
          
          for (let index = 0; index < Kiosk[element].length; index++) {
            const element1 = Kiosk[element][index];
            console.info("element1");
            console.info(element1);
            if( /^\p{Lu}/u.test( element1 ) ) {
              allProperties.push(element1);
            }
          }
        }
        this.perifUsed = allProperties;*/
        this.perifUsed = this.json.perifUsed;
        this.nbService = this.serviceUsed.length;
        this.actualStatusAllService = Array(this.nbService).fill("");
        this.actualStatusAllDevice = Array(this.nbPerif).fill("");
        this.lastHourStatus = Array(this.nbService).fill("");

        for (let i = 0; i < this.nbService; i++) {
          let service = this.serviceUsed[i].name;

          let hour = new Date();
          const heure = hour.getHours().toString().padStart(2, "0");
          const minutes = hour.getMinutes().toString().padStart(2, "0");
          const secondes = hour.getSeconds().toString().padStart(2, "0");
          const hourformated = `${heure}:${minutes}:${secondes}`;
          if (!this.historicStatusService.hasOwnProperty(service)) {
            this.historicStatusService[service] = [];
          }
          if (!this.historicStateService.hasOwnProperty(service)) {
            this.historicStateService[service] = [];
          }
          let status = this.skService.getStatus(service);
          let state = this.skService.getState(service);

          this.historicStatusService[service].unshift({ time: hourformated, status: status });
          this.historicStateService[service].unshift({ time: hourformated, state: state });
          this.actualStatusAllService[i] = status;
          this.actualStateAllService[i] = state;
          this.lastHourStatus[i] = hourformated;

          this.skService.addEventListener(service, "statusChange", (e: any) => {
            console.log("eventlistener status : " + service + "  " + e.data.status);

            let hour = new Date();
            const heure = hour.getHours().toString().padStart(2, "0");
            const minutes = hour.getMinutes().toString().padStart(2, "0");
            const secondes = hour.getSeconds().toString().padStart(2, "0");
            const hourformated = `${heure}:${minutes}:${secondes}`;
            this.historicStatusService[service].unshift({ time: hourformated, status: e.data.status });
            //document.getElementById("panel_" + service)!.innerHTML += '<p>'+ hourformated + '   ' + e.data.status + '</p>';
            document.getElementById("status_" + service)!.innerHTML = hourformated + "   " + e.data.status;
            this.actualStatusAllService[i] = e.data.status;
            this.lastHourStatus[i] = hourformated;

            console.log(this.historicStatusService[service]);
          });


          this.skService.addEventListener(service, "stateChange", (e: any) => {
            let hour = new Date();
            const heure = hour.getHours().toString().padStart(2, "0");
            const minutes = hour.getMinutes().toString().padStart(2, "0");
            const secondes = hour.getSeconds().toString().padStart(2, "0");
            const hourformated = `${heure}:${minutes}:${secondes}`;
            this.historicStateService[service].unshift({ time: hourformated, state: e.data.state });
            //document.getElementById("panel_" + service)!.innerHTML += '<p>'+ hourformated + '   ' + e.data.status + '</p>';
            document.getElementById("state_" + service)!.innerHTML = hourformated + "   " + e.data.state;
            this.actualStateAllService[i] = e.data.state;
            this.lastHourState[i] = hourformated;
          });
        }
        /**
           * Permet de rediriger les logs vers la console de la page web
           * En fonction du début du log ( FIN, CAPTURE, PREVIEW, ...)
           */
        let _this = this;

        const originalConsoleLog = console.log;

        console.log = function () {
          originalConsoleLog.apply(this, Array.from(arguments));

          let panel = 'panel_Logs';
          if (_this.actualLogLocation !== "") {
            panel = 'panel_Logs_' + _this.actualLogLocation;
          } else {
            panel = 'panel_Logs';
          }

          var logElement = document.getElementById(panel);
          if (logElement) {
            logElement.scrollTo(0, logElement.scrollHeight);
            console.info("arguments");

            const logMessage = Array.prototype.slice.call(arguments).join(' ');
            const logParts = logMessage.split("-");
            const logType = logParts[0];
            const logContent = logParts.slice(1).join('-');
            if (logType.includes("FIN") || logType.includes("ERROR")) {
              console.info("FI");
              console.info("_this.actualLogLocation");
              console.info(_this.actualLogLocation);
              document.getElementById("panel_Logs_Results_" + _this.actualLogLocation)!.innerHTML += '<p class="stateInformations">' + logContent + '</p>';
              let hour = new Date();
              const heure = hour.getHours().toString().padStart(2, "0");
              const minutes = hour.getMinutes().toString().padStart(2, "0");
              const secondes = hour.getSeconds().toString().padStart(2, "0");
              const hourFormatted = `${heure}:${minutes}:${secondes}`;

              document.getElementById("last_Result_" + _this.actualLogLocation)!.innerHTML = hourFormatted + "   " + logContent;
              panel = 'panel_Logs';
              _this.firstPreview = true;
              document.getElementById("playBtn_" + _this.actualLogLocation)!.style.opacity = "1";
              (document.getElementById("playBtn_" + _this.actualLogLocation) as HTMLButtonElement)!.disabled = false;
              _this.actualLogLocation = "";
            } else if (logType.includes("CAPTURE")) {
              document.getElementById("panel_Logs_Results_" + _this.actualLogLocation)!.innerHTML += "<p>" + logContent.slice(0, 20) + "...</p>";
              document.getElementById("playBtn_" + _this.actualLogLocation)!.style.opacity = "1";
              (document.getElementById("playBtn_" + _this.actualLogLocation) as HTMLButtonElement)!.disabled = false;
              _this.firstPreview = true;
            } else if (logType.includes("PREVIEW")) {
              if (_this.compteur <= 7) {
                _this.compteur++;
              } else {
                if (!_this.firstPreview) {
                  logElement.innerHTML += "<p>" + logContent.slice(0, 20) + "...</p>";
                } else {
                  _this.firstPreview = false;
                  logElement.innerHTML += "<p>" + logContent.slice(0, 20) + "...</p>";
                }
                _this.compteur = 0;
              }
            } else {
              console.info("logContent");
              console.info(logContent);
              logElement.innerHTML += '<p class="stateInformations">' + logContent + '</p>';
              _this.firstPreview = true;
            }
          }
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    await this.getJavascriptFile(this.fileName);
    
  }

  getStatusKeys(statusHistory: any): string[] {
    return Object.keys(statusHistory);
  }


  getObjectEntries(object: any): any[] {
    return Object.entries(object);
  }


  showStatusHistory(service: string): void {
    const panelElement = document.getElementById(`panel_${service}`);
    if (panelElement) {
      if (panelElement.style.display === "block") {
        panelElement.style.display = "none";
      } else {
        panelElement.style.display = "block";
      }
    }
  }


  loadScript(url: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = this.renderer.createElement('script');
      scriptElement.src = url;
      scriptElement.onload = resolve;
      scriptElement.onerror = reject;
      this.renderer.appendChild(document.body, scriptElement);
    });
  }

  // Fonction pour appeler une fonction spécifique du script
  async callFunctionFromScript(functionName: string, sectionName: string, idSection: string) {
    try {
      let scriptUrl = `http://localhost:5000/demoSKV2/application/assets/DemoSKV2/confTest/script/${this.fileName}.js`;
      this.actualLogLocation = sectionName;
      await this.loadScript(scriptUrl);
      document.getElementById("panel_Logs_" + sectionName)!.innerHTML = "";
      document.getElementById("last_Result_"+sectionName)!.innerHTML = "";
      // @ts-ignore: Ignorer l'erreur car la fonction peut ne pas exister dans le contexte TypeScript
      window[functionName.slice(0, -2)](); // Appel de la fonction spécifique du script
      if (idSection.includes("play")) {
        console.info("idSection");
        console.info(idSection);
        document.getElementById(idSection)!.style.opacity = "0.5";
        (document.getElementById(idSection) as HTMLButtonElement)!.disabled = true
      } else {
        console.info("sectionName");
        console.info("playBtn_ " + sectionName);
        document.getElementById("playBtn_" + sectionName)!.style.opacity = "1";
        (document.getElementById("playBtn_" + sectionName) as HTMLButtonElement)!.disabled = false
        this.actualLogLocation = "";
      }


    } catch (error) {
      console.error('Erreur lors du chargement du script :', error);
    }
  }

  showPanel(nameElement: string) {
    if (document.getElementById('panel_' + nameElement)!.style.display === "flex") {
      (document.getElementsByClassName('fleche_' + nameElement)[0] as HTMLElement).style.transform = "rotate(-90deg)";
      document.getElementById('panel_' + nameElement)!.style.display = "none";
    } else {
      (document.getElementsByClassName('fleche_' + nameElement)[0] as HTMLElement).style.transform = "rotate(0deg)";

      document.getElementById('panel_' + nameElement)!.style.display = "flex";
      document.getElementById('panel_' + nameElement)!.style.flexDirection = "column";
    }
  }

  async getJavascriptFile(arg0: string) {
    try {
      const response = await fetch(`http://localhost:5000/demoSKV2/application/assets/DemoSKV2/confTest/script/${arg0}.js`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();

      // Recherche des fonctions 'start' et 'stop' dans le contenu du fichier JS
      const testFunctions = text.match(/(?:\bstart\d*\s*\(.*?\))/g) || [];
      const stopFunctions = text.match(/(?:\bstop\d*\s*\(.*?\))/g) || [];

      // Afficher les fonctions trouvées
      //testFunctions.forEach(name => console.log(name));
      //stopFunctions.forEach(name => console.log(name));

      this.listTestFunction = testFunctions;
      this.listStopFunction = stopFunctions;

      // Recherche des commentaires juste au-dessus des fonctions 'start' et 'stop'
      const functionCommentsFirst = text.match(/\/\*\*[^*]*\*+(?:[^/*][^*]*\*+)*\/(?=\s*(?:async\s+)?(?:function\s+)?(?:start\d*)\s*\()/g) || [];

      // Nettoyer les commentaires
      const functionCommentsFinish = functionCommentsFirst.map(comment => {
        // Supprime les délimitations /** et */
        let cleanedComment = comment.replace(/^\/\*\*|\*\/$/g, '').trim();

        // Supprime les lignes contenant uniquement des *
        cleanedComment = cleanedComment.replace(/^\s*\*\s?/gm, '').trim();

        // Retourne la première ligne nettoyée qui contient le texte
        const lines = cleanedComment.split('\n').map(line => line.trim());
        return lines[0].split('@')[0].trim();
      }).filter(description => description.length > 0); // Filtre les chaînes vides

      // Afficher les commentaires de description trouvés
      //functionCommentsFinish.forEach(comment => console.log(comment));

      this.listComments = functionCommentsFinish;

      this.parameters = this.extractParameterDetails(text);
      console.log("this.parameters");
      console.log(this.parameters);
      for (let i = 0; i < this.parameters.length; i++) { 
        let jsonElement = {
          "type": this.parameters[i].type !== undefined ? this.parameters[i].type : "",
          "key": this.parameters[i].name !== undefined ? this.parameters[i].name : "",
          "label": this.parameters[i].name !== undefined ? this.parameters[i].name : "",
          "placeholder": this.parameters[i].default !== undefined ? this.parameters[i].default : "",
          "description": this.parameters[i].name !== undefined ? this.parameters[i].name : "",
          "values": this.parameters[i].default !== undefined ? this.parameters[i].default : "",
          "tooltip": this.parameters[i].name !== undefined ? this.parameters[i].name : "",
          "input": true,
          "customId": this.parameters[i].name
        };
        console.log("jsonElement");
        console.log(jsonElement);
        this.FormJSON.push(jsonElement)
          
      }
  
      this.FormJSON.push({
        type: 'button',
        action: 'submit',
        label: 'Enregistrer',
        theme: 'primary'
      })
  
  
      Formio.createForm(document.getElementById('formio'), {
        components: this.FormJSON
      }).then(function (form: { on: (arg0: string, arg1: (submission: any) => void) => void; }) {
        if (document.getElementsByName("data[number]").length !== 0) {
          for (let i = 0; i < document.getElementsByName("data[number]").length; i++) {
            document.getElementsByName("data[number]")[i]!.setAttribute("type", "number");
          }
        }
        form.on('submit', function (submission: any) {
          console.log(submission);
        });
      });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }


  extractParameterDetails(script: string) {
    const parameterPattern = /@param {([^}]+)} ([^ ]+) - Default: ([^ -]+) -/g;
    const matches = [...script.matchAll(parameterPattern)];
    return matches.map(match => ({
        type: match[1],
        name: match[2],
        default: match[3]
    }));
}


  ngOnDestroy() {
    for (let i = 0; i < this.nbService; i++) {
      let service = this.serviceUsed[i].name;
      this.skService.removeEventListener(service, "statusChange", () => { });
      this.skService.removeEventListener(service, "stateChange", () => { });
    }
  }

}



