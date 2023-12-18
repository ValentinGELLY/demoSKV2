import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageComponent } from './homepage/homepage.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OptionListComponent } from './option-list/option-list.component'
import { ChooseViewComponent } from './choose-view/choose-view.component';
import { AllPagesAppComponent } from './all-pages-app/all-pages-app.component';
@NgModule({
  declarations: [
    HomepageComponent,
    ChooseViewComponent,
    AllPagesAppComponent,
    OptionListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: []
})
export class DemoSKV2Module { }
