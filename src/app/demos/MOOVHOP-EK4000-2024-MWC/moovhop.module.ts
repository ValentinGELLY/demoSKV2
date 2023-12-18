import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageComponent } from './homepage/homepage.component';
import { CameraComponent } from './camera/camera.component';
import { FormComponent } from './form/form.component';
import { CheckValidationComponent } from './check-validation/check-validation.component';
import { FaceResultComponent } from './face-result/face-result.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    HomepageComponent,
    CameraComponent,
    FormComponent,
    CheckValidationComponent,
    FaceResultComponent
  ],
  exports:[],
  imports: [
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoovHop4000MWCModule { }

