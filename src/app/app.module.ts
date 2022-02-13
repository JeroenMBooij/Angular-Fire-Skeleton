import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AUTHENTICATION_API_BASE_URL } from './services/authentication/authentication-client.generated';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import { MaterialModule } from './common/modules/material.module';
import { ReactiveModule } from './common/modules/reactive.module';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { DeckOverviewComponent } from './components/decks/deck-overview/deck-overview.component';
import { MainButtonComponent } from './components/shared/main-button/main-button.component';
import { ThemeSwitchComponent } from './components/shared/theme-switch/theme-switch.component';
import { LanguageSwitchComponent } from './components/shared/language-switch/language-switch.component';
import { RecoverComponent } from './components/authentication/recover/recover.component';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { ManageAccountComponent } from './components/authentication/manage/manage.component';
import { HomeComponent } from './components/home/home.component';
import { DevToolComponent } from './components/development/dev-tool/dev-tool.component';
import { RobotComponent } from './components/shared/three/robot/robot.component';
import { GlLodComponent } from './components/shared/three/gl-lod/gl-lod.component';
import { InputDialogComponent } from './components/shared/input-dialog/input-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DeckOverviewComponent,
    MainButtonComponent,
    ThemeSwitchComponent,
    LanguageSwitchComponent,
    RecoverComponent,
    ConfirmationDialogComponent,
    ManageAccountComponent,
    HomeComponent,
    DevToolComponent,
    RobotComponent,
    GlLodComponent,
    InputDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    MaterialModule,
    ReactiveModule,
  ],
  providers: [
      { provide: AUTHENTICATION_API_BASE_URL, useValue: environment.authenticationClient.baseUrl }
    ],
  bootstrap: [AppComponent]
})

export class AppModule { }


export function HttpLoaderFactory (http: HttpClient): TranslateHttpLoader
{
    return new TranslateHttpLoader(http);
}