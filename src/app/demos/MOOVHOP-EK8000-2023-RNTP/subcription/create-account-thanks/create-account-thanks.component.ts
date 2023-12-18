import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-thanks',
  templateUrl: './create-account-thanks.component.html',
  styleUrls: ['./create-account-thanks.component.scss', '../../moovHop.component.scss']
})
export class CreateAccountThanksComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    setTimeout(() => {
      if (this.router.url === '/createAccountThanks8000') {
        this.router.navigate(['/homePageEK8000'])
      }
    }, 5000);

  }
}
