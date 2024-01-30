import { Component } from '@angular/core';
import { Router} from "@angular/router";
import { AppService } from '../../telefonica.service';

@Component({
  selector: 'app-all-page-movistar',
  templateUrl: './all-page-movistar.component.html',
  styleUrls: ['./all-page-movistar.component.scss']
})
export class AllPageMovistarComponent {

  PreviusPage: string = "";

  constructor(private router: Router, private service:AppService) { }

  ngOnInit(): void {
    setTimeout(() => {
      document.getElementById("loadingWhite")!.classList.add("removeWhite");
    }, 50);
    this.PreviusPage = this.service.routesBackwards[this.router.url];
    
    if (this.PreviusPage == undefined){
      this.PreviusPage = this.router.url;
    }
  }


  ngOnDestroy(): void {
    document.getElementById("loadingWhite")!.classList.remove("removeWhite");
   }

}
