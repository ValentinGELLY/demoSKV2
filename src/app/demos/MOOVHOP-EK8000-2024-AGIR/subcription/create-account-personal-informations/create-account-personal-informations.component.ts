import { Component } from '@angular/core';
import { GenericComponent } from 'src/app/demos/generic/generic.component';
import { MoovhopService } from '../../moovhop.service';
import { SoftKioskService } from 'src/app/softkiosk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-personal-informations',
  templateUrl: './create-account-personal-informations.component.html',
  styleUrls: ['./create-account-personal-informations.component.scss', '../../moovhop.component.scss']
})
export class CreateAccountPersonalInformationsComponent extends GenericComponent{

    constructor(private moovhopService: MoovhopService, skService: SoftKioskService, private router : Router) {
        super(skService);
    }

    name = this.moovhopService.nameUser;
    firstname = this.moovhopService.firstName;
    birthday = this.moovhopService.birthday;


    

}
