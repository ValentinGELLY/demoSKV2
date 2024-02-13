import { Component, OnInit } from '@angular/core';
import {MoovhopService} from '../moovhop.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss', '../moovhop.component.scss']
})
export class HomepageComponent{

  constructor( private moovhopService :MoovhopService) { }

  ngOnInit(): void {
    this.moovhopService.preloadImages();
    //Kiosk.Signaling.setLed({ 'color': 'Green', 'name': 'Leds' });

    var maVariable = localStorage.getItem('automaticCard');
    console.log(maVariable);
    this.moovhopService.automaticCard = maVariable || 'true'; 
  
  }

  ActionChoosed( num : number){
    this.moovhopService.ActionChoosed=num;
  }

}
