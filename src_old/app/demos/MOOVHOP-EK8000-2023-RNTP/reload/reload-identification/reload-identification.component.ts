import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reload-identification',
  templateUrl: './reload-identification.component.html',
  styleUrls: ['./reload-identification.component.scss', '../../moovhop.component.scss']
})
export class ReloadIdentificationComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {
    setTimeout(() => {
      if(this.router.url == '/reloadIdentification'){
        this.router.navigate(['reloadPersonalInformations'])
      }
    }, 5000);
  }

}
