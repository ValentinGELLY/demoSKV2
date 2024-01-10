import { Component } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-scan-finish',
  templateUrl: './create-account-scan-finish.component.html',
  styleUrls: ['./create-account-scan-finish.component.scss', '../../moovHop.component.scss']
})
export class CreateAccountScanFinishComponent {

  constructor(private moovhopService: MoovhopService, private router: Router) { }
  route : any = this.moovhopService.route;
  isScanFinished : boolean = false;

  previewImageScanId = this.moovhopService.previewImageScanId;
  previewImageProfile = this.moovhopService.previewImageProfile;

  ngOnInit() {
    console.log(this.route);
    this.isScanFinished = this.moovhopService.isScanFinished;
    let confirmButton = document.getElementById("confirmButton");

    
    if (confirmButton!=null) {
      console.log(confirmButton);
      confirmButton.addEventListener("click", () => {
          console.log("testIf");
          this.route = '/createAccountHello';
          this.moovhopService.route = "/createAccountHello"
        
      });
    }

    if(this.moovhopService.scanVisited === 2){
      let img = document.getElementById("capture");
      if(img!=null){
        img.style.setProperty("clip", "rect(250px, auto, auto, auto)");
      }
    }

  }

  resetVisits(){
    this.moovhopService.scanVisited -= 1;
  }
}
