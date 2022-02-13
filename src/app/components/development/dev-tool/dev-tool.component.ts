import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/authentication/app-user.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-dev-tool',
  templateUrl: './dev-tool.component.html',
  styleUrls: ['./dev-tool.component.scss']
})
export class DevToolComponent implements OnInit {

    public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

    constructor(
        private authService: AuthenticationService,
        private snackbar: MatSnackBar,
        private router: Router,
        private themeService: ThemeService) 
        { 
        }

    private testUser: AppUser = new AppUser('Timmeh', 'test@test.test', 'test1234');

    ngOnInit(): void 
    {
    }

    ngAfterViewInit() 
    {
        
        let drawer = (document.getElementsByClassName('mat-drawer-inner-container') as HTMLCollectionOf<HTMLElement>)[0];

        //TODO proper css mat-drawer-inner-container styling
        // dirty work around, because editing mat-drawer-inner-container in css does not work for some reason
        drawer.style.maxHeight = '80vh';
        /////////////////////////////////
    }

    ngOnDestroy() {
    }


    public toggle(state: string): void
    {
        
    }

    public async loginTestUser(): Promise<void>
    {
        let success = await this.authService.login(this.testUser.email, this.testUser.password);
        if (success == false)
        {
            this.snackbar.openFromComponent(SnackBarComponent, {
                data: 'TestUser does not exists',
                duration: 5000,
                panelClass: ['mat-toolbar', 'mat-accent']
            });      
        }      

        //navigate to home page
        this.router.navigate(['']);
        ``
    }

    public async createTestUser(): Promise<void>
    {
        let success = await this.authService.register(this.testUser);
        if(success)
        {
            this.snackbar.openFromComponent(SnackBarComponent, {
                data: 'TestUser is created',
                duration: 5000,
                panelClass: ['mat-toolbar', 'mat-accent']
            });

            //navigate to home page
            this.router.navigate(['']);
        }
        else
        {
            this.snackbar.openFromComponent(SnackBarComponent, {
                data: 'TestUser already exists',
                duration: 5000,
                panelClass: ['mat-toolbar', 'mat-accent']
            });
        }
    }

    public async deleteTestUser(): Promise<void>
    {
        let success = await this.authService.deleteAccount(this.testUser.password);
        if(success)
        {
            this.snackbar.openFromComponent(SnackBarComponent, {
                data: 'TestUser is deleted',
                duration: 5000,
                panelClass: ['mat-toolbar', 'mat-accent']
            });

            //navigate to home page
            this.router.navigate(['/login']);
        }
        else
        {
            this.snackbar.openFromComponent(SnackBarComponent, {
                data: 'TestUser does not exists',
                duration: 5000,
                panelClass: ['mat-toolbar', 'mat-accent']
            });
        }
    }


}
