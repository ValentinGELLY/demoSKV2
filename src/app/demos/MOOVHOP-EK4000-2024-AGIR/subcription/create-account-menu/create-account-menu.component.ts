import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';
import { Router } from '@angular/router';
import { SoftKioskService } from 'src/app/softkiosk.service';
import { GenericComponent } from 'src/app/demos/generic/generic.component';

@Component({
  selector: 'app-create-account-menu',
  templateUrl: './create-account-menu.component.html',
  styleUrls: ['./create-account-menu.component.scss', '../../moovhop.component.scss']
})
export class CreateAccountMenuComponent implements OnInit{
   
  constructor( private moovhopService : MoovhopService, private router : Router) { }

  ngOnInit(): void {
    this.moovhopService.scanVisited = 0;
    this.moovhopService.errorScanId = false;
    this.moovhopService.errorFace = false;
    this.moovhopService.isScanFinished = false;
  }

  selectDocument(document: string){
    this.moovhopService.documentSelected = document;
    this.router.navigate(["/AGIR2024/createAccountCamera"]);
  }
}
