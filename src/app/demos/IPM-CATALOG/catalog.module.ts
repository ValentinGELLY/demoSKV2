import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IpmCatalogComponent } from './ipm-catalog/ipm-catalog.component';


@NgModule({
  declarations: [
    IpmCatalogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IPMCatalogModule { }

