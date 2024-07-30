import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

declare var Kiosk: any;

@Component({
  selector: 'app-features-choice',
  templateUrl: './features-choice.component.html',
  styleUrls: [
    './features-choice.component.scss',
    '../option-list/option-list.component.scss',
  ],
})



export class FeaturesChoiceComponent implements OnInit {
  constructor(private appService: AppService, private router: Router) { }

  baseUrl = 'http://localhost:5000/';
  allScript: Array<string> = [];
  files = [];

  // Liste des tests a affichés dans la page
  featuresList: string[] = [];


  // liste des features qui existe dans les assets de l'application

  // liste des features qui n'existe pas dans les assets de l'application
  missing: string[] = [];
  missing_text: string = '';


  verifiedFeatureList: Array<{ feature: string, title: string, description: string, service: string, component: string }> = [];
  verifiedFeatureListFiltered: Array<{ feature: string, title: string, description: string, service: string, component: string }> = [];

  ngOnInit(): void {
    this.getAllScript();

  }

  getAllScript() {
    fetch(
      `http://localhost:5000/demoSKV2/application/assets/DemoSKV2/confTest/toc.txt`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((text: string) => {
        this.featuresList = text.split('\n').map(item => item.trim());
        this.createAllElement();
      });
  }

  createAllElement() {
    for (let i = 0; i < this.featuresList.length; i++) {
      fetch(
        `http://localhost:5000/demoSKV2/application/assets/DemoSKV2/confTest/${this.featuresList[i]}.js`
      )
        .then((response) => {
          if (!response.ok) {
            this.missing.push(this.featuresList[i]);
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then((text: string) => {

          const titleRegex = /@title\s+(.*)/;
          const descriptionRegex = /@description\s+(.*)/;
          const serviceRegex = /@service\s+([^\s]+)(?:\s+\(([^)]*)\))?/;
          const titleMatch = text.match(titleRegex);
          const descriptionMatch = text.match(descriptionRegex);
          const serviceMatch = text.match(serviceRegex);
          const title = titleMatch ? titleMatch[1].toUpperCase() : 'N/A';
          const description = descriptionMatch ? descriptionMatch[1].slice(0, 50) + "..." : 'N/A';
          const service = serviceMatch ? serviceMatch[1] : 'N/A';
          const component = serviceMatch && serviceMatch[2] ? serviceMatch[2] : 'N/A';

          this.verifiedFeatureList.push({
            feature: this.featuresList[i],
            title: title.toUpperCase(),
            description,
            service,
            component,
          });
          this.verifiedFeatureList.sort((a, b) => a.feature.localeCompare(b.feature));
          this.verifiedFeatureListFiltered = [...this.verifiedFeatureList];
          this.missing_text = this.missing.join(', ');
        })
        .catch((error) => {
          console.error('Error fetching or processing the file:', error);
        });
    }
  }


  onSearch(event: Event): void {
    let typeSelected = document.getElementById('typeResearch') as HTMLSelectElement;
    let type: string = typeSelected.value;
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    if ((document.getElementById("searchTextId")! as HTMLInputElement).value === '') {
      this.verifiedFeatureListFiltered = this.verifiedFeatureList;
    } else {
      this.verifiedFeatureListFiltered = this.verifiedFeatureList.filter(item => (item as any)[type].toLowerCase().includes(query));
    }
  }

  /**
   * redirection sur la page de test avec en paramètre le nom du test à exécuter
   * @param testName nom du test à exécuter
   */
  ChooseScript(testName: string) {
    this.appService.filename = testName;
    console.log("filename", this.appService.filename)
    this.router.navigate(['/featureRun']);
  }
}
