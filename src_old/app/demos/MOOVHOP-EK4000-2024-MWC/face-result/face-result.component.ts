import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MoovhopService } from '../moovhop.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SoftKioskService } from 'src/app/softkiosk.service';
import { GenericComponent } from '../../generic/generic.component';
import { IMAGE_LOADER } from '@angular/common';

@Component({
  selector: 'app-face-result',
  templateUrl: './face-result.component.html',
  styleUrls: ['./face-result.component.scss']
})
export class FaceResultComponent extends GenericComponent implements OnInit{


  constructor(private moovhopService: MoovhopService, private router: Router, skService : SoftKioskService) {
    super(skService);
  }
  isScanFinished: boolean = false;


  nbTrySaveIdCard: number = 0;

  previewImageScanIdA = this.moovhopService.previewImageScanIdA;
  previewImageScanIdB = this.moovhopService.previewImageScanIdB;
  previewImageProfile = this.moovhopService.previewImageProfile;
  imgScanIdA = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
  imgScanIdB = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";

  scanVisited = this.moovhopService.scanVisited;


  override ngOnInit() {    
    this.skService.addEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)

    this.isScanFinished = this.moovhopService.isScanFinished;


    document.getElementById("restartButton")!.addEventListener("click", () => {
      this.resetVisits();
    });
    this.scanVisited = this.moovhopService.scanVisited;
    console.log('this.scanVisited : ', this.moovhopService.scanVisited);

    if (this.moovhopService.scanVisited == 1) {
      document.getElementById("previewA")!.style.setProperty("display", "block", "important");
      document.getElementById("previewB")!.style.setProperty("display", "none", "important");
      document.getElementById("previewC")!.style.setProperty("display", "none", "important");
    } else if (this.moovhopService.scanVisited == 2) {
      document.getElementById("previewA")!.style.setProperty("display", "none", "important");
      document.getElementById("previewB")!.style.setProperty("display", "block", "important");
      document.getElementById("previewC")!.style.setProperty("display", "none", "important");
    }
    else if (this.moovhopService.scanVisited == 3) {
      document.getElementById("previewA")!.style.setProperty("display", "none", "important");
      document.getElementById("previewB")!.style.setProperty("display", "none", "important");
      document.getElementById("previewC")!.style.setProperty("display", "block", "important");
    }


    if (this.scanVisited === 2) {
      this.skService.captureImageDocument();
    }
    else if (this.scanVisited === 3) {
      this.skService.captureImageDocument();
    }


    document.getElementById("confirmButton")!.addEventListener("click", () => {
      if (this.scanVisited === 1) {
        this.createIdCheck();

      } else if (this.scanVisited === 2) {
        console.log("scanVisited = 2");

        this.router.navigate(["/cameraIdentification"]);
      }
      else if (this.scanVisited === 3) {
        console.log("scanVisited = 3");
        this.addScanIdA();
      }

    });

  }


  override onImageDocumentCapture = (e: any) => {
    switch (e.data.dataType) {
      case 'ImageCaptured':
        if (this.moovhopService.scanVisited === 2) {
          this.moovhopService.previewImageScanIdADef= 'data:image/png;base64, '  + this.skService.lastCaptureImageRaw();
          this.imgScanIdA = this.moovhopService.previewImageScanIdADef;
          document.getElementById("images")!.innerHTML = "<img src='" + this.moovhopService.previewImageScanIdADef + "' alt='image' style='width: 100%; height: 100%;'>";
          console.log("previewImageScanIdADef : ", this.moovhopService.previewImageScanIdADef);
        }else if (this.moovhopService.scanVisited === 3) {
          this.moovhopService.previewImageScanIdBDef = 'data:image/png;base64, '  + this.skService.lastCaptureImageRaw();
          this.imgScanIdB = this.moovhopService.previewImageScanIdBDef;
          document.getElementById("images")!.innerHTML = "<img src='" + this.moovhopService.previewImageScanIdBDef + "' alt='image' style='width: 100%; height: 100%;'>";
          console.log("previewImageScanIdBDef : ", this.moovhopService.previewImageScanIdBDef);
        }
        break;
      case 'ImageCaptureError':
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  }

  resetVisits() {
    this.moovhopService.scanVisited -= 1;
    this.router.navigate(["/cameraIdentification"]);
    this.moovhopService.isScanFinished = false;
  }

  navigateTo(arg0: string) {
    this.router.navigate([arg0]);
  }


  addFaceUser() {
    fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/IdentityXServices/rest/v1/users/"+this.moovhopService.idUserToCheck+"/face/samples", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
      },
      body: JSON.stringify({
        "data": this.moovhopService.previewImageProfile.replace("data:image/png;base64, ", ""),
        "format": "JPG"
      })
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.httpStatus === 400) {
          console.error("error");
          document.getElementById("error")!.style.setProperty("display","block");
        }else if (data.items[0].usable == false) {
          document.getElementById("too_far")!.style.setProperty("display","block");
          setTimeout(() => {
            if(this.router.url == "/faceResult"){
              this.moovhopService.scanVisited = 0; 
              this.router.navigate(['/cameraIdentification']);
            }
          }, 5000);
        } else {
          console.log("success add face");
          this.router.navigate(['/cameraIdentification']);
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      })
  }


  createIdCheck(nbTry: number = 1) {
    let referenceId = "ci-" + nbTry;

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ==");
    var raw = JSON.stringify({
      "referenceId": referenceId
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow' as RequestRedirect | undefined
    };

    fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/"+this.moovhopService.idUserToCheck+"/idchecks", requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.httpStatus == "409") {
          console.log(nbTry);
          let nbTry2 = nbTry + 1;
          this.createIdCheck(nbTry2);
        }else{
          console.log("success add face");
          this.moovhopService.idChecks = data.id;
          this.moovhopService.referenceId = data.referenceId;
          this.addFaceUser();
        }
      })
      .catch(error => {
        console.log('error', error);
        let nbTry2 = nbTry + 1;
        this.createIdCheck(nbTry2);
      });
  }


  addScanIdA() {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ==");

    var raw = JSON.stringify({
      "captured": this.moovhopService.timeScanIdA.toISOString(),
      "clientCapture": {
        "images": [
          {
            "captured": this.moovhopService.timeScanIdA.toISOString(),
            "sensitiveData": {
              "imageFormat": "JPG",
              "value": this.moovhopService.previewImageScanIdADef.replace("data:image/png;base64, ", "")
            },
            "subtype": "PROCESSED",
            "type": "FRONT"
          },
          {
            "captured": this.moovhopService.timeScanIdA.toISOString(),
            "sensitiveData": {
              "imageFormat": "JPG",
              "value": this.moovhopService.previewImageScanIdBDef.replace("data:image/png;base64, ", "")
            },
            "subtype": "PROCESSED",
            "type": "BACK"
          }
        ]
      }
    });

    let requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/"+this.moovhopService.idUserToCheck+"/idchecks/" + this.moovhopService.idChecks + "/documents?isAsync=false", requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.processingStatus == "FAILED") {
          this.moovhopService.scanVisited = 1;
          console.log("errer de sauvegarde de la carte d'identité");
          console.log("représenter votre carte");
          document.getElementById("error")!.style.setProperty("display", "block");
          this.moovhopService.scanVisited = 1;
          this.moovhopService.errorSaveIdCard = true;
          setTimeout(() => {
            this.router.navigate(['/cameraIdentification']);
          }, 5000);
        } else {
          console.log("add id card");
          this.router.navigate(['/checkValidation']);
        }

      })
      .catch(error => console.log('error', error));

  }

  ngOnDestroy() {
    this.skService.removeEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)
  }

}