import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoovhopService } from '../moovhop.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from 'jquery';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  champ1: string = '';
  champ2: string = '';

  constructor(private moovHopService: MoovhopService, private router: Router, private http: HttpClient) { }
  

  ngOnInit(): void {
  }

  navigateTo(arg0: string) {
    this.router.navigate([arg0]);
  }

  createUser(userId:string = (<HTMLInputElement>document.getElementById("name")).value.replace(/ /g, ''),  nbTry: number = 0) {
    
    var tel = (<HTMLInputElement>document.getElementById("tel")).value;
    console.log('userId: ', userId, 'tel: ', tel);
    fetch("https://zwk8o88.15.237.60.0.sslip.io/https://emea.identityx-cloud.com/ipmfrance/IdentityXServices/rest/v1/users", {
      method: "POST", 
      
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
      },
      body: JSON.stringify({
        "userId": userId+nbTry,
        "primaryPhone": (<HTMLInputElement>document.getElementById("tel")).value,
      })
    })
      .then((response) => {
        return response.json();
       })
      .then((data) => {
        if (data.httpStatus === 400) {
          let nbTry2 = nbTry + 1;
          this.createUser(userId, nbTry2);
        } else {
          console.log(data);
          this.moovHopService.idUserToCheck = data.id;
          this.moovHopService.nameUserToCheck = this.champ1;
          this.router.navigate(['/cameraIdentification']);
        }
      })
      .catch((error) => { 
        console.log('error: ', error);
      });
  }
}
