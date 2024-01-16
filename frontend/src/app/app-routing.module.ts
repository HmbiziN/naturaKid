import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/accueil/account/account.component';
import { LoginComponent } from './components/accueil/login/login.component';
import { LogoutComponent } from './components/accueil/logout/logout.component';
import { PasswordComponent } from './components/accueil/password/password.component';
import { RegistrationComponent } from './components/accueil/registration/registration.component';
import { WelcomePageComponent } from './components/accueil/welcome-page/welcome-page.component';
import { DetailArticleComponent } from './components/blog/detail-article/detail-article.component';
import { EditArticleComponent } from './components/blog/edit-article/edit-article.component';
import { FormulaireArticleComponent } from './components/blog/formulaire-article/formulaire-article.component';
import { ListAdminComponent } from './components/blog/list-admin/list-admin.component';
import { ListeArticleComponent } from './components/blog/liste-article/liste-article.component';
import { ArticleCodeComponent } from './components/code/article-code/article-code.component';
import { MairieIssoireComponent } from './components/code/mairie-issoire/mairie-issoire.component';
import { TourHorlogeComponent } from './components/code/tour-horloge/tour-horloge.component';
import { ContactComponent } from './components/contact/contact.component';
import { AnswerComponent } from './components/message/answer/answer.component';
import { DetailMessageComponent } from './components/message/detail-message/detail-message.component';
import { FormMessageComponent } from './components/message/form-message/form-message.component';
import { ListMessageComponent } from './components/message/list-message/list-message.component';
import { DetailComponent } from './components/parcours/detail/detail.component';
import { FormulaireComponent } from './components/parcours/formulaire/formulaire.component';
import { ListCollegeComponent } from './components/parcours/list-college/list-college.component';
import { ListLabelComponent } from './components/parcours/list-label/list-label.component';
import { ListMaternelleComponent } from './components/parcours/list-maternelle/list-maternelle.component';
import { ListPrimaireComponent } from './components/parcours/list-primaire/list-primaire.component';
import { ListeComponent } from './components/parcours/liste/liste.component';
import { SpotlightComponent } from './components/parcours/spotlight/spotlight.component';
import { FormulairePicComponent } from './components/pic/formulaire-pic/formulaire-pic.component';
import { ListePicComponent } from './components/pic/liste-pic/liste-pic.component';
import { FormAddPilComponent } from './components/pil/form-add-pil/form-add-pil.component';
import { AuthGuardService } from './components/services/auth-guard.service';
import { GuardAdminService } from './components/services/guard-admin.service';
import { DetailArticleShopComponent } from './components/shop/detail-article-shop/detail-article-shop.component';
import { FormShopComponent } from './components/shop/form-shop/form-shop.component';
import { HomeShopComponent } from './components/shop/home-shop/home-shop.component';
import { ListShopComponent } from './components/shop/list-shop/list-shop.component';
import { PendingAdComponent } from './components/shop/pending-ad/pending-ad.component';
import { UpdateComponent } from './components/shop/update/update.component';
import { LegalNoticeComponent } from './components/ui/legal-notice/legal-notice.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:'accueil'},
  // login logout
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGuardService]},
  { path: 'password', component: PasswordComponent,canActivate:[AuthGuardService]},
  // page
  { path: 'accueil', component: WelcomePageComponent},
  // parcours
  { path: 'add_road', component: FormulaireComponent,canActivate:[AuthGuardService]},
  { path: 'list_road', component: ListeComponent},
  { path: 'detail', component: DetailComponent},
  { path: 'spotlight', component: SpotlightComponent},
  { path: 'label', component: ListLabelComponent},
  { path: 'maternelle', component: ListMaternelleComponent},
  { path: 'primaire', component: ListPrimaireComponent},
  { path: 'college', component: ListCollegeComponent},
  // pic
  { path: 'add_pic', component: FormulairePicComponent,canActivate:[AuthGuardService, GuardAdminService]},
  { path: 'list_pic', component: ListePicComponent,canActivate:[AuthGuardService, GuardAdminService]},
  // blog
  { path: 'add_article', component: FormulaireArticleComponent,canActivate:[AuthGuardService, GuardAdminService]},
  { path: 'list_article', component: ListeArticleComponent},
  { path: 'detail_article', component: DetailArticleComponent},
  { path: 'edit_article', component: EditArticleComponent,canActivate:[AuthGuardService, GuardAdminService]},
  { path: 'list_admin', component: ListAdminComponent,canActivate:[AuthGuardService, GuardAdminService]},
  // account
  { path: 'my_account', component: AccountComponent },
  // code
  { path: 'quizz_abbatiale', component: ArticleCodeComponent },
  { path: 'quizz_tour_horloge', component: TourHorlogeComponent },
  { path: 'quizz_hotel_ville_issoire', component: MairieIssoireComponent },
  // contact
  { path: 'contact', component: ContactComponent},
  // shop
  { path: 'list_products', component: ListShopComponent},
  { path: 'add_product', component: FormShopComponent, canActivate:[AuthGuardService]},
  { path: 'detail_product', component: DetailArticleShopComponent},
  { path: 'shop', component: HomeShopComponent,canActivate:[AuthGuardService]},
  { path: 'to_confirm', component: PendingAdComponent,canActivate:[AuthGuardService, GuardAdminService]},
  { path: 'update', component: UpdateComponent, canActivate:[AuthGuardService]},
  // message
  { path: 'new_message', component: FormMessageComponent, canActivate:[AuthGuardService]},
  { path: 'messages', component: ListMessageComponent, canActivate:[AuthGuardService]},
  { path: 'detail_message', component: DetailMessageComponent, canActivate:[AuthGuardService]},
  { path: 'answer', component: AnswerComponent, canActivate:[AuthGuardService]},
  // pil
  { path: 'new_pil', component: FormAddPilComponent},
  // rgpd
  { path: "page_mention", component: LegalNoticeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
