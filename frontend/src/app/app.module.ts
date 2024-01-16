import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/ui/menu/menu.component';
import { WelcomePageComponent } from './components/accueil/welcome-page/welcome-page.component';

import { ListeComponent } from './components/parcours/liste/liste.component';
import { DetailComponent } from './components/parcours/detail/detail.component';
import { LoginComponent } from './components/accueil/login/login.component';
import { RegistrationComponent } from './components/accueil/registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './components/accueil/logout/logout.component';
import { FormulairePicComponent } from './components/pic/formulaire-pic/formulaire-pic.component';
import { ListePicComponent } from './components/pic/liste-pic/liste-pic.component';
import { DetailArticleComponent } from './components/blog/detail-article/detail-article.component';
import { FormulaireComponent } from './components/parcours/formulaire/formulaire.component';
import { FormulaireArticleComponent } from './components/blog/formulaire-article/formulaire-article.component';
import { ListeArticleComponent } from './components/blog/liste-article/liste-article.component';
import { EditArticleComponent } from './components/blog/edit-article/edit-article.component';
import { PicByCityComponent } from './components/pic/pic-by-city/pic-by-city.component';
import { AccountComponent } from './components/accueil/account/account.component';
import { ArticleCodeComponent } from './components/code/article-code/article-code.component';
import { TourHorlogeComponent } from './components/code/tour-horloge/tour-horloge.component';
import { MairieIssoireComponent } from './components/code/mairie-issoire/mairie-issoire.component';
import { DetailItineraryComponent } from './components/parcours/detail-itinerary/detail-itinerary.component';
import { SpotlightComponent } from './components/parcours/spotlight/spotlight.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { PasswordComponent } from './components/accueil/password/password.component';
import { ListLabelComponent } from './components/parcours/list-label/list-label.component';
import { ListMaternelleComponent } from './components/parcours/list-maternelle/list-maternelle.component';
import { ListPrimaireComponent } from './components/parcours/list-primaire/list-primaire.component';
import { ListCollegeComponent } from './components/parcours/list-college/list-college.component';
import { ContactComponent } from './components/contact/contact.component';
import { ListShopComponent } from './components/shop/list-shop/list-shop.component';
import { FormShopComponent } from './components/shop/form-shop/form-shop.component';
import { DetailArticleShopComponent } from './components/shop/detail-article-shop/detail-article-shop.component';
import { MessageShopComponent } from './components/shop/message-shop/message-shop.component';
import { HomeShopComponent } from './components/shop/home-shop/home-shop.component';
import { PendingAdComponent } from './components/shop/pending-ad/pending-ad.component';
import { FormMessageComponent } from './components/message/form-message/form-message.component';
import { ListMessageComponent } from './components/message/list-message/list-message.component';
import { DetailMessageComponent } from './components/message/detail-message/detail-message.component';
import { AnswerComponent } from './components/message/answer/answer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyArticleComponent } from './components/shop/my-article/my-article.component';
import { UpdateComponent } from './components/shop/update/update.component';
import { ListAdminComponent } from './components/blog/list-admin/list-admin.component';
import { FormAddPilComponent } from './components/pil/form-add-pil/form-add-pil.component';
import { ListPilForIdIComponent } from './components/pil/list-pil-for-id-i/list-pil-for-id-i.component';
// import { ShopComponent } from './components/services/shop/shop.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { LegalNoticeComponent } from './components/ui/legal-notice/legal-notice.component'


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WelcomePageComponent,
    FormulairePicComponent,
    ListeComponent,
    DetailComponent,
    LoginComponent,
    RegistrationComponent,
    LogoutComponent,
    FormulairePicComponent,
    ListePicComponent,
    DetailArticleComponent,
    FormulaireComponent,
    FormulaireArticleComponent,
    ListeArticleComponent,
    EditArticleComponent,
    PicByCityComponent,
    AccountComponent,
    ArticleCodeComponent,
    TourHorlogeComponent,
    MairieIssoireComponent,
    DetailItineraryComponent,
    SpotlightComponent,
    FooterComponent,
    PasswordComponent,
    ListLabelComponent,
    ListMaternelleComponent,
    ListPrimaireComponent,
    ListCollegeComponent,
    ContactComponent,
    ListShopComponent,
    FormShopComponent,
    DetailArticleShopComponent,
    MessageShopComponent,
    HomeShopComponent,
    PendingAdComponent,
    FormMessageComponent,
    ListMessageComponent,
    DetailMessageComponent,
    AnswerComponent,
    MyArticleComponent,
    UpdateComponent,
    ListAdminComponent,
    FormAddPilComponent,
    ListPilForIdIComponent,
    LegalNoticeComponent,
    // ShopComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
