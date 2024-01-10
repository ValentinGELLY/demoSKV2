import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AppService as telefonicaService} from '../telefonica.service';
import { SoftKioskService } from 'src/app/softkiosk.service';
import { GenericComponent } from 'src/app/demos/generic/generic.component';

@Component({
  selector: 'app-identity-validation',
  templateUrl: './identity-validation.component.html',
  styleUrls: ['./identity-validation.component.scss', '../telefonica.component.scss']
})
export class IdentityValidationComponent extends GenericComponent {

  constructor(private router: Router, private service: telefonicaService, skService: SoftKioskService) {
    super(skService);
   }

  override ngOnInit() {
    setTimeout(() => {
      if(this.router.url == '/identity-validation')
      this.router.navigate(['/information-consent']);
    }, 5000);
  }

  checkValidation() {
    fetch("https://kwvwj-8080.csb.app/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/"+this.service.idUserToCheck+"/idchecks/"+this.service.idChecks+"/evaluation?evaluationPolicyName=policy-2",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization":"Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ==",
      }
    })
      
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.results.items[0].result !== "MATCH") {
          console.log(data.results.items[0].result)
          document.getElementById("countdownAnimation")!.style.setProperty("display", "none");
          console.error("error Identité non validée");
          document.getElementById("verif")!.innerHTML = "Identité non validée, veuiller recommencer";
          document.getElementById("verif")!.style.setProperty("color", "red");
          document.getElementById("retry")!.style.setProperty("display", "none");
        } else {
          document.getElementById("verif")!.innerHTML = " Identité validée";
          //document.getElementById("informations")!.innerHTML = " Bienvenue : "+data.summary[data.summary.lenght-1].value;
          document.getElementById("retry")!.style.setProperty("display", "block");
          if(this.router.url === "/check-validation") {
            setTimeout(() => {
              this.router.navigate(['/homepageEK4000MWC']);
            } 
            , 7500);
          }
        } 
        
      })
      .catch((error) => { 
        console.log('error: ', error);
      })
    }


}
