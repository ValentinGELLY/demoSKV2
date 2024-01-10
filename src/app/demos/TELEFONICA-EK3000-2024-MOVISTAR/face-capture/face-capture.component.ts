import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService as telefonicaService  } from '../telefonica.service';
import { GenericComponent } from 'src/app/demos/generic/generic.component';
import { SoftKioskService } from 'src/app/softkiosk.service';


@Component({
  selector: 'app-face-capture',
  templateUrl: './face-capture.component.html',
  styleUrls: ['./face-capture.component.scss', '../telefonica.component.scss']
})
export class FaceCaptureComponent extends GenericComponent implements OnInit {
  countdown: any;
  previewImageProfile: string = this.service.previewImageProfile;

  constructor(private route: Router, private service: telefonicaService, skService: SoftKioskService) {
    super(skService);
   }

  override ngOnInit(): void {
    this.service.scanVisited=1;
    
  }

  resetScan(){
    this.service.scanVisited--;
    this.route.navigate(['/face-capture']);
  }

  ngAfterViewInit(): void {
    let __this = this;
    if (this.route.url === "/face-capture") {
      __this.skService.addEventListener("CameraShooting", "previewStart", this.onPreview)
      __this.skService.startCameraPreview();
      // décompte du timer
      __this.timeoutCamera();
    }
  }

  interval2: any = null;
  timeoutCamera = () => {
    this.countdown = 5;
    this.interval2 = setInterval(() => {
      if(this.countdown == 0 && this.route.url == '/face-capture' ) {
        if (this.route.url === "/face-capture") {
          this.skService.removeEventListener('CameraShooting', 'previewStart', this.onPreview);
          this.skService.stopCameraPreview();
          this.route.navigate(['/face-result'])
          clearInterval(this.interval2);
        }
      }else{
        this.countdown = this.countdown-1;
      }
    }, 1000);
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
        setTimeout(() => {
          this.skService.addEventApplication("demoSKV2", "arrêt prévisualisation du document");
          this.skService.addEventApplication("demoSKV2", "capture du document");
          this.skService.captureImageDocument();
        }, 500);
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
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  };

  previewImageUpdate = (preview: any): void => {
    if (this.route.url === "/face-capture") {
      this.previewImageProfile = 'data:image/png;base64, ' + preview;
      this.service.previewImageProfile = this.previewImageProfile;
    }
  }


  ngOnDestroy(): void {
    let ___this = this;
    clearInterval(this.interval2);

    ___this.skService.removeEventListener("CameraShooting", "previewStart", this.onPreviewStart)
    ___this.skService.addEventListener("CameraShooting", "previewStop", this.onPreviewStop);
    ___this.skService.addEventApplication("demoSKV2", "fin de prévisualisation vidéo");
    ___this.skService.stopCameraPreview();
  }

}
