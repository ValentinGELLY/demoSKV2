import { AfterViewInit, Component } from '@angular/core';
import { MoovhopService } from '../moovhop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {



  constructor(private router : Router, private moovhopService: MoovhopService) { }

  navigateTo(arg0: string) {
    this.router.navigate([arg0]);
  }

  ngAfterViewInit(): void {
    this.moovhopService.nameUserToCheck = "";
    this.moovhopService.firstnameUserToCheck = "";
    this.moovhopService.idUserToCheck = "";
    this.moovhopService.idChecks = "";
    this.moovhopService.scanVisited = 0;
  }
  
}
