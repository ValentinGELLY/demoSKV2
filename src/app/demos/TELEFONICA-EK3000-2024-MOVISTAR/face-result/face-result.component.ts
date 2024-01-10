import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AppService as telefonicaService} from '../telefonica.service';
import { SoftKioskService } from 'src/app/softkiosk.service';
import { GenericComponent } from 'src/app/demos/generic/generic.component';

@Component({
  selector: 'app-face-result',
  templateUrl: './face-result.component.html',
  styleUrls: ['./face-result.component.scss','../telefonica.component.scss']
})
export class FaceResultComponent  extends GenericComponent{

  profileImage: string = this.telefonicaService.previewImageProfile;
  
  constructor(private router: Router, private telefonicaService:telefonicaService, skService: SoftKioskService) {
    super(skService);
   }
  
  scanVisited: number = this.telefonicaService.scanVisited;

  resetScan(){
    if(this.scanVisited == 1){
      this.router.navigate(["/face-capture"]);
    }else{
      this.router.navigate(["/scan-documento"]);
      this.telefonicaService.scanVisited -= 1;
    }
  }


  previewImageScanIdA = this.telefonicaService.previewImageScanIdA;
  previewImageScanIdB = this.telefonicaService.previewImageScanIdB;
  previewImageProfile = this.telefonicaService.previewImageProfile;
  imgScanIdA = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
  imgScanIdB = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";

  override ngOnInit() {    
    this.skService.addEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)

    document.getElementById("restartButton")!.addEventListener("click", () => {
      this.resetVisits();
    });
    this.scanVisited = this.telefonicaService.scanVisited;

    if (this.scanVisited === 2 || this.scanVisited === 3) {
      this.skService.captureImageDocument();
    }
    

    document.getElementById("confirmButton")!.addEventListener("click", () => {
      if (this.scanVisited === 1) {
        this.createIdCheck();

      } else if (this.scanVisited === 2) {
        console.log("scanVisited = 2");

        this.router.navigate(["/scan-document"]);
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
        if (this.telefonicaService.scanVisited === 2) {
          this.telefonicaService.previewImageScanIdADef= 'data:image/png;base64, '  + this.skService.lastCaptureImageRaw();
          this.imgScanIdA = this.telefonicaService.previewImageScanIdADef;
          //document.getElementById("images")!.innerHTML = "<img src='" + this.telefonicaService.previewImageScanIdADef + "' alt='image' style='width: 100%; height: 100%;'>";
          //console.log("previewImageScanIdADef : ", this.telefonicaService.previewImageScanIdADef);
        }else if (this.telefonicaService.scanVisited === 3) {
          this.telefonicaService.previewImageScanIdBDef = 'data:image/png;base64, '  + this.skService.lastCaptureImageRaw();
          this.imgScanIdB = this.telefonicaService.previewImageScanIdBDef;
          //document.getElementById("images")!.innerHTML = "<img src='" + this.telefonicaService.previewImageScanIdBDef + "' alt='image' style='width: 100%; height: 100%;'>";
          //console.log("previewImageScanIdBDef : ", this.telefonicaService.previewImageScanIdBDef);
        }
        break;
      case 'ImageCaptureError':
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  }

  resetVisits() {
    this.telefonicaService.scanVisited -= 1;
    this.router.navigate(["/scan-documento"]);
  }

  navigateTo(arg0: string) {
    this.router.navigate([arg0]);
  }


  addFaceUser() {
    fetch("https://kwvwj-8080.csb.app/https://emea.identityx-cloud.com/ipmfrance/IdentityXServices/rest/v1/users/"+this.telefonicaService.idUserToCheck+"/face/samples", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
      },
      body: JSON.stringify({
        "data": this.telefonicaService.previewImageProfile.replace("data:image/png;base64, ", ""),
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
            if(this.router.url == "/face-result"){
              this.telefonicaService.scanVisited = 0; 
              this.router.navigate(['/scan-documento']);
            }
          }, 5000);
        } else {
          console.log("success add face");
          this.router.navigate(['/scan-documento']);
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      })
  }


  createIdCheck(nbTry: number = 1) {
    let referenceId = new Date().toJSON();

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

    fetch("https://kwvwj-8080.csb.app/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/"+this.telefonicaService.idUserToCheck+"/idchecks", requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.httpStatus == "409") {
          console.log(nbTry);
          let nbTry2 = nbTry + 1;
          this.createIdCheck(nbTry2);
        }else{
          console.log("create id check");
          this.telefonicaService.idChecks = data.id;
          this.telefonicaService.referenceId = referenceId;
          this.addFaceUser();
        }
      })
      .catch(error => {
        console.error('error : ', error);
        let nbTry2 = nbTry + 1;
        this.createIdCheck(nbTry2);
      });
  }


  addScanIdA() {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ==");

    var raw = JSON.stringify({
      "captured": this.telefonicaService.timeScanIdA.toISOString(),
      "clientCapture": {
        "images": [
          {
            "captured": this.telefonicaService.timeScanIdA.toISOString(),
            "sensitiveData": {
              "imageFormat": "JPG",
              "value": this.telefonicaService.previewImageScanIdADef.replace("data:image/png;base64, ", "")
            },
            "subtype": "PROCESSED",
            "type": "FRONT"
          },
          {
            "captured": this.telefonicaService.timeScanIdA.toISOString(),
            "sensitiveData": {
              "imageFormat": "JPG",
              "value": this.telefonicaService.previewImageScanIdBDef.replace("data:image/png;base64, ", "")
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

    fetch("https://kwvwj-8080.csb.app/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/"+this.telefonicaService.idUserToCheck+"/idchecks/" + this.telefonicaService.idChecks + "/documents?isAsync=false", requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.processingStatus == "FAILED") {
          this.telefonicaService.scanVisited = 1;
          console.log("errer de sauvegarde de la carte d'identité");
          console.log("représenter votre carte");
          document.getElementById("error")!.style.setProperty("display", "block");
          this.telefonicaService.scanVisited = 1;
          this.telefonicaService.errorSaveIdCard = true;
          setTimeout(() => {
            this.router.navigate(['/scan-documento']);
          }, 5000);
        } else {
          console.log("add id card");
          this.router.navigate(['/identity-validation']);
        }

      })
      .catch(error => console.log('error', error));
  }

  ngOnDestroy() {
    this.skService.removeEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)
  }





}
