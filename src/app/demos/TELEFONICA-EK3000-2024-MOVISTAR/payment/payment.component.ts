import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss','../telefonica.component.scss']
})
export class PaymentComponent {
countdown: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.countdown = 15;
    let interval = setInterval(() => {
      this.countdown--;
      if(this.countdown == 0 && this.router.url == "/payment"){
        clearInterval(interval);
        window.location.href = "/welcome"
      }
    }, 1000);
  }

}
