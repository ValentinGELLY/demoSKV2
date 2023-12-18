import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SoftKioskService } from 'src/app/softkiosk.service';
import { MoovhopService} from '../../moovhop.service';


@Component({
  selector: 'app-payment-choice',
  templateUrl: './payment-choice.component.html',
  styleUrls: ['./payment-choice.component.scss', '../../moovhop.component.scss']
})
export class PaymentChoiceComponent {

  constructor(private moovhopservice : MoovhopService) { }

  paymentByCard(){
    this.moovhopservice.paidWithCB = true;
    
  }

}
