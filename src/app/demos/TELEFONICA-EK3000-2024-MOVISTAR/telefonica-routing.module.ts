import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { PrepaidTariffsComponent } from './prepaid-tariffs/prepaid-tariffs.component';
import { FullPrepaymentComponent } from './full-prepayment/full-prepayment.component';
import { WantContractComponent } from './want-contract/want-contract.component';
import { HomeCheckIdentityComponent } from './home-check-identity/home-check-identity.component';
import { FaceCaptureComponent } from './face-capture/face-capture.component';
import { FaceResultComponent } from './face-result/face-result.component';
import { RegistryDocumentComponent } from './registry-document/registry-document.component';
import { ScanDocumentoComponent } from './scan-documento/scan-documento.component';
import { WaitingScreenComponent } from './waiting-screen/waiting-screen.component';
import { IdentityValidationComponent } from './identity-validation/identity-validation.component';
import { InformationConsentComponent } from './information-consent/information-consent.component';
import { FormPersonalInformationComponent } from './form-personal-information/form-personal-information.component';
import { TestFormatComponent } from './test-format/test-format.component';
import { LegalConditionComponent } from './legal-condition/legal-condition.component';
import { PaymentComponent } from './payment/payment.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'pagina-principal', component: PaginaPrincipalComponent },
  { path: 'full-prepayment', component: FullPrepaymentComponent },
  { path: 'prepaid-tariffs', component: PrepaidTariffsComponent },
  { path: 'want-contract', component: WantContractComponent },
  { path: 'home-check-identity', component: HomeCheckIdentityComponent },
  { path: 'face-capture', component: FaceCaptureComponent },
  { path: 'face-result', component: FaceResultComponent },
  { path: 'registry-document', component: RegistryDocumentComponent },
  { path: 'scan-documento', component: ScanDocumentoComponent },
  { path: 'waiting-screen', component: WaitingScreenComponent },
  { path: 'identity-validation', component: IdentityValidationComponent },
  { path: 'information-consent', component: InformationConsentComponent },
  { path: 'form-personal-information', component: FormPersonalInformationComponent },
  { path: 'test-format', component: TestFormatComponent },
  { path: 'legal-condition', component: LegalConditionComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'welcome', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TelefonicaEk3000MovistarRoutingModule { }
