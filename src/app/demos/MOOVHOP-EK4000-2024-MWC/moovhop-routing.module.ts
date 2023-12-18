import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { CameraComponent } from './camera/camera.component';
import { CheckValidationComponent } from './check-validation/check-validation.component';
import { FaceResultComponent } from './face-result/face-result.component';
import { FormComponent} from './form/form.component';

export const routes: Routes = [
  { path: 'homepageEK4000MWC', component: HomepageComponent },
  { path: 'formPersonalInformations', component: FormComponent },
  { path: 'cameraIdentification', component: CameraComponent },
  { path: 'checkValidation', component: CheckValidationComponent },
  { path: 'faceResult', component: FaceResultComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class MoovHop4000MWCRoutingModule { }
