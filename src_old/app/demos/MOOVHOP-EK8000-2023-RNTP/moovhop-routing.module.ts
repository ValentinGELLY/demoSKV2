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
  {path: 'homepageEK8000', component: HomepageComponent},
  {path: 'buyChoice', component: BuyChoiceComponent},
  {path: 'paymentChoice8000', component: PaymentChoiceComponent},
  {path: 'paymentCard', component: PaymentCardComponent},
  {path: 'paymentCash', component: PaymentCashComponent},
  {path: 'paymentAppMobile8000', component: PaymentMobilAppComponent},
  {path: 'paymentOpMobile', component: PaymentMobilOpComponent},
  {path: 'paymentOpMobileValidation8000', component: PaymentMobilOpValidationComponent},
  {path: 'getTicketReceipt', component: GetTicketsReceiptComponent},
  {path: 'createAccountMenu8000', component: CreateAccountMenuComponent},
  {path: 'createAccountCamera8000', component: CreateAccountCameraComponent},
  {path: 'createAccountHello8000', component: CreateAccountHelloComponent},
  {path: 'createAccountInformationValidation', component: CreateAccountInformationValidationComponent},
  {path: 'createAccountSubscriptionChoice8000', component: CreateAccountSubscriptionChoiceComponent},
  {path: 'createAccountThanks8000', component: CreateAccountThanksComponent},
  {path: 'reloadIdentification', component: ReloadIdentificationComponent},
  {path: 'reloadPersonalInformations', component: ReloadPersonalInformationsComponent},
  {path: 'waitingScreen', component: WaitingScreenComponent},
  {path: 'createAccountScanFinish8000', component: CreateAccountScanFinishComponent},
  {path: 'reloadThanks', component: ReloadThanksComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MoovHop8000RoutingModule { }
