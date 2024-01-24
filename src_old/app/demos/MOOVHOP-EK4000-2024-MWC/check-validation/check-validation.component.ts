import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../moovhop.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-check-validation',
  templateUrl: './check-validation.component.html',
  styleUrls: ['./check-validation.component.scss']
})
export class CheckValidationComponent implements OnInit {
  
  name: string = this.moovhopService.nameUserToCheck;
  firstname: string = this.moovhopService.firstnameUserToCheck;
  photoId: string = this.moovhopService.previewImageProfile;
  scanIdA: string = this.moovhopService.previewImageScanIdADef;
  scanIdB: string = this.moovhopService.previewImageScanIdBDef;

  constructor(private moovhopService : MoovhopService, private router : Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.checkValidation();
    document.getElementById("retry")!.addEventListener("click", () => {
      this.moovhopService.retry = true;
      this.moovhopService.scanVisited = 0;
      this.router.navigate(['/cameraIdentification']);
    });

  }

  checkValidation() {
    fetch("https://zwk8o88.15.237.60.0.sslip.io/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/"+this.moovhopService.idUserToCheck+"/idchecks/"+this.moovhopService.idChecks+"/evaluation?evaluationPolicyName=policy-2",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization":"Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ==",
      }
    } )
      
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
