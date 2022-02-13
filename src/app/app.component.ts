import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ThemeService } from './services/theme/theme.service';
import { TranslationService } from './services/translation/translation.service';
import { environment } from 'src/environments/environment';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
 
export class AppComponent 
{
    public title = 'Fire Skeleton';
    public update = false;
    public authenticated = false;
    public inProduction = environment.production;

    constructor(
        private updates: SwUpdate,
        private authService: AuthenticationService,
        private translationService: TranslationService,
        private themeService: ThemeService,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer)
    {
        translationService.bootstrap();

        this.bootstrapSwUpdates();

        this.bootstrapAuthentication();

        this.bootstrapIconRegistry();
    }

    ngOnInit() 
    {
    }

    ngAfterViewInit()
    {
        this.themeService.bootstrap();
    }



    private bootstrapSwUpdates(): void
    {
        this.updates.available.subscribe(event => 
            {
                if(environment.production == false)
                    console.log("spa update subscribed.");
    
                this.update = true;
    
                this.updates.activateUpdate().then(() => document.location.reload());
            });
    }

    private bootstrapAuthentication(): void
    {
        this.authService.userEmail.subscribe(email => {
            if(environment.production == false)
                console.log("authentication subscribed.");

            if (email) 
                this.authenticated = true;
            else 
                this.authenticated = false;
        });
    }


    private bootstrapIconRegistry(): void
    {
        if(environment.production == false)
            this.iconRegistry.addSvgIcon('dev-tools', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dev-tools.svg'));

        this.iconRegistry.addSvgIcon('am-light', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/am-light.svg'));
        this.iconRegistry.addSvgIcon('am-dark', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/am-dark.svg'));
        this.iconRegistry.addSvgIcon('add-light', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add-light.svg'));
        this.iconRegistry.addSvgIcon('add-dark', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add-dark.svg'));
        this.iconRegistry.addSvgIcon('my-info', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/info.svg'));
        
    }

}
