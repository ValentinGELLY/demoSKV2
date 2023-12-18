import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoovhopService } from '../moovhop.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {


  constructor(private moovHopService: MoovhopService, private router : Router, private http: HttpClient) { }
  champ1: string = '';
  champ2: string = '';
  ngOnInit(): void {
  }
/*
  createUser(userId: string = this.champ1.replace(/ /g,''), nbTry: number = 0) {
      const url = 'https://emea.identityx-cloud.com/ipmfrance/IdentityXServices/rest/v1/users';
    
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ==',
        })
      };
    
      const payload = {
        "userId": userId,
        "primaryPhone": this.champ2,
      };
    
      this.http.post(url, payload, httpOptions)
        .subscribe((data: any) => {
          if (data.httpStatus === 400) {
            this.createUser(userId + nbTry, nbTry++);
          } else {
            let jsonParsed = JSON.parse(JSON.stringify(data));
            this.moovHopService.idUserToCheck = jsonParsed.id;
            this.moovHopService.nameUserToCheck = this.champ1;
            this.moovHopService.firstname = this.champ1.replace(/ /g, '');
            this.router.navigate(['/camera-identification']);
          }
        }, error => {
          console.error('Error:', error);
        });
  }
*/
}
