import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { SoftKioskService } from '../../softkiosk.service';

@Injectable({
    providedIn: 'root'
})

export class MoovhopService {

    timeout: any = null;
    identityPicture: boolean = false;
    route: any = '/EUMO2024/createAccountPersonalInformations';

    currentView = "";

    isScanFinished: boolean = false;
    scanVisited: number = 0;

    LineChoosed: number = 1;

    ActionChoosed: number = 1;

    newerCiImageCapture: string = "";

    QRCodeScaned: boolean = false;


    whatSubscription: string = "1";
    priceSubscription: number = 15;
    textSubscription: string = '<p style="text-align:center;">Abonnement 1 semaine</p>';

    paidWithCB: boolean = false;

    heureCB: string = "";

    textCB: string = '';


    // Gestions Reconnaissance facial
    documentSelected: string = "IdCard";
    faceCapture: string = ""




    private moovHopRouterDic: any = {
        // use case achat d'un pass (création d'un compte)
        '/EUMO2024/homepage': '/EUMO2024/createAccountMenu',
        '/EUMO2024/createAccountMenu': '/EUMO2024/createAccountCamera',
        '/EUMO2024/createAccountScanFinish': '/EUMO2024/createAccountPersonalInformations',
        '/EUMO2024/createAccountPersonalInformations': '/EUMO2024/createAccountHello',
        '/EUMO2024/createAccountHello': '/EUMO2024/createAccountProofAddress',
        '/EUMO2024/createAccountProofAddress': '/EUMO2024/createAccountSubscriptionChoice',
        '/EUMO2024/createAccountSubscriptionChoice': '/EUMO2024/createAccountQRCodeYesNo',
        '/EUMO2024/createAccountQRCodeYesNo': '/EUMO2024/createAccountQRCodeScan',
        '/EUMO2024/createAccountQRCodeScan': '/EUMO2024/paymentChoice',
        '/EUMO2024/paymentChoice': '/EUMO2024/paymentCB',
        '/EUMO2024/paymentCB': '/EUMO2024/thanksPaymentReport',
        '/EUMO2024/subscriptionConfirmation': '/EUMO2024/homepage',
        '/EUMO2024/paymentMobileOp': '/EUMO2024/thanksPaymentReport',
        '/EUMO2024/paymentMobileOpValidation': '/EUMO2024/thanksPaymentReport',
        '/EUMO2024/paymentAppMobile': '/EUMO2024/thanksPaymentReport',

        // use case impression d'une fiche horaire
        '/EUMO2024/printingMenu': '/EUMO2024/printingInformationChoice',
        '/EUMO2024/printingInformationChoice': '/EUMO2024/printingMethodsGettingTimetable',
        '/EUMO2024/printingMethodsGettingTimetable': '/EUMO2024/printingScanQRcode',
        '/EUMO2024/printingScanQRcode': '/EUMO2024/homepage',


        // use cas paiement d'une amende
        '/EUMO2024/identificationMenu': '/EUMO2024/scanQrCode',
        '/EUMO2024/scanQrCode': '/EUMO2024/identificationValidation',
        '/EUMO2024/identificationValidation': '/EUMO2024/informationSummary',
        '/EUMO2024/informationSummary': '/EUMO2024/paymentChoice',
        '/EUMO2024/thanksPaymentReport': '/EUMO2024/homepage',

        '/EUMO2024/waitingScreenPrinting': '/EUMO2024/homepage',
    };


    private moovHopPreviousRouterDict: any = {

    };

    private fcMoovHopRouterDict: any = {

    }
    previewImageScanId: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    previewImageProfile: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    nameUser: string = "";
    idUserToCheck: string = "";
    errorFace: boolean = false;
    errorScanId: boolean = false;
    previewImageScanIdA: string = "";
    previewImageScanIdB: string = "";
    previewImageScanIdADef: string = "";
    previewImageScanIdBDef: string = "";
    idChecks: string = "";
    referenceId: string = "";

    timeScanIdA: Date = new Date();
    timeScanIdB: Date = new Date();

    errorSaveIdCard: boolean = false;

    hrefSensitiveData: string = '';

    firstName: string = "";
    birthday: string = "";

    identityValidate: boolean = false;



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
            if (this.router.url !== '/EUMO2024/homepage') {
                this.navigateAfterDelay(0, "/EUMO2024/homepage");
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
            return "/EUMO2024/homepage";
        }
    };

    get previousRoute() {
        return this.moovHopPreviousRouterDict[this.router.url];
    };


    htmlReceiptContent: string = '';

}