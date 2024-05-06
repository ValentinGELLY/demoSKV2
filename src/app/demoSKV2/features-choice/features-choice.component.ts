import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-features-choice',
  templateUrl: './features-choice.component.html',
  styleUrls: ['./features-choice.component.scss', "../option-list/option-list.component.scss"]
})
export class FeaturesChoiceComponent implements OnInit {

  constructor( private appService:AppService, private router:Router) { }

  baseUrl = "http://localhost:5000/";
  allScript: Array<string> = [];
  files = [];
  ngOnInit(): void {
    this.files = this.sendMaintCtrlRequest("ScriptList", "GET", true);
    this.allScript = this.files.map((element: string) => {
      return this.extractTextFromFileName(element);
    });
    this.allScript = this.allScript.filter((element: string) => {
      return element !== undefined;
    });
    this.allScript = this.allScript.map((element: string) => {
      return element.replace(/_/g, " ");
    });


  }

  sendMaintCtrlRequest(reqFunc: string, reqType: string, isReqJson = false, reqData = null): any {
    let reqFormat = (isReqJson) ? "json" : "";
    let test = this.sendRequest(this.baseUrl + "api/Maintenance/" + reqFunc, reqType, reqFormat, reqData);
    return test;
  }


  sendRequest(reqUrl: string, reqType: string, reqFormat: string = "", reqData: any = null): any {
    let request = new XMLHttpRequest();

    try {
      request.open(reqType, reqUrl, false);
      request.send(reqData);
    }
    catch (error) {
      throw error;
    }

    if (request.status === 200) {
      let reqResult = request.responseText;
      /* if (reqUrl.indexOf("DocumentAll") > 0) {
          let content = (new Date()).toISOString().replace(/:/g, "-");
          req.saveScript("doc " + content, "json", reqResult);
      } */
      switch (reqFormat) {
        case "json":
          return this.checkJsonParse(reqResult);
        case "pdf":
          return request.response;
        default:
          return reqResult;
      }
    }
    return null;
  }

  extractTextFromFileName(fileName: string): any {
    const regex = /^\[IPM\]_(.*?)\.js$/;
    const match = regex.exec(fileName);
    if (match && match.length > 1) {
      return match[1];
    }
  }


  checkJsonParse(input: string) {
    try {
      return JSON.parse(input);
    }
    catch (e) {
      console.debug("Problème de sérialisation des données");
      return null;
    }
  }

  ChooseScript(fileName: string) {
    this.appService.filename = fileName;   
    this.router.navigate(['/featureRun']);
  }




    
  
  


}
