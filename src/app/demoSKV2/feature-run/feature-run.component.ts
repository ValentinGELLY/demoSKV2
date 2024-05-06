import { Component, OnInit, AfterViewInit, Renderer2, ChangeDetectorRef } from '@angular/core';
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



  listTestFunction: any = [];
  listStopFunction: any = [];

  actualLogLocation: string = "";


  firstPreview: boolean = true;
  compteur: number = 0;


  constructor(private cdr: ChangeDetectorRef, skService: SoftKioskService, private renderer: Renderer2, private appService: AppService) {
    super(skService);
  }


  override ngOnInit() {



    this.fileName = this.appService.filename;
    console.log(this.fileName);

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
    this.getJavascriptFile(this.fileName);
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


  getjsonScript(arg0: string) {

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
        this.methods = this.json.methods;
        this.events = this.json.events;
        this.perifUsed = this.json.perifUsed;
        this.nbPerif = this.perifUsed.length;
        this.serviceUsed = this.json.serviceUSed;
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



          let _this = this;
          /**
           * Permet de rediriger les logs vers la console de la page web
           * En fonction du début du log ( FIN, CAPTURE, PREVIEW, ...)
           */
          var log = console.log;
          console.log = function () {
            log.apply(this, Array.prototype.slice.call(arguments));
            let panel = 'panel_Logs';
            if (_this.actualLogLocation !== "") {
              panel = 'panel_Logs_' + _this.actualLogLocation;
            } else {
              panel = 'panel_Logs';
            }
            var logElement = document.getElementById(panel);
            if (logElement) {
              logElement.scrollTo(0, logElement.scrollHeight);
              if (Array.prototype.slice.call(arguments).join(' ').split("-")[0].indexOf("FIN") != -1) {
                document.getElementById("panel_Logs_Results_" + _this.actualLogLocation)!.innerHTML += '<p class="stateInformations">' + Array.prototype.slice.call(arguments).join(' ').split("-")[1] + '</p>';
                let hour = new Date();
                const heure = hour.getHours().toString().padStart(2, "0");
                const minutes = hour.getMinutes().toString().padStart(2, "0");
                const secondes = hour.getSeconds().toString().padStart(2, "0");
                const hourformated = `${heure}:${minutes}:${secondes}`;
                document.getElementById("last_Result_" + _this.actualLogLocation)!.innerHTML = hourformated + "   " + Array.prototype.slice.call(arguments).join(' ').split("-")[1];
                (document.getElementById("playBtn_" + _this.actualLogLocation) as HTMLButtonElement)!.disabled = false;
                panel = 'panel_Logs';
                _this.actualLogLocation = "";
                _this.firstPreview = true;
              } else if (Array.prototype.slice.call(arguments).join(' ').split("-")[0].indexOf("CAPTURE") != -1) {
                document.getElementById("panel_Logs_Results_" + _this.actualLogLocation)!.innerHTML += "<p>" + Array.prototype.slice.call(arguments).join(' ').split("-")[1].slice(0, 20) + "...</p>";
                //document.getElementById("panel_Logs_Results_" + _this.actualLogLocation)!.innerHTML += '<img class="imgLog" src="data:image/png;base64, ' + Array.prototype.slice.call(arguments).join(' ').split("-")[1] + '"/>';
                _this.firstPreview = true;
              } else if (Array.prototype.slice.call(arguments).join(' ').split("-")[0].indexOf("PREVIEW") != -1) {
                if (_this.compteur <= 7) {
                  _this.compteur++;
                } else {
                  if (!_this.firstPreview) {
                    //const previewImage = document.getElementById("previewImage" + _this.actualLogLocation) as HTMLImageElement;
                    //previewImage!.src = 'data:image/png;base64, ' + Array.prototype.slice.call(arguments).join(' ').split("-")[1] ;
                    logElement.innerHTML += "<p>" + Array.prototype.slice.call(arguments).join(' ').split("-")[1].slice(0, 20) + "...</p>";
                  } else {
                    _this.firstPreview = false;
                    logElement.innerHTML += "<p>" + Array.prototype.slice.call(arguments).join(' ').split("-")[1].slice(0, 20) + "...</p>";
                    //logElement.innerHTML += '<img class="imgLog" id="previewImage' + _this.actualLogLocation + '" src="data:image/png;base64, ' + Array.prototype.slice.call(arguments).join(' ').split("-")[1] + '"/>';
                  }
                  _this.compteur = 0;
                }

              } else {
                logElement.innerHTML += '<p class="stateInformations">' + Array.prototype.slice.call(arguments).join(' ') + '</p>';
                _this.firstPreview = true;
              }
            }
          };
        }

        let listMethods = this.methods;
        for (let i = 0; i < listMethods.length; i++) {
          if (listMethods[i].params.length !== 0) {
            listMethods[i].params.forEach((element: any) => {

              let jsonElement = {
                "type": element.type !== undefined ? element.type : "",
                "key": element.key !== undefined ? element.key : "",
                "label": element.label !== undefined ? element.label : "",
                "placeholder": element.placeholder !== undefined ? element.placeholder : "",
                "description": element.description !== undefined ? element.description : "",
                "values": element.values,
                "tooltip": element.description !== undefined ? element.description : "",
                "input": true,
                "customId": element.id
              };
              console.log("jsonElement");
              console.log(jsonElement);


              this.FormJSON.push(jsonElement)
            });
          }
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



      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
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
  async callFunctionFromScript(functionName: string, sectionName: string) {

    try {
      let scriptUrl = `http://localhost:5000/demoSKV2/application/assets/DemoSKV2/confTest/script/${this.fileName}.js`;
      await this.loadScript(scriptUrl);
      document.getElementById("panel_Logs_" + sectionName)!.innerHTML = "";
      if (sectionName.indexOf("test") !== -1) {
        (document.getElementById("playBtn_" + sectionName) as HTMLButtonElement)!.disabled = true;
        this.actualLogLocation = sectionName;
      } else {
        this.actualLogLocation = "";
      }
      // @ts-ignore: Ignorer l'erreur car la fonction peut ne pas exister dans le contexte TypeScript
      window[functionName.slice(0, -2)](); // Appel de la fonction spécifique du script
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
    fetch(`http://localhost:5000/demoSKV2/application/assets/DemoSKV2/confTest/script/${arg0}.js`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(text => {
        // Recherche des fonctions 'test' dans le contenu du fichier JS
        const testFunctions = text.match(/(?:\btest\d*\s*\(.*?\))/g) || [];

        // Recherche des fonctions 'stop' dans le contenu du fichier JS
        const stopFunctions = text.match(/(?:\bstop\d*\s*\(.*?\))/g) || [];

        // Afficher les fonctions trouvées
        testFunctions.forEach(name => console.log(name));

        this.listTestFunction = testFunctions;
        stopFunctions.forEach(name => console.log(name));
        this.listStopFunction = stopFunctions;
        this.cdr.detectChanges();

        console.log(this.listTestFunction);
        console.log(this.listStopFunction);

        let sectionStartAndStop = document.getElementById("startAndStop");

        for (let index = 0; index < this.listStopFunction.length; index++) {
          const element = this.listStopFunction[index];
          sectionStartAndStop!.innerHTML += '<section class="section_test" >'+
    '    <section>'+
    '        <h3 id="userCaseTest1">User Case '+index+' :</h3>'+
    '    </section>'+
    '    <section class="btnSection">'+
    '        <button class="playBtn" id="playBtn_test_'+index+'"'+
    '            (click)="callFunctionFromScript('+this.listTestFunction[index]+', test_'+index+')">'+
    '            Run </button>'+
    '        <button class="stopBtn" id="stopBtn_test_'+index+'"'+
    '            (click)="callFunctionFromScript('+element+',  test_'+index+')">'+
    '            Stop</button>'+
    '    </section>'+
    '    <section class="LogTestAccordion log_test_'+index+'">'+
    '        <section class="testLog_test">'+
    '            <section class="accordion" id="accordion_Logs_test_'+index+'" (click)="showPanel(Logs_test_'+index+')">'+
    '                <h2>Logs</h2>'+
    '                <div class="fleche fleche_Logs_test_'+index+'"></div>'+
    '            </section>'+
    '            <div class="panel " id="panel_Logs_test_'+index+'">'+
    '            </div>'+
    '        </section>'+
    '        <section class="ResultsLog_Results">'+
    '            <section class="accordion" id="accordion_Logs_Results_'+index+'" (click)="showPanel(Logs_Results_test_'+index+')">'+
    '                <h2>Results : <span id="last_Result_test_'+index+'"></span></h2>'+
    '                <div class="fleche fleche_Logs_Results_test_'+index+'"></div>'+
    '            </section>'+
    '            <div class="panel" id="panel_Logs_Results_test_'+index+'">'+
    '            </div>'+
    '        </section>'+
    '    </section>'+
    '</section>'
        }
        



      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }


  ngOnDestroy() {
    for (let i = 0; i < this.nbService; i++) {
      let service = this.serviceUsed[i].name;
      this.skService.removeEventListener(service, "statusChange", () => {});
      this.skService.removeEventListener(service, "stateChange", () => {});
    }
  }

}



