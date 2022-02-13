import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { DeckOverviewComponent } from './components/decks/deck-overview/deck-overview.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { RecoverComponent } from './components/authentication/recover/recover.component';
import { ManageAccountComponent } from './components/authentication/manage/manage.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
    {
        path: 'login', 
        component: LoginComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectLoggedInToHome }
    },
    {
        path: 'register', 
        component: RegisterComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectLoggedInToHome }
    },
    {
        path: 'account/recover', 
        component: RecoverComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectLoggedInToHome }
    },
    {
        path: '', 
        component: HomeComponent,
        children: [
            {
                path: '', 
                component: DeckOverviewComponent,
                canActivate: [AngularFireAuthGuard],
                data: { authGuardPipe: redirectUnauthorizedToLogin }
            },
            {
                path: 'account/management', 
                component: ManageAccountComponent, 
                canActivate: [AngularFireAuthGuard],
                data: { authGuardPipe: redirectUnauthorizedToLogin }
            },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
