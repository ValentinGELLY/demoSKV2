import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AllPageMovistarComponent } from './all-page-movistar/all-page-movistar.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { FullPrepaymentComponent } from './full-prepayment/full-prepayment.component';
import { PrepaidTariffsComponent } from './prepaid-tariffs/prepaid-tariffs.component';
import { WantContractComponent } from './want-contract/want-contract.component';
import { HomeCheckIdentityComponent } from './home-check-identity/home-check-identity.component';
import { FaceCaptureComponent } from './face-capture/face-capture.component';
import { FaceResultComponent } from './face-result/face-result.component';
import { RegistryDocumentComponent } from './registry-document/registry-document.component';
import { ScanDocumentoComponent } from './scan-documento/scan-documento.component';
import { IdentityValidationComponent } from './identity-validation/identity-validation.component';
import { WaitingScreenComponent } from './waiting-screen/waiting-screen.component';
import { InformationConsentComponent } from './information-consent/information-consent.component';
import { FormPersonalInformationComponent } from './form-personal-information/form-personal-information.component';
import { TestFormatComponent } from './test-format/test-format.component';
import { LegalConditionComponent } from './legal-condition/legal-condition.component';
import { PaymentComponent } from './payment/payment.component';
import { WelcomeComponent } from './welcome/welcome.component';


@NgModule({
  declarations: [
    AllPageMovistarComponent,
    PaginaPrincipalComponent,
    FullPrepaymentComponent,
    PrepaidTariffsComponent,
    WantContractComponent,
    HomeCheckIdentityComponent,
    FaceCaptureComponent,
    FaceResultComponent,
    RegistryDocumentComponent,
    ScanDocumentoComponent,
    IdentityValidationComponent,
    WaitingScreenComponent,
    InformationConsentComponent,
    FormPersonalInformationComponent,
    TestFormatComponent,
    LegalConditionComponent,
    PaymentComponent,
    WelcomeComponent,
  ],
  exports: [AllPageMovistarComponent],
  imports: [
    BrowserModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Telefonica3000MovistarModule { }
