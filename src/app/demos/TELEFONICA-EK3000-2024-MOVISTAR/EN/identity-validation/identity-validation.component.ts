import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AppService as telefonicaService} from '../../telefonica.service';
import { SoftKioskService } from 'src/app/softkiosk.service';
import { GenericComponent } from 'src/app/demos/generic/generic.component';

@Component({
  selector: 'app-identity-validation',
  templateUrl: './identity-validation.component.html',
  styleUrls: ['./identity-validation.component.scss', '../../telefonica.component.scss']
})
export class EnIdentityValidationComponent extends GenericComponent {

  constructor(private router: Router, private service: telefonicaService, skService: SoftKioskService) {
    super(skService);
   }
   identityValidate:boolean =  this.service.identityValidate;
   timeout: any;
  override ngOnInit() {
    this.timeout = setTimeout(() => {
      if(this.router.url == '/EN/identityValidation' && this.identityValidate)
      this.router.navigate(['/EN/informationConsent']);
      else
      this.router.navigate(['/EN/homeCheckIdentity']);
    }, 5000);
  }

  onDestroy() {
    clearTimeout(this.timeout);
  }

}
