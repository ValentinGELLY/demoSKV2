import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../telefonica.service';

@Component({
  selector: 'app-scan-documento',
  templateUrl: './scan-documento.component.html',
  styleUrls: ['./scan-documento.component.scss', '../telefonica.component.scss', '../face-result/face-result.component.scss']
})
export class ScanDocumentoComponent {
  countdown: any;


  constructor(private router: Router, private appService: AppService) { }

  scanVisited: number = this.appService.scanVisited;

  ngOnInit() {
    console.log(this.appService.scanVisited);
    this.appService.scanVisited++;
    this.countdown = 5;
    let interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        if (this.router.url == '/scan-documento') {
          this.router.navigate(['/face-result']);
          clearInterval(interval);
        }
      }
    }, 1000);
  }
}
