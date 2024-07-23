import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpmCatalogComponent } from './ipm-catalog/ipm-catalog.component';

export const routes: Routes = [
  {path:'catalogIPM', component: IpmCatalogComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class IpmCatalogRooting { }
