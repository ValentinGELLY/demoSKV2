import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { SoftKioskService } from '../../softkiosk.service';

@Injectable({
    providedIn: 'root'
})

export class CatalogService {

    timeout: any = null;
    identityPicture: boolean = false;
    route: any = '/AGIR2024/createAccountPersonalInformations';

    currentView = "";



    private moovHopRouterDic: any = {
    };


    private moovHopPreviousRouterDict: any = {

    };

    private fcMoovHopRouterDict: any = {

    }
    
    constructor(private router: Router, private appService: AppService, private _router: ActivatedRoute) {
        //navigation
        let _this = this;
        this.currentView = appService.getCurrentView();
        window.addEventListener("moovHopNav", function (e: any) {
            _this.navigateAfterDelay(e.detail.delay, e.detail.goTo)
        })
    }

    preloadImages() {

    }

    timeoutNavigation() {
        this.timeout = setTimeout(() => {
            if (this.router.url !== '/AGIR2024/homepage') {
                this.navigateAfterDelay(0, "/AGIR2024/homepage");
            }
        }, 120000);
    }

    resetTimeoutNavigation() {
        clearTimeout(this.timeout);
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
        if (this.moovHopRouterDic[this.router.url]) {
            return this.moovHopRouterDic[this.router.url];
        }
        else {
            return "/AGIR2024/homepage";
        }
    };

    get previousRoute() {
        return this.moovHopPreviousRouterDict[this.router.url];
    };



}