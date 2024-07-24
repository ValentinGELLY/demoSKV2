import { Component } from '@angular/core';
import { Router} from "@angular/router";
import { AppService as TelefonicaService} from '../../telefonica.service';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'en-app-all-page-movistar',
  templateUrl: './all-page-movistar.component.html',
  styleUrls: ['./all-page-movistar.component.scss']
})
export class EnAllPageMovistarComponent {

  PreviousPage: string = "";

  constructor(private router: Router, private service:TelefonicaService, private appService : AppService) { }

  ngOnInit(): void {
    setTimeout(() => {
      document.getElementById("loadingWhite")!.classList.add("removeWhite");
    }, 50);

    this.PreviousPage = this.service.routesBackwards[this.router.url];
    
    if (this.PreviousPage == undefined || this.router.url == "/EN/scanDocumento" ){
      this.PreviousPage = this.router.url;
    }

  }


  ngOnDestroy(): void {
    document.getElementById("loadingWhite")!.classList.remove("removeWhite");
   }

   
  navigateToError() {
    this.appService.goOnCatalog()
  }


}
