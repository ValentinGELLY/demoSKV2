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
        "/identity-validation": "/scan-documento",
        "/information-consent": "/identity-validation",
        "/form-personal-information": "/information-consent",
        "/legal-condition": "/form-personal-information",
        "/payment": "/legal-condition",
        "/welcome": "/payment",
    };

    scanVisited: number = 1;



    constructor(private router: Router, private route: ActivatedRoute) {}

    navigateToHome() {
        this.router.navigate(["/home"]);
    }

    navigateBack(activeRoute:string) {
        this.router.navigate([this.routesBackwards[activeRoute]]);
    }

}
