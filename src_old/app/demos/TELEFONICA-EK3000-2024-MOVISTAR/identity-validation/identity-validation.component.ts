import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-identity-validation',
  templateUrl: './identity-validation.component.html',
  styleUrls: ['./identity-validation.component.scss', '../telefonica.component.scss']
})
export class IdentityValidationComponent {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      if(this.router.url == '/identity-validation')
      this.router.navigate(['/information-consent']);
    }, 5000);
  }

}
