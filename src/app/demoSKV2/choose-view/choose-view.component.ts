import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-view',
  templateUrl: './choose-view.component.html',
  styleUrls: ['./choose-view.component.scss',  '../../app.component.scss']
})
export class ChooseViewComponent implements OnInit {

  arrayViewImage = [{ view: "user", path: "./assets/DemoSKV2/all-pages-icon/user.png" }, { view: "marketing", path: "../../../assets/DemoSKV2/all-pages-icon/salesman.png" }, { view: "tech", path: "../../../assets/DemoSKV2/all-pages-icon/tech.png" }, { view: "advancedTech", path: "../../../assets/DemoSKV2/all-pages-icon/advancedTech.png" }, { view: "ivq", path: "../../../assets/DemoSKV2/all-pages-icon/ivq.png" }];
  
 
  router: Router;
  constructor(private appService: AppService, _router: Router) {
    this.router = _router;
  }

  ngOnInit(): void {
    console.log("on est dans le onInit de chooseView");
  }

  chooseView(view: string) {
    this.appService.setCurrentView(view);
    console.log(view);
    // Find the object in the array that matches the 'view' parameter
    const imageView = this.arrayViewImage.find(item => item.view === view);

    if (imageView) {
      const imagePath = imageView.path;
      this.appService.currentViewImage = imagePath;
      console.log(imagePath); // The 'imagePath' variable now contains the path of the image.
      // You can use 'imagePath' here as per your requirement.
    }

    this.router.navigate(['/demoSKV2AllPagesApp']);
  }

}
