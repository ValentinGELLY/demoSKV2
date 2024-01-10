import { Component } from '@angular/core';
import { MoovhopService } from '../moovhop.service';
import { GenericComponent } from '../../generic/generic.component';
import { SoftKioskService } from 'src/app/softkiosk.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss', '../moovhop.component.scss']
})
export class HomepageComponent {
  constructor(skService: SoftKioskService, private moovhopService: MoovhopService) {
    
   }

 ngOnInit() {
    /*
    setTimeout(() => {
      document.getElementById("white")!.classList.add("removeWhite");
    }, 500);*/
    //préchargement des images
    this.moovhopService.preloadImages();
    this.moovhopService.scanVisited = 0;
    document.getElementsByTagName('body')[0].style.width = 'fit-content';
    document.getElementsByTagName('body')[0].style.height = 'fit-content';

    
  }

  Choix(num : number){
    this.moovhopService.ActionChoosed = num;
  }

}
