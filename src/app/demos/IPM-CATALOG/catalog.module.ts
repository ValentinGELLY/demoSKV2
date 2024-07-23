import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IpmCatalogComponent } from './ipm-catalog/ipm-catalog.component';


@NgModule({
  declarations: [
    IpmCatalogComponent,
  ],
  imports: [
    BrowserModule,
    
    //MoovHop4000RoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IPMCatalogModule { }

