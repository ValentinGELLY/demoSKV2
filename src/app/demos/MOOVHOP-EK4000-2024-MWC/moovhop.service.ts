import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { SoftKioskService } from 'src/app/softkiosk.service';

@Injectable({
    providedIn: 'root'
})

export class MoovhopService {

    urlFetch: string = "https://emea.identityx-cloud.com/ipmfrance";

    idUserToCheck: string="";
    nameUserToCheck: string="";
    firstnameUserToCheck: string="";
    idChecks: string = "";
    referenceId: string = "";


    identityPicture: boolean = false;
    previewImageProfile: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    previewImageScanIdA: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    previewImageScanIdB: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";

    previewImageScanIdADef:string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    previewImageScanIdBDef:string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";


    timeScanIdA: Date = new Date();
    timeScanIdB: Date = new Date();


    currentView = "";

    isScanFinished: boolean = false;
    scanVisited: number = 0;

    LineChoosed: number = 1;
    errorSaveIdCard: boolean = false;

    ActionChoosed: number = 1;

    newerCiImageCapture: string = "";


    private moovHopRouterDic: any = {
    
    };

    private moovHopPreviousRouterDict: any = {

    };
    
    constructor(private router: Router, private appService: AppService, private _router: ActivatedRoute) {  
    }

    preloadImages() {
        let images = [
            "./assets/MOOVHOP-EK8000-2023-RNTP/AllerRetour.png",
            "./assets/MOOVHOP-EK8000-2023-RNTP/AllerSimple.png",
            "./assets/MOOVHOP-EK8000-2023-RNTP/Carnet10tickets.png",
            "./assets/MOOVHOP-EK8000-2023-RNTP/Pass24H.png",
            "./assets/MOOVHOP-EK8000-2023-RNTP/Pass48h.png",
            "./assets/MOOVHOP-EK8000-2023-RNTP/Pass72h.png",
        ];
        for (let i = 0; i < images.length; i++) {
            let img = new Image();
            img.src = images[i];
        }
    }

    navigateAfterDelay(delay: number, goTo: string = "") {
        let router = this.router;
        let newRoute = (goTo) ? goTo : (this.moovHopRouterDic[router.url]) ? this.moovHopRouterDic[router.url] : "";
        setTimeout(() => {
            if (newRoute) {
                router.navigate([newRoute]);
            }
        }, delay)
    }

    get currentUrl() {
        return this.router.url;
    };

    get nextRoute() {
        return this.moovHopRouterDic[this.router.url];
    };

    get previousRoute() {
        return this.moovHopPreviousRouterDict[this.router.url];
    };

}