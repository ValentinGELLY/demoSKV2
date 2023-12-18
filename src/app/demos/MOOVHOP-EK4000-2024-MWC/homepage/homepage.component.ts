import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {



  constructor(private router : Router) { }

  navigateTo(arg0: string) {
    this.router.navigate([arg0]);
  }

  ngAfterViewInit(): void {
    //console.log(username, password);
  }
  
}
