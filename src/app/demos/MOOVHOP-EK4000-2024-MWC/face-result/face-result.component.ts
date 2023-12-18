import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../moovhop.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-face-result',
  templateUrl: './face-result.component.html',
  styleUrls: ['./face-result.component.scss']
})
export class FaceResultComponent implements OnInit {


  constructor(private moovhopService: MoovhopService, private router: Router, private http: HttpClient) { }
  isScanFinished: boolean = false;

  previewImageScanIdA = this.moovhopService.previewImageScanIdA;
  previewImageScanIdB = this.moovhopService.previewImageScanIdB;
  previewImageProfile = this.moovhopService.previewImageProfile;

  scanVisited = this.moovhopService.scanVisited;

  ngOnInit() {
    this.isScanFinished = this.moovhopService.isScanFinished;
    document.getElementById("confirmButton")!.addEventListener("click", () => {
    });
    if(this.moovhopService.scanVisited === 2){
      
    }
    else if (this.moovhopService.scanVisited === 3) {
      document.getElementById("capture")!.style.setProperty("clip", "rect(250px, auto, auto, auto)");
    }
  }
/*
  resetVisits() {
    this.moovhopService.scanVisited -= 1;
    this.router.navigate(["/camera-identification"]);
  }

  navigateTo(arg0: string) {
    this.router.navigate([arg0]);
  }

  addFaceUser() {
    const url = `https://emea.identityx-cloud.com/ipmfrance/IdentityXServices/rest/v1/users/${this.moovhopService.idUserToCheck}/face/samples`;
  
    // Ajoutez des en-têtes personnalisés si nécessaire
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=='
        // ... autres en-têtes nécessaires ...
      })
    };
  
    const payload = {
      "data": this.moovhopService.previewImageProfile.replace("data:image/png;base64, ", ""),
      "format": "JPG"
    };
  
    this.http.post(url, payload, httpOptions)
      .subscribe((data: any) => {
        if (data.httpStatus === 400) {
          console.error("error");
          document.getElementById("error")!.style.setProperty("display", "block");
        } else if (data.items.usable == false) {
          document.getElementById("too_far")!.style.setProperty("display", "block");
          setTimeout(() => {
            this.router.navigate(['/camera-identification']);
          }, 5000);
        } else {
          console.log("success add face");
          console.log(data);
          this.moovhopService.idUserToCheck = data.id;
          this.moovhopService.scanVisited++;
          this.createIdCheck();
          this.router.navigate(['/camera-identification']);
        }
      }, error => {
        console.error('Error:', error);
      });
  }


  createIdCheck(nbTry: number = 1) {
    const url = `https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/${this.moovhopService.idUserToCheck}/idChecks`;
  
    // Ajoutez des en-têtes personnalisés si nécessaire
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=='
        // ... autres en-têtes nécessaires ...
      })
    };
  
    const payload = {
      "referenceId": "ci-" + nbTry,
    };
  
    this.http.post(url, payload, httpOptions)
      .subscribe((data: any) => {
        if (data.httpStatus === 409) {
          console.error("error");
        } else {
          console.log("success add face");
          console.log(data);
          console.log(data.id);
          console.log(data.referenceId);
          this.moovhopService.idChecks = data.id;
          this.moovhopService.referenceId = data.referenceId;
        }
      }, error => {
        console.error('Error:', error);
      });
  }

  addScanId() {
    const url = `https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/${this.moovhopService.idUserToCheck}/idChecks/${this.moovhopService.idChecks}/documents?isAsync=false`;
  
    // Ajoutez des en-têtes personnalisés si nécessaire
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=='
        // ... autres en-têtes nécessaires ...
      })
    };
  
    const payload = {
      "captured": this.moovhopService.timeScanIdA.toISOString(),
      "clientCapture": {
        "images": [
          {
            "captured": this.moovhopService.timeScanIdA.toISOString(),
            "sensitiveData": {
              "imageFormat": "JPG",
              "value": this.moovhopService.previewImageScanIdA.replace("data:image/png;base64, ", "")
            },
            "subtype": "PROCESSED",
            "type": "FRONT"
          },
          {
            "captured": this.moovhopService.timeScanIdB.toISOString(),
            "sensitiveData": {
              "imageFormat": "JPG",
              "value": this.moovhopService.previewImageScanIdB.replace("data:image/png;base64, ", "")
            },
            "subtype": "PROCESSED",
            "type": "BACK"
          }
        ]
      }
    };
  
    this.http.post(url, payload, httpOptions)
      .subscribe((data: any) => {
        if (data.httpStatus === 404) {
          console.error(data.message);
          document.getElementById("error")!.style.setProperty("display", "block");
        } else {
          console.log("success add id Card");
          console.log(data);
          this.moovhopService.idUserToCheck = data.id;
          this.router.navigate(['/check-validation']);
        }
      }, error => {
        console.error('Error:', error);
      });
  }

  */

/*

  fetch method


  addFaceUser() {
      fetch("https://emea.identityx-cloud.com/ipmfrance/IdentityXServices/rest/v1//IdentityXServices/rest/v1/users/" + this.moovhopService.idUserToCheck + "/face/samples", {
        method: "POST",
        body: JSON.stringify({
          "data": this.moovhopService.previewImageProfile.replace("data:image/png;base64, ", ""),
          "format": "JPG"
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization":"Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.httpStatus === 400) {
            console.error("error");
            document.getElementById("error")!.style.setProperty("display", "block");
          } else if(data.items.usable==false){
            document.getElementById("too_far")!.style.setProperty("display", "block");
            setTimeout(() => {
              this.router.navigate(['/camera-identification']);
            }, 5000);
          }else{
            console.log("success add face");
            console.log(data)
            this.moovhopService.idUserToCheck = data.id;
            this.moovhopService.scanVisited++;
            this.createIdCheck();
            this.router.navigate(['/camera-identification']);
          }
        })
  }


  createIdCheck(nbTry: number = 1) {

    fetch("https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/" + this.moovhopService.idUserToCheck + "/idChecks", {
      method: "POST",
      body: JSON.stringify({
        "referenceId": "ci-" + nbTry,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization":"Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
      }
      
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.httpStatus === 409) {
          console.error("error");

        } else {
          console.log("success add face");
          console.log(data);
          console.log(data.id);
          console.log(data.referenceId);
          this.moovhopService.idChecks = data.id;
          this.moovhopService.referenceId = data.referenceId;
        }
      })
  }


  addScanIdA() {
    console.log(this.moovhopService.previewImageScanIdA.replace("data:image/png;base64, ", ""));
    console.log(this.moovhopService.previewImageScanIdB.replace("data:image/png;base64, ", ""));
    console.log( this.moovhopService.timeScanIdA.toISOString());
    
    
    fetch("https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/" + this.moovhopService.idUserToCheck + "/idChecks/"+this.moovhopService.idChecks+"/documents?isAsync=false", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization":"Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
      },
      body: JSON.stringify({
        "captured": this.moovhopService.timeScanIdA.toISOString(),
        "clientCapture": {
          "images": [
            {
              "captured": this.moovhopService.timeScanIdA.toISOString(),
              "sensitiveData": {
                "imageFormat": "JPG",
                "value": this.moovhopService.previewImageScanIdA.replace("data:image/png;base64, ", "")
              },
              "subtype": "PROCESSED",
              "type": "FRONT"
            },
            {
              "captured": this.moovhopService.timeScanIdB.toISOString(),
              "sensitiveData": {
                "imageFormat": "JPG",
                "value": this.moovhopService.previewImageScanIdB.replace("data:image/png;base64, ", "")
              },
              "subtype": "PROCESSED",
              "type": "BACK"
            }
          ]
        }
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.httpStatus === 404) {
          console.error(data.message);
          document.getElementById("error")!.style.setProperty("display", "block");
        } else {
          console.log("success add id Card");
          console.log(data)
          this.moovhopService.idUserToCheck = data.id;
          this.router.navigate(['/check-validation']);
        }
      })


  }*/

  

}