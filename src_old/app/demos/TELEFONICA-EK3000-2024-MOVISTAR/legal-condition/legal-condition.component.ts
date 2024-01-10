import { Component } from '@angular/core';

@Component({
  selector: 'app-legal-condition',
  templateUrl: './legal-condition.component.html',
  styleUrls: ['./legal-condition.component.scss','../telefonica.component.scss']
})
export class LegalConditionComponent {
  
    constructor() { }

    ngOnInit() {
      document.getElementById("continuarBtn")!.addEventListener("click", function(){
        let allinput = document.getElementsByTagName("input")
        for (let index = 0; index < allinput.length; index++) {
          const element = allinput[index];
          console.log(element.checked);
          if(element.checked){
            window.location.href = "/payment"
          }else{
            element.style.border = "2em solid red"
          }
        }
      });
    }
}
