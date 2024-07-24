import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoSKV2RoutingModule } from './demoSKV2/demoSKV2-routing.module';
import {MoovHop4000RoutingModule as MoovHopEK4000RoutingRNTP} from './demos/MOOVHOP-EK4000-2023-RNTP/moovhop-routing.module';
import { MoovHop8000RoutingModule as MoovHopEK8000RoutingRNTP } from './demos/MOOVHOP-EK8000-2023-RNTP/moovhop-routing.module';
import { TelefonicaEk3000MovistarRoutingModule as TelefonicaEK3000MovistarRouting } from './demos/TELEFONICA-EK3000-2024-MOVISTAR/telefonica-routing.module';
import {MoovHop4000RoutingModuleMWC2024 as MoovHopEK4000RoutingMWC } from './demos/MOOVHOP-EK4000-2024-MWC/moovhop-routing.module';
import { MoovHop4000RoutingModuleAGIR2024 } from './demos/MOOVHOP-EK4000-2024-AGIR/moovhop-routing.module';
import { MoovHop8000RoutingModuleAGIR2024} from './demos/MOOVHOP-EK8000-2024-AGIR/moovhop-routing.module';
import { MoovHop4000RoutingModuleEUMO2024 } from './demos/MOOVHOP-EK4000-2024-EUMO/moovhop-routing.module';
import { IpmCatalogRooting } from './demos/IPM-CATALOG/catalog-routing.module';


const routes: Routes = [
];

@NgModule({
  imports:
  [RouterModule.forRoot(routes),
  DemoSKV2RoutingModule,
  MoovHopEK4000RoutingRNTP,
  MoovHopEK8000RoutingRNTP,
  TelefonicaEK3000MovistarRouting,
  MoovHopEK4000RoutingMWC,
  MoovHop4000RoutingModuleAGIR2024,
  MoovHop8000RoutingModuleAGIR2024,
  MoovHop4000RoutingModuleEUMO2024,
  IpmCatalogRooting
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
