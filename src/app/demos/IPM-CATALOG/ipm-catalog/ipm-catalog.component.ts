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
    allActualServicesStatus: Array<{ service: string, status: string, statusDetail: string }> = [];
    Kiosk: any = Kiosk;

    constructor(private appService: AppService, private catalogService: CatalogService, private softKioskService: SoftKioskService, private router: Router) { }


    ngOnInit() {
        if (this.customerData[this.customerDataKey] == "MOOVHOP-EK4000-2024-MWC" || this.customerData[this.customerDataKey] == "TELEFONICA-EK3000-2024-MOVISTAR") {
            this.language = "EN";
        } else {
            this.language = "FR";
        }
        this.diapo = document.getElementById("diapo");
        this.srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-" + this.language + "/Diapositive01.png"
        this.diapo!.setAttribute("src", this.srcLink)
        this.interval = setInterval(() => {
            this.nextDiapo();
        }, 60000);
        let allServices = Kiosk.services;
        for (let i = 0; i < allServices.length; i++) {
            let service = allServices[i];
            let status = Kiosk[service].status;
            let statusDetail = Kiosk[service].statusDetail;
            this.allActualServicesStatus.push({ service, status, statusDetail });
            this.softKioskService.addEventListener(service, "statusChange", (e: any) => {
                let status = Kiosk[service].status;
                let statusDetail = Kiosk[service].statusDetail;
                this.allActualServicesStatus = this.allActualServicesStatus.map((serviceStatus) => {
                    if (serviceStatus.service === service) {
                        return { service, status, statusDetail };
                    }
                    return serviceStatus;
                });
            })
        }
    }

    previousDiapo() {
        let diapo = document.getElementById("diapo");
        let src = diapo?.getAttribute("src");
        let numDiapo = "";
        let link = src?.split(".")[1];
        // get the two last character from link
        numDiapo = link!.slice(-2);
        if (numDiapo[0] !== "1") {
            if (numDiapo !== "01") {
                let numNextDiapo = parseInt(numDiapo) - 1;
                numNextDiapo = numNextDiapo;
                let srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-" + this.language + "/Diapositive0" + numNextDiapo + ".png"
                diapo?.setAttribute("src", srcLink)
            } else {
                let srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-" + this.language + "/Diapositive14.png"
                diapo?.setAttribute("src", srcLink)
            }
        } else {
            if (numDiapo === '10') {
                let numNextDiapo = "09";
                let srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-" + this.language + "/Diapositive" + numNextDiapo + ".png"
                diapo?.setAttribute("src", srcLink)
            } else {
                let numNextDiapo = parseInt(numDiapo) - 1;
                let srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-" + this.language + "/Diapositive" + numNextDiapo + ".png"
                diapo?.setAttribute("src", srcLink)
            }
        }

        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.previousDiapo();
        }, 60000);
    }

    nextDiapo() {
        let diapo = document.getElementById("diapo");
        let src = diapo?.getAttribute("src");
        let numDiapo = "";
        let link = src?.split(".")[1];

        numDiapo = link!.slice(-2);
        console.log(numDiapo);
        if (numDiapo !== "14") {
            let numNextDiapo = parseInt(numDiapo) + 1;
            if (parseInt(numDiapo) >= 9) {
                numNextDiapo = parseInt(numDiapo) + 1;
                let srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-" + this.language + "/Diapositive" + numNextDiapo.toString() + ".png"
                diapo?.setAttribute("src", srcLink)
            } else {
                numNextDiapo = numNextDiapo;
                let srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-" + this.language + "/Diapositive0" + numNextDiapo.toString() + ".png"

                diapo?.setAttribute("src", srcLink)
            }
        } else {
            let srcLink = "./assets/CATATLOG-IPM/IPM-FICHES-PRODUITS-" + this.language + "/Diapositive01.png"
            diapo?.setAttribute("src", srcLink)
        }

        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.previousDiapo();
        }, 60000);
    }

    changePayment() {
        let btnManualCard = document.getElementById("btnManualCard");
        if (localStorage.getItem('automaticCard') === 'true') {
            // Pour définir une valeur
            localStorage.setItem('automaticCard', 'false');
            btnManualCard!.textContent = "Paiement Manuel"
        } else {
            localStorage.setItem('automaticCard', 'true');
            btnManualCard!.textContent = "Paiement Automatique"
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

    retourDemoskV2() {
        let applicationToLaunch = this.softKioskService.getValueFromCustomerData();;
        //this.appService.setNextRoute('/ES/homePageTelefonica');
        console.log(applicationToLaunch);
        switch (applicationToLaunch) {
            case 'Labizi':
                this.appService.setNextRoute('labiziHomepage');
                break;
            case 'MoovHop1000':
                this.appService.setNextRoute('moovopRecupCard');
                break;
            case 'MoovHop8000':
                this.appService.setNextRoute('moovHopHomepage');
                break;
            case 'MOOVHOP-EK4000-2023-RNTP':
                this.appService.setNextRoute('homepageEK4000');
                break;
            case 'MOOVHOP-EK8000-2023-RNTP':
                this.appService.setNextRoute('homepageEK8000');
                break;
            case 'TELEFONICA-EK3000-2024-MOVISTAR':
                this.appService.setNextRoute('/ES/homePageTelefonica');
                break;
            case 'MOOVHOP-EK4000-2024-MWC':
                this.appService.setNextRoute('/MWC2024/homepageEK4000');
                break;
            case 'MOOVHOP-EK4000-2024-AGIR':
                this.appService.setNextRoute('/AGIR2024/homepage');
                break;
            case 'MOOVHOP-EK8000-2024-AGIR':
                this.appService.setNextRoute('/EK80002024AGIR/homepage');
                break;
            case 'MOOVHOP-EK8000-2024-EUMO':
                this.appService.setNextRoute('/EUMO2024/homepage');
                break;
            case 'DemoSKV2':
                this.appService.setNextRoute('/demoSKV2AllPagesApp');
                break;
            default:
                console.log("Vous allez être redirigé sur DemoSKV2");
                this.appService.setNextRoute('/demoSKV2AllPagesApp');
                break;
        }
    }

}
