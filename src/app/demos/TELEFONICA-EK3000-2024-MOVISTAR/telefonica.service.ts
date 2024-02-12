import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
    providedIn: "root"
})

export class AppService { 

    routesBackwards: any = {
        "/ES/fullPrepayment": "/ES/prepaidTariffs",
        "/ES/prepaidTariffs": "/ES/homePageTelefonica",
        "/ES/wantContract": "/ES/fullPrepayment",
        "/ES/homeCheckIdentity": "/ES/wantContract",
        "/ES/faceResult": "/ES/homeCheckIdentity",
        "/ES/registryDocument": "/ES/homeCheckIdentity",
        "/ES/scanDocumento": "/ES/registryDocument",
        "/ES/informationConsent": "/ES/registryDocument",
        "/ES/formPersonalInformation": "/ES/informationConsent",
        "/ES/legalCondition": "/ES/formPersonalInformation",
        "/ES/payment": "/ES/legalCondition",
        "/ES/welcome": "/ES/payment",
        "/EN/fullPrepayment": "/EN/prepaidTariffs",
        "/EN/prepaidTariffs": "/EN/homePageTelefonica",
        "/EN/wantContract": "/EN/fullPrepayment",
        "/EN/homeCheckIdentity": "/EN/wantContract",
        "/EN/faceResult": "/EN/homeCheckIdentity",
        "/EN/registryDocument": "/EN/faceResult",
        "/EN/scanDocumento": "/EN/registryDocument",
        "/EN/informationConsent": "/EN/registryDocument",
        "/EN/formPersonalInformation": "/EN/informationConsent",
        "/EN/legalCondition": "/EN/formPersonalInformation",
        "/EN/payment": "/EN/legalCondition",
        "/EN/welcome": "/EN/payment",
    };

    language: string = "ES";

    scanVisited: number = 1;
    previewImageProfile: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";

    previewImageScanIdA: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    previewImageScanIdB: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    timeScanIdA: Date = new Date();
    timeScanIdB: Date = new Date();
    previewImageScanIdBDef: string = "";
    previewImageScanIdADef: string = "";
    idUserToCheck: string = "QTAz_qk2xElTqJ9ZpKrfsaKymg";
    idChecks: string = "";
    referenceId: string = "";
    errorSaveIdCard: boolean = false;
    hrefSensitiveData: string = "";
    userName: string = "";
    adress: string = "";
    userFirstName: string = "";
    nationality: string = "";
    userSecondName: string = "";
    numDocument: string = "";
    postalCode: string = "";
    documentoSelected: string = "";
    errorFace: boolean = false;
    errorScanId: boolean = false;
    eSIM: string = "";
    identityValidate: boolean = false;


    constructor(private router: Router, private route: ActivatedRoute) { }

    navigateToHome() {
        this.router.navigate(["/paginaPrincipal"]);
    }

    navigateBack(activeRoute: string) {
        this.router.navigate([this.routesBackwards[activeRoute]]);
    }

}
