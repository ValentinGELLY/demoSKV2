import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericComponent } from '../../../generic/generic.component';
import { SoftKioskService } from 'src/app/softkiosk.service';
import { AppService as telefonicaService  } from '../../telefonica.service';
import { extend } from 'jquery';


@Component({
  selector: 'app-registry-document',
  templateUrl: './registry-document.component.html',
  styleUrls: ['./registry-document.component.scss','../../telefonica.component.scss']
})
export class RegistryDocumentComponent extends GenericComponent{

  constructor(private router: Router, skService: SoftKioskService, private telefonicaService: telefonicaService) {
    super(skService);
   }
   
  selectDocument(documento: number){
    this.telefonicaService.documentoSelected = documento;
    this.router.navigate(["/ES/scanDocumento"]);
  }

}
