import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { BuyChoiceComponent } from './buy-tyckets/buy-choice/buy-choice.component';
import { PaymentChoiceComponent } from './payment/payment-choice/payment-choice.component';
import { PaymentCardComponent } from './payment/payment-card/payment-card.component';
import { PaymentCashComponent } from './payment/payment-cash/payment-cash.component';
import { PaymentMobilAppComponent } from './payment/payment-mobil-app/payment-mobil-app.component';
import { PaymentMobilOpComponent } from './payment/payment-mobil-op/payment-mobil-op.component';
import { PaymentMobilOpValidationComponent } from './payment/payment-mobil-op-validation/payment-mobil-op-validation.component';
import { GetTicketsReceiptComponent } from './payment/get-tickets-receipt/get-tickets-receipt.component';
import { CreateAccountMenuComponent } from './subcription/create-account-menu/create-account-menu.component';
import { CreateAccountCameraComponent } from './subcription/create-account-camera/create-account-camera.component';
import { CreateAccountHelloComponent } from './subcription/create-account-hello/create-account-hello.component';
import { CreateAccountInformationValidationComponent } from './subcription/create-account-information-validation/create-account-information-validation.component';
import { CreateAccountSubscriptionChoiceComponent } from './subcription/create-account-subscription-choice/create-account-subscription-choice.component';
import { CreateAccountThanksComponent } from './subcription/create-account-thanks/create-account-thanks.component';
import { ReloadIdentificationComponent } from './reload/reload-identification/reload-identification.component';
import { ReloadPersonalInformationsComponent } from './reload/reload-personal-informations/reload-personal-informations.component';
import { WaitingScreenComponent } from './payment/waiting-screen/waiting-screen.component';
import { CreateAccountScanFinishComponent } from './subcription/create-account-scan-finish/create-account-scan-finish.component';
import { ReloadThanksComponent } from './reload/reload-thanks/reload-thanks.component';

export const routes: Routes = [
  {path: '/EK8000-2024-AGIR/homepageEK8000', component: HomepageComponent},
  {path: '/EK8000-2024-AGIR/buyChoice', component: BuyChoiceComponent},
  {path: '/EK8000-2024-AGIR/paymentChoice8000', component: PaymentChoiceComponent},
  {path: '/EK8000-2024-AGIR/paymentCard', component: PaymentCardComponent},
  {path: '/EK8000-2024-AGIR/paymentCash', component: PaymentCashComponent},
  {path: '/EK8000-2024-AGIR/paymentAppMobile8000', component: PaymentMobilAppComponent},
  {path: '/EK8000-2024-AGIR/paymentOpMobile', component: PaymentMobilOpComponent},
  {path: '/EK8000-2024-AGIR/paymentOpMobileValidation8000', component: PaymentMobilOpValidationComponent},
  {path: '/EK8000-2024-AGIR/getTicketReceipt', component: GetTicketsReceiptComponent},
  {path: '/EK8000-2024-AGIR/createAccountMenu8000', component: CreateAccountMenuComponent},
  {path: '/EK8000-2024-AGIR/createAccountCamera8000', component: CreateAccountCameraComponent},
  {path: '/EK8000-2024-AGIR/createAccountHello8000', component: CreateAccountHelloComponent},
  {path: '/EK8000-2024-AGIR/createAccountInformationValidation', component: CreateAccountInformationValidationComponent},
  {path: '/EK8000-2024-AGIR/createAccountSubscriptionChoice8000', component: CreateAccountSubscriptionChoiceComponent},
  {path: '/EK8000-2024-AGIR/createAccountThanks8000', component: CreateAccountThanksComponent},
  {path: '/EK8000-2024-AGIR/reloadIdentification', component: ReloadIdentificationComponent},
  {path: '/EK8000-2024-AGIR/reloadPersonalInformations', component: ReloadPersonalInformationsComponent},
  {path: '/EK8000-2024-AGIR/waitingScreen', component: WaitingScreenComponent},
  {path: '/EK8000-2024-AGIR/createAccountScanFinish8000', component: CreateAccountScanFinishComponent},
  {path: '/EK8000-2024-AGIR/reloadThanks', component: ReloadThanksComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MoovHop8000RoutingModule { }
