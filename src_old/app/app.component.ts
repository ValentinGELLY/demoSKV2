import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoftKioskService } from './softkiosk.service';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  customerDataValue: string = "";

  constructor(private router: Router, private skService: SoftKioskService, private appService: AppService) {}

  ngOnInit(): void {
    // récupérer valeur du customerdata
    // vérifier que la valeur n'est pas undefined ou mauvaise
    // switch sur les différents noms d'application
    // dans chaque case, naviguer sur la bonne page

    let applicationToLaunch = this.getApplicationToLaunchFromMaintenance();

    console.log(applicationToLaunch);
    switch (applicationToLaunch) {
      case 'Labizi':
        this.appService.setNextRoute('labiziHomepage');
      break;
      case 'MoovHop1000':
        this.appService.setNextRoute('moovopRecupCard');
      break;
      case 'MoovHop8000':
        this.appService.setNextRoute('moovHopHomepage');
      break;
      case 'MOOVHOP-EK4000-2023-RNTP':
        this.appService.setNextRoute('homepageEK4000');
      break;
      case 'MOOVHOP-EK8000-2023-RNTP':
        this.appService.setNextRoute('homepageEK8000');
      break; 
      case 'MOOVHOP-EK4000-2024-MWC':
        this.appService.setNextRoute('homepageEK4000MWC');
      break;
      case 'TELEPHONICA-EK3000-2024-MOVISTAR':
        this.appService.setNextRoute('pagina-principal');
      break;
      default:
        console.log("Vous allez être redirigé sur DemoSKV2");
        this.appService.setNextRoute('demoSKV2Homepage');
      break;
    }
  }

  getApplicationToLaunchFromMaintenance(): string {
    return this.skService.getValueFromCustomerData();
  }

}
