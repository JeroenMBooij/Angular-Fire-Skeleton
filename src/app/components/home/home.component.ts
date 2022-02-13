import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { Router } from '@angular/router';
import { revealAnimation } from 'src/app/common/animations/reveal.animation';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { environment } from 'src/environments/environment';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [revealAnimation]
})
export class HomeComponent implements OnInit {

    public username: string;
    public amTheme: string;

    constructor(
        private authService: AuthenticationService,
        private translationService: TranslationService,
        private themeService: ThemeService,
        private router: Router) 
    { 
    }

    ngOnInit(): void 
    {
        this.authService.username.subscribe(username => {
            if(environment.production == false)
                console.log("display authentication subscribed");
                
            this.username = username;
        });

        //TODO proper css mat-drawer-inner-container styling
        // dirty work around, because editing mat-drawer-inner-container in css does not work for some reason
        let drawerindex = 0;
        if (environment.production == false)
            drawerindex = 1;

        let drawer = (document.getElementsByClassName('mat-drawer-inner-container') as HTMLCollectionOf<HTMLElement>)[drawerindex];
        drawer.classList.add('d-flex');
        drawer.style.maxHeight = 'calc(100vh - var(--header-height))';
        //
    }

    ngAfterViewInit() 
    {
        this.themeService.update.subscribe(update => {
            this.amTheme = `am-${update.replace('-theme', '')}`;
        });
    }

    public toggle(state: string): void
    {
    }

    public useLanguage(language: string): void
    {
        this.translationService.setLanguage(language);
    }

    public async logout(): Promise<void>
    {
        await this.authService.logout();
        this.router.navigate(['login']);
    }

}
