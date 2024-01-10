import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reload-thanks',
  templateUrl: './reload-thanks.component.html',
  styleUrls: ['./reload-thanks.component.scss']
})
export class ReloadThanksComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    if(this.router.url === '/reloadThanks'){
      setTimeout(()=>{
        this.router.navigate(['/homepageEK8000'])
      },5000)
    }
  }
}
