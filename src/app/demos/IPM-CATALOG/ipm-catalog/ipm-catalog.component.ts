import { Component } from '@angular/core';
import { AppService } from '../../../app.service';
import { CatalogService } from '../catalog.service';
import { SoftKioskService } from '../../../softkiosk.service';
import { Router } from '@angular/router';


declare var Kiosk: any;
@Component({
  selector: 'app-ipm-catalog',
  templateUrl: './ipm-catalog.component.html',
  styleUrl: './ipm-catalog.component.scss'
})


export class IpmCatalogComponent {
  timer: any = 60000;
  language: string = "FR";
  interval: any;
  customerData: any = Kiosk.customerData;

  customerDataKey = Object.keys(this.customerData)[0]
  diapo: any;
  srcLink: any;
  allActualServicesStatus: Array<{service:string, status: string, statusDetail: string}> = [];
    Kiosk: any = Kiosk;

  constructor(private appService: AppService, private catalogService: CatalogService, private softKioskService: SoftKioskService, private router: Router) { }


  ngOnInit(){
    if (this.customerData[this.customerDataKey] == "MOOVHOP-EK4000-2024-MWC" || this.customerData[this.customerDataKey] == "TELEFONICA-EK3000-2024-MOVISTAR") {
        this.language = "EN";
    } else {
        this.language = "FR";
    }
    this.diapo = document.getElementById("diapo");
    this.srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-"+this.language+"/Diapositive01.png"
    this.diapo!.setAttribute("src", this.srcLink)
    this.interval = setInterval(() => {
        this.nextDiapo();
    }, 60000);
    let allServices = Kiosk.services;
    console.log("allServices");
    console.log(allServices);
    for (let i=0; i<allServices.length; i++){
        let service = allServices[i];
        let status = Kiosk[service].status;
        let statusDetail = Kiosk[service].statusDetail;
        this.allActualServicesStatus.push({service, status, statusDetail});
    }
    console.log("this.allActualServicesStatus");
    console.log(this.allActualServicesStatus);
  }

  previousDiapo() {
      let diapo = document.getElementById("diapo");
      let src = diapo?.getAttribute("src");
      let numDiapo = "";
      let link = src?.split(".")[1];
      // get the two last character from link
      numDiapo = link!.slice(-2);
      console.log(numDiapo);
      if (numDiapo[0] !== "1") {
          if (numDiapo !== "01") {
              let numNextDiapo = parseInt(numDiapo) - 1;
              numNextDiapo = numNextDiapo;
              let srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-"+this.language+"/Diapositive0"+numNextDiapo+".png"
              diapo?.setAttribute("src", srcLink)
          } else {
              let srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-"+this.language+"/Diapositive14.png"
              diapo?.setAttribute("src", srcLink)
          }
      } else {
          if (numDiapo === '10') {
              let numNextDiapo = "09";
              let srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-"+this.language+"/Diapositive" + numNextDiapo + ".png"
              diapo?.setAttribute("src", srcLink)
          } else {
              let numNextDiapo = parseInt(numDiapo) - 1;
              let srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-"+this.language+"/Diapositive" + numNextDiapo + ".png"
              diapo?.setAttribute("src", srcLink)
          }
      }

      clearInterval(this.interval);
      this.interval = setInterval(() => {
          this.previousDiapo();
      }, 60000);
      console.log("previousDiapo", numDiapo);
  }

  nextDiapo() {
      let diapo = document.getElementById("diapo");
      let src = diapo?.getAttribute("src");
      let numDiapo = "";
      let link = src?.split(".")[1];
      
      console.log(link);
      numDiapo = link!.slice(-2);
      console.log(numDiapo);
      if (numDiapo !== "14") {
          let numNextDiapo = parseInt(numDiapo) + 1;
          if( parseInt(numDiapo) >= 9){
              numNextDiapo = parseInt(numDiapo)+1;
              let srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-"+this.language+"/Diapositive" + numNextDiapo.toString() + ".png"
              diapo?.setAttribute("src", srcLink)
          }else{
              numNextDiapo = numNextDiapo;
              let srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-"+this.language+"/Diapositive0" + numNextDiapo.toString() + ".png"

              diapo?.setAttribute("src", srcLink)
          }
      } else {
          let srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-"+this.language+"/Diapositive01.png"
          diapo?.setAttribute("src", srcLink)
      }

      clearInterval(this.interval);
      this.interval = setInterval(() => {
          this.previousDiapo();
      }, 60000);
      console.log("previousDiapo", numDiapo);
  }

  changePayment(){
      let btnManualCard = document.getElementById("btnManualCard");
      if(localStorage.getItem('automaticCard') === 'true'){
          // Pour définir une valeur
          localStorage.setItem('automaticCard', 'false');
          btnManualCard!.textContent="Paiement Manuel"
      }else{
          localStorage.setItem('automaticCard', 'true');
          btnManualCard!.textContent="Paiement Automatique"
      }
  }

  returnToDemo() {
      this.appService.goBackOnPreviousPage();
  } 

  restart() {
      let confirmation = window.confirm("Redémarer la borne ?")
      if (confirmation) {
          Kiosk.restart();
      }
  }

  
  closePopUp() {
      let popUp = document.getElementById("moovHopCriticalService");
      if (popUp != null) {
          popUp.style.display = "none";
      }
  }


    showPopUp() {
        let popUp = document.getElementById("moovHopCriticalService");
        if (popUp != null) {
            popUp.style.display = "block";
        }
    }

}
