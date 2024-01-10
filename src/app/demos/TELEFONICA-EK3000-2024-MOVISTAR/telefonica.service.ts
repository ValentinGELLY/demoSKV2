import { Injectable } from "@angular/core";
import { Router, ActivatedRoute} from "@angular/router";

@Injectable({
    providedIn: "root"
    })

export class AppService {

    routesBackwards: any = {
        "/full-prepayment": "/pagina-principal",
        "/prepaid-tariffs": "/full-prepayment",
        "/want-contract": "/prepaid-tariffs",
        "/home-check-identity": "/want-contract",
        "/face-result": "/home-check-identity",
        "/registry-document": "/face-result",
        "/scan-documento": "/registry-document",
        "/identity-validation": "/registry-document",
        "/information-consent": "/identity-validation",
        "/form-personal-information": "/information-consent",
        "/legal-condition": "/form-personal-information",
        "/payment": "/legal-condition",
        "/welcome": "/payment",
    };

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


    constructor(private router: Router, private route: ActivatedRoute) {}

    navigateToHome() {
        this.router.navigate(["/home"]);
    }

    navigateBack(activeRoute:string) {
        this.router.navigate([this.routesBackwards[activeRoute]]);
    }

}
