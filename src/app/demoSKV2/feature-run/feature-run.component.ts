import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { GenericComponent } from 'src/app/demos/generic/generic.component';
import { SoftKioskService } from 'src/app/softkiosk.service';
import { marked } from 'marked';



@Component({
  selector: 'app-feature-run',
  templateUrl: './feature-run.component.html',
  styleUrls: ['./feature-run.component.scss']
})
export class FeatureRunComponent extends GenericComponent implements OnInit {

  json = {
    "title": "CardPayment Debit Cancel",
    "description": "Test de débit de carte bancaire avec annulation (choix du moment de l'arret possible )",
    "methods": [
      {
        "name": "cardDebit",
        "description": "Débit de carte bancaire",
        "service": "CardPayment",
        "perif": "",
        "params": [
          {
            "name": "ammountInCents",
            "description": "Débit total",
            "typeParam": "input",
            "type": "number",
            "value": 5
          },
          {
            "name": "refTransaction",
            "description": "Référence de la transaction",
            "typeParam": "input",
            "type": "text",
            "value": "ref-deb-0000"
          },
          {
            "name": "refShoppingCart",
            "description": "Référence du panier",
            "typeParam": "input",
            "type": "text",
            "value": "ticket-1234"
          }
        ]
      },
      {
        "name": "cardDebitCancel",
        "description": "Annulation du débit de carte bancaire",
        "service": "CardPayment",
        "perif": "",
        "params": []
      }
    ],
    "events": [
      {
        "name": "cardDebit",
        "description": "Code barre lu",
        "dataType": [
          {
            "condition": "CardAcquired",
            "desciption": "Carte acquise"
          },
          {
            "condition": "TransactionAuthorized",
            "desciption": "Transaction autorisée"
          },
          {
            "condition": "CardDebited",
            "desciption": "Carte débitée"
          },
          {
            "condition": "CardDebitError",
            "desciption": "Erreur de débit de carte"
          }
        ]
      },
      {
        "name": "BarcodeReading",
        "description": "Code barre lu",
        "dataType": [
          {
            "condition": "BarcodeRead",
            "desciption": "Code barre lu"
          }
        ]
      }
    ],
    "serviceUSed": [
      {
        "name": "CardPayment"
      },
      {
        "name": "ReceiptPrinting"
      }
    ],
    "perifUsed": [
      {
        "name": "CardReader",
        "description": "Lecteur de carte bancaire"
      },
      {
        "name": "ReceiptPrinter",
        "description": "Imprimante de ticket"
      }
    ]
  }

  nomApp = "";
  description = "";
  methods: any;
  events: any;
  perifUsed: any;
  nbPerif: any;
  serviceUsed: any;
  nbService: any;

  historiqueStatusService: { [service: string]: any } = {};
  historiqueStatusDevice: { [device: string]: any } = {};
  



  constructor(skService: SoftKioskService) {
    super(skService);
  }


  override ngOnInit() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    const accordion: HTMLCollectionOf<Element> = document.getElementsByClassName("accordion");

    for (let i = 0; i < accordion.length; i++) {
      accordion[i].addEventListener("click", function (this: HTMLElement) {
        this.classList.toggle("active");

        const panel: HTMLElement | null = this.nextElementSibling as HTMLElement;

        if (panel.style.maxHeight && panel.style.maxHeight !== "0px") {
          panel.style.maxHeight = "0px";
        } else {
          if (panel) {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        }
      });
    }

    this.nomApp = this.json.title;
    this.description = this.json.description;
    this.methods = this.json.methods;
    this.events = this.json.events;
    this.perifUsed = this.json.perifUsed;
    this.nbPerif = Array(this.perifUsed.length).fill(0).map((x, i) => i);
    this.serviceUsed = this.json.serviceUSed;
    this.nbService = Array(this.serviceUsed.length).fill(0).map((x, i) => i);


    // créer une dictionnaire avec les nom de perif 



    for (let i = 0; i < this.nbService.length; i++) {
      let service = this.serviceUsed[i].name;
      let hour = new Date();
      // Récupérer l'heure
      const heure = hour.getHours();
      const minutes = hour.getMinutes();
      const secondes = hour.getSeconds();
      const heureFormattee = `${heure}:${minutes}:${secondes}`;
      this.historiqueStatusService[service]= {[ heureFormattee ]: "OK" };
      console.log(this.historiqueStatusService);
      
      this.skService.addEventListener(service, "statusChange", (e: any) => {
        let hour = new Date();
        // Récupérer l'heure
        const heure = hour.getHours();
        const minutes = hour.getMinutes();
        const secondes = hour.getSeconds();
        const heureFormattee = `${heure}:${minutes}:${secondes}`;
        this.historiqueStatusService[service]= {[ heureFormattee ]: e.data.status };
        document.getElementById("status_" + service)!.innerHTML = e.data.status;
      });



      this.getActualStatusService(service);
    }


    
    for (let i = 0; i < this.nbPerif.length; i++) {
      let hour = new Date();
      let Device = this.perifUsed[i].name;
      const heure = hour.getHours();
      const minutes = hour.getMinutes();
      const secondes = hour.getSeconds();
      const heureFormattee = `${heure}:${minutes}:${secondes}`;
      this.historiqueStatusDevice[Device] =  {[ heureFormattee ]: "OK" };
      console.log(this.historiqueStatusDevice);
      
      this.skService.addEventListener(Device, "statusChange", (e: any) => {
        let hour = new Date();
      let Device = this.perifUsed[i].name;
      const heure = hour.getHours();
      const minutes = hour.getMinutes();
      const secondes = hour.getSeconds();
      const heureFormattee = `${heure}:${minutes}:${secondes}`;
        this.historiqueStatusService[Device] = {[heureFormattee]: e.data.status};
        document.getElementById("status_" + Device)!.innerHTML = e.data.status;
      });
      this.getActualStatusDevice(Device.name)
    }



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
    console.log(this.historiqueStatusDevice);
    const cles = Object.keys(this.historiqueStatusDevice[arg0]);
    console.log(cles);
    
    const clePlusRecente = cles.reduce((a, b) => (new Date(b) > new Date(a) ? b : a));
    console.log(clePlusRecente);

    return this.historiqueStatusDevice[arg0][clePlusRecente];
  }



  getActualStatusService(arg0: any) {
    console.log(this.historiqueStatusService);
    const cles = Object.keys(this.historiqueStatusService[arg0]);
    console.log(cles);
    
    const clePlusRecente = cles.reduce((a, b) => (new Date(b) > new Date(a) ? b : a));
    console.log(clePlusRecente);

    return  this.historiqueStatusService[arg0][clePlusRecente];
  }


}