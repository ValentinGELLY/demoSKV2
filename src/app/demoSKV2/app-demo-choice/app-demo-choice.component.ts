import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-demo-choice',
  templateUrl: './app-demo-choice.component.html',
  styleUrls: ['./app-demo-choice.component.scss', "../option-list/option-list.component.scss"]
})
export class AppDemoChoiceComponent {

  constructor() { }

  listDemo: Array<{ name: string, description: string, root: string, img: string }> = []
  listDemoFiltered: Array<{ name: string, description: string, root: string, img: string }> = []
  valueResearch: string = ''

  ngAfterViewInit(): void {
    let containerDemo = document.getElementsByClassName("containerDemo")
    for (let i = 0; i < containerDemo.length; i++) {
      let name = containerDemo[i].getElementsByTagName("h3")[0].innerHTML
      let description = containerDemo[i].getElementsByTagName("p")[0].innerHTML
      let root = containerDemo[i].getAttribute("routerLink")
      let image = containerDemo[i].getElementsByTagName("img")[0].getAttribute("src")
      this.listDemo.push({ name, description, root: root ?? '', img: image ?? '' })
    }
    console.log(this.listDemo)
  }

  onSearch(event: Event): void {
    let typeSelected = document.getElementById("typeResearch") as HTMLSelectElement;
    let type: string = typeSelected.value;
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.valueResearch = query;
    if ((document.getElementById("searchTextId")! as HTMLInputElement).value === '') {
      this.listDemoFiltered = this.listDemo;
    }else{
      this.listDemoFiltered = this.listDemo.filter(item => (item as any)[type].toLowerCase().includes(query));
    }
  }
}
