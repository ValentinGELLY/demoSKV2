import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AppService } from '../telefonica.service';

@Component({
  selector: 'app-face-result',
  templateUrl: './face-result.component.html',
  styleUrls: ['./face-result.component.scss','../telefonica.component.scss']
})
export class FaceResultComponent {

  
  constructor(private router: Router, private service:AppService) { }
  
  scanVisited: number = this.service.scanVisited;

  ngOnInit(): void {

  }

  resetScan(){
    if(this.scanVisited == 1){
      this.router.navigate(["/face-capture"]);
    }else{
      this.router.navigate(["/scan-documento"]);
      this.service.scanVisited -= 1;
    }
    
  }

}
