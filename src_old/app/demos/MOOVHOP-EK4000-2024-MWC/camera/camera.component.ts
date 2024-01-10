import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MoovhopService } from '../moovhop.service';
import { Router } from '@angular/router';
import { GenericComponent } from 'src/app/demos/generic/generic.component';
import { SoftKioskService } from 'src/app/softkiosk.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent extends GenericComponent implements OnInit, AfterViewInit {

  constructor(private moovhopService: MoovhopService, private router: Router, skService: SoftKioskService) {
    super(skService);
  }
  interval: any = null;
  identityPicture: any = this.moovhopService.identityPicture;
  isScanFinished: boolean = false;

  previewImageScanIdA: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
  previewImageScanIdB: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
  previewImageProfile: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";

  errorScanIdCard: boolean = this.moovhopService.errorSaveIdCard;

  countdown: number = 10;
  imageCapture: string = "";
  isImageCaptured: boolean = false;

  scanVisited: number = 0;

  override ngOnInit(): void {
    this.scanVisited = this.moovhopService.scanVisited;
    this.moovhopService.scanVisited++;
    this.scanVisited = this.moovhopService.scanVisited;

    let _this = this;
    // TODO faire appel à un lightdelay: suivant le type de lecteur de document qu'on a
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant MoovHopBuyUseCaseScanNewerIdentityCardComponent");
    
 
  }



  ngAfterViewInit(): void {

    /**
     * Déclenchement de l'appel à DocumentScanning.preview()
      */
    let __this = this;
    if ((this.scanVisited == 2 || this.scanVisited == 3) && this.router.url === "/cameraIdentification") {
      console.log("scanVisited : ", this.scanVisited);

      __this.skService.addEventListener("DocumentScanning", "previewStart", this.onPreview);
      __this.skService.addEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture);
      __this.skService.addEventListener("DocumentScanning", "previewStop", this.onPreview);

      // Démarrage de la prévisualisation
      __this.skService.startDocumentPreview();

      // décompte du timer
      __this.timeoutScanner();
    } else if (this.scanVisited === 1 && this.router.url === "/cameraIdentification") {
      let __this = this;
      __this.skService.addEventListener("CameraShooting", "previewStart", this.onPreview)
      __this.skService.startCameraPreview();
      __this.timeoutCamera();
    }

  }

  override onPreview = (e: any) => {

    switch (e.data.dataType) {
      case 'PreviewStarted':
        this.skService.addEventApplication("demoSKV2", "Preview du document réussie");
        // Ouverture d'un WebSocket pour récupérer les images de prévisualisation
        let previewWebsocket = new WebSocket(e.data.serverUrl);
        // Écoute de l'événement de réception d'informations par le WebSocket
        previewWebsocket.onmessage = (preview) => {
          // appel à la fonction de traitement de flux vidéo
          this.previewImageUpdate(preview.data);
        };

        // Écoute de l'événement de fermeture du WebSocket
        previewWebsocket.onclose = function () {
        };
        break;
      case 'PreviewStopped':
        console.log("PreviewStopped");
        this.skService.removeEventListener("DocumentScanning",'previewStop', this.onPreview);
        this.skService.addEventApplication("demoSKV2", "arrêt prévisualisation du document");
        this.skService.addEventApplication("demoSKV2", "capture du document");

        break;


      case "PreviewStartError":
        /**
         * Evènement d'échec du démarrage de la prévisualisation
         * Champs associés:
         * @param {("None" | "Disconnected" | "SignalingError" | "SignalingState")} e.data.code - Erreur sur demande de démarrage de prévisualisation
         * @param {string} e.data.description - description erreur
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        switch (e.data.code) {
          case "None":
            break;
          case "Disconnected":
            break;
          case "SignalingError":
            break;
          case "SignalingState":
            break;
        }
        break;
      default:
        console.log(e.data.dataType);
        
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  }

  override onImageDocumentCapture = (e: any) => {
    switch (e.data.dataType) {
      case 'ImageCaptured':
        this.isImageCaptured = true;
        if (this.router.url === '/cameraIdentification') {
          if (this.router.url === "/cameraIdentification" && this.moovhopService.scanVisited === 1) {
            setTimeout(() => {
              this.moovhopService.previewImageProfile = this.skService.lastCaptureImageRaw();
            }, 500);
          } else if (this.moovhopService.scanVisited === 2 && this.router.url === "/cameraIdentification") {
            setTimeout(() => {
              console.log("capture document A");
              this.moovhopService.timeScanIdA = new Date();
              this.moovhopService.previewImageScanIdADef = this.skService.lastCaptureImageRaw();
              console.log("previewImageScanIdADef : ", this.moovhopService.previewImageScanIdADef);
            }, 500);
            
          } else if (this.moovhopService.scanVisited === 3 && this.router.url === "/cameraIdentification") {
            setTimeout(() => {
              console.log("capture document B");
              this.moovhopService.timeScanIdB = new Date();
              this.moovhopService.previewImageScanIdBDef = this.skService.lastCaptureImageRaw();
              console.log("previewImageScanIdBDef : ", this.moovhopService.previewImageScanIdBDef);
            }, 500);
          }
        }
        break;
      case 'ImageCaptureError':
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
    
  }

  previewImageUpdate = (preview: any): void => {
    if (this.moovhopService.scanVisited === 1 && this.router.url === "/cameraIdentification") {
      this.previewImageProfile = 'data:image/png;base64, ' + preview;
      this.moovhopService.previewImageProfile = this.previewImageProfile;
    } else if (this.moovhopService.scanVisited === 2 && this.router.url === "/cameraIdentification") {
      this.previewImageScanIdA = 'data:image/png;base64, ' + preview;
      this.moovhopService.previewImageScanIdA = this.previewImageScanIdA;
    } else if (this.moovhopService.scanVisited === 3 && this.router.url === "/cameraIdentification") {
      this.previewImageScanIdB = 'data:image/png;base64, ' + preview;
      this.moovhopService.previewImageScanIdB = this.previewImageScanIdB;
    }
  }
  interval2: any = null;
  timeoutScanner = () => {
    console.log("timeoutScanner");

    this.interval2 = setInterval(() => {
      if (this.countdown != 0) {
        if (this.countdown) {
          this.countdown--;
        }

      } else {
        if (this.router.url === "/cameraIdentification") {
          this.skService.removeEventListener('DocumentScanning', 'previewStart', this.onPreview);
          this.skService.stopDocumentPreview();
          this.router.navigate(['/faceResult']);
          
          clearInterval(this.interval2);
        }
      }
    }
      , 1000);
  }

  interval3: any = null;

  timeoutCamera = () => {
    this.interval3 = setInterval(() => {
      if (this.countdown != 0) {
        if (this.countdown) {
          this.countdown--;
        }

      } else {
        if (this.router.url === "/cameraIdentification") {
          this.skService.removeEventListener('CameraShooting', 'previewStart', this.onPreviewStart);
          this.skService.stopCameraPreview();
          this.router.navigate(['/faceResult'])
          clearInterval(this.interval3);
        }
      }
    }
      , 1000);
  }


  ngOnDestroy(): void {
    let ___this = this;
    clearInterval(this.interval2);
    clearInterval(this.interval3);

    ___this.skService.removeEventListener("CameraShooting", "previewStart", this.onPreviewStart)
    ___this.skService.addEventListener("CameraShooting", "previewStop", this.onPreviewStop);
    ___this.skService.addEventApplication("demoSKV2", "fin de prévisualisation vidéo");
    ___this.skService.stopCameraPreview();
    ___this.skService.addEventApplication("demoSKV2", "fin de vie du composant MoovHopBuyUseCaseCameraComponent");
    ___this.skService.removeEventListener("DocumentScanning", "previewStart", this.onPreview);
    ___this.skService.removeEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)
    ___this.skService.removeEventListener("DocumentScanning", "previewStop", this.onPreview);
    ___this.skService.stopDocumentPreview();
  }
}
