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

  constructor(private moovhopService : MoovhopService, private router : Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.checkValidation();
  }

  checkValidation() {
    fetch("https://kwvwj-8080.csb.app/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/QTAzoE_c-LUDLnaSSWzFYs0OfQ/idchecks/"+this.moovhopService.idChecks+"/evaluation?evaluationPolicyName=policy-2",
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
          console.error("error Identité non validée");
          document.getElementById("verif")!.innerHTML = "Identité non validée";
          
        } else {
          document.getElementById("verif")!.innerHTML = " Identité validée";
          this.getAllInformation();
        } 
      })
      .catch((error) => { 
        console.log('error: ', error);
      })
    }

    getAllInformation() {
      fetch("https://kwvwj-8080.csb.app/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/QTAzoE_c-LUDLnaSSWzFYs0OfQ/idchecks/"+this.moovhopService.idChecks+"/documents/summary",
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
      .catch((error) => { 
        console.log('error: ', error);
      })
    }
    ngOnDestroy() {
      this.moovhopService.nameUserToCheck = "";
      this.moovhopService.firstnameUserToCheck = "";
      this.moovhopService.idUserToCheck = "";
      this.moovhopService.idChecks = "";
      this.moovhopService.scanVisited = 0;
    }
}
