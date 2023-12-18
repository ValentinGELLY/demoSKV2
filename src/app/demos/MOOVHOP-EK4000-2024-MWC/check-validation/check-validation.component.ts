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

  constructor(private moovhopService : MoovhopService, private router : Router, private http: HttpClient) { }

  ngOnInit(): void {
    //this.checkValidation();
    setTimeout(() => {
      this.router.navigate(['/homepageEK4000MWC']);
    } 
    , 7500);
  }
/*
  checkValidation() {
    const url = `https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/${this.moovhopService.idUserToCheck}/idchecks/${this.moovhopService.idChecks}/evaluation?evaluationPolicyName=policy-2`;
  
    // Ajoutez des en-têtes personnalisés si nécessaire
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=='
        // ... autres en-têtes nécessaires ...
      })
    };
  
    this.http.post(url, {}, httpOptions)
      .subscribe((data: any) => {
        if (data.results.items.result !== "MATCH") {
          console.error("error");
          document.getElementById("error")!.style.setProperty("display", "block");
        } else {
          document.getElementById("verifValidate")!.style.setProperty("display", "block");
          document.getElementById("informations")!.style.setProperty("display", "block");
  
          this.getAllInformation();
        }
      }, error => {
        console.error('Error:', error);
      });
  }

  getAllInformation() {
    const url = `${this.moovhopService.urlFetch}/DigitalOnBoardingServices/rest/v1/users/${this.moovhopService.idUserToCheck}/idchecks/${this.moovhopService.idChecks}/documents/summary`;
  
    // Ajoutez des en-têtes personnalisés si nécessaire
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=='
        // ... autres en-têtes nécessaires ...
      })
    };
  
    this.http.get(url, httpOptions)
      .subscribe((data: any) => {
        if (data.httpStatus == 404) {
          console.error("error");
          document.getElementById("error")!.style.setProperty("display", "block");
        } else {
          document.getElementById("informations")!.innerHTML = " Bienvenue : " + data.documentSummaries.fieldsSensitiveData["Surname And Given Names"].value;
          setTimeout(() => {
            this.router.navigate(['/homepageEK4000MWC']);
          }, 7500);
        }
      }, error => {
        console.error('Error:', error);
      });
  }
*/
  /*
  checkValidation() {
    fetch("https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/" + this.moovhopService.idUserToCheck + "/idchecks/"+this.moovhopService.idChecks+"/evaluation?evaluationPolicyName=policy-2",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization":"Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
      }
    } )
      
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.results.items.result !== "MATCH") {
          console.error("error");
          document.getElementById("error")!.style.setProperty("display", "block");
        } else {
          document.getElementById("verifValidate")!.style.setProperty("display", "block");
          document.getElementById("informations")!.style.setProperty("display", "block");

          this.getAllInformation();

        }
      })
    }

    getAllInformation() {
      fetch(this.moovhopService.urlFetch + "/DigitalOnBoardingServices/rest/v1/users/"+this.moovhopService.idUserToCheck+"/idchecks/"+this.moovhopService.idChecks+"/documents/summary",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization":"Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
        }
      }
      )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.httpStatus == 404) {
          console.error("error");
          document.getElementById("error")!.style.setProperty("display", "block");
        } else {
          document.getElementById("informations")!.innerHTML = " Bienvenue : "+data.documentSummaries.fieldsSensitiveData["Surname And Given Names"].value;
          setTimeout(() => {
            this.router.navigate(['/homepageEK4000MWC']);
          } 
          , 7500);
        }
      })
    }
*/
}
