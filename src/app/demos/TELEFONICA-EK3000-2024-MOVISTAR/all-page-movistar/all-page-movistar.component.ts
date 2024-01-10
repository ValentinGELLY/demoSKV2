import { Component } from '@angular/core';
import { Router} from "@angular/router";
import { AppService } from '../telefonica.service';

@Component({
  selector: 'app-all-page-movistar',
  templateUrl: './all-page-movistar.component.html',
  styleUrls: ['./all-page-movistar.component.scss']
})
export class AllPageMovistarComponent {



  constructor(private router: Router, private service:AppService) { }

  ngOnInit(): void {
    document.getElementById("back")!.addEventListener("click", () => {
      this.service.navigateBack(this.router.url);
    });
      
  }


}
