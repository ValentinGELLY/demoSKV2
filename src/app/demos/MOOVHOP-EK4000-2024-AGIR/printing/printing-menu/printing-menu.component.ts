import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';
import { SoftKioskService } from 'src/app/softkiosk.service';
import { Router } from '@angular/router';
import { GenericComponent } from '../../../generic/generic.component';

declare var Kiosk: any;
@Component({
  selector: 'app-printing-menu',
  templateUrl: './printing-menu.component.html',
  styleUrls: ['./printing-menu.component.scss', '../../moovhop.component.scss']
})
export class PrintingMenuComponent {

  constructor(private moovhopService: MoovhopService, private skService: SoftKioskService, private router : Router ) {
   }

  Choose(num: number) {
    this.moovhopService.LineChoosed = num;

  }

  printCallback = (e: any): any => {   
    let navEvent;
    switch (e.data.dataType) {
      case 'RawPdfPrinted':
        if (this.router.url === "/AGIR2024/printingMenu") {
          // traitement pour le changement de vue
          this.skService.removeEventListener("DocumentPrinting", "rawPdfPrint", this.printCallback);
          navEvent = new CustomEvent("moovHopNav", {
            detail: {
              "delay": 5000,
              "goTo": "/AGIR2024/homepage"
            }
          });
          window.dispatchEvent(navEvent);
        }
        break;
      case 'RawPdfPrintError':
        if (this.router.url === "/AGIR2024/printingMenu") {
          this.skService.removeEventListener("DocumentPrinting", "rawPdfPrint", this.printCallback);
          console.error(e.data.code + ": " + e.data.description);
          // traitement pour le changement de vue
          navEvent = new CustomEvent("moovHopNav", {
            detail: {
              "delay": 0,
              "goTo": "/AGIR2024/homepage"
            }
          });
          window.dispatchEvent(navEvent);
        }
        break;
    }
  }


  ngOnInit(): void {
    
    this.skService.addEventListener("DocumentPrinting", "rawPdfPrint", this.printCallback);


    this.skService.addEventListener("DocumentPrinting", "stateChange", (e: any) => {
      switch (e.data.state) {
        case "Processing":
          document.getElementById("in_progress")!.style.display = "block";
          document.getElementById("texte_verif")!.style.display = "none";
          break;
        case "Ready":
          document.getElementById("in_progress")!.style.display = "none";
          break;
      }
      
    });



    /*setInterval(() => {
      console.log("setInterval");
      console.log(document.getElementsByTagName("canvas")[0]);
      if (document.getElementsByTagName("canvas")[0]){
        document.getElementsByClassName("mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color")[2].addEventListener("click", ()=>{
          let canvas = document.getElementsByTagName("canvas")[0];
          canvas.toBlob((blob) => {
            this.blobToBase64(blob!).then((base64) => {
              this.skService.addEventListener("DocumentPrinting", "rawPdfPrint", this.printCallback);
              let base64String = base64 as string;
              this.skService.documentPrintingPrintRawPdf(base64String.split(",")[1]);
            });
          });
        });
      }
    }, 1000);*/
  
    

    /**
     * a faire si c'est un blob
     let rawPDFBase64 = fetch("src").then((response) => {
      response.blob().then((blob) => {
        blobToBase64(blob).then((base64) => {
          return base64;
        });
      });
    });
   
   
    if (typeof Kiosk !== "undefined") {
      Kiosk.Session.close({
        information:
          "Nouvelle session utilisateur / Démarrage du scénario de paiement",
      });
     
   
      fetch(src).then((response) => {
        response.blob().then((blob) => {
          blobToBase64(blob).then((base64) => {
            console.log(base64.split(",")[1]);
            Kiosk.DocumentPrinting.printRawPdf({
              raw: base64.split(",")[1],
             
             
            });
          });
        });
      });

*/

  }

  

  



}
