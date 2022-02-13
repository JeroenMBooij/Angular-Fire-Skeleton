import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CONFIRM } from 'src/app/common/constants/angular.constants';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { environment } from 'src/environments/environment';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'manage-account',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageAccountComponent implements OnInit {

    public alert: string = null;
    public manageStatus: string;

    public manageAccountForm = new FormGroup({
        oldPassword     : new FormControl('',[
          Validators.required,
        ]),
        newPassword  : new FormControl('',[
          Validators.required
        ]),
    });

    get currentPassword() { return this.manageAccountForm.get('oldPassword') }

    get newPassword() { return this.manageAccountForm.get('newPassword') }

    constructor(
        private authService: AuthenticationService,
        private translationService: TranslationService,
        private router: Router,
        private snackbar: MatSnackBar,
        private dialog: MatDialog) 
    {
    }

    ngOnInit(): void 
    {
        this.manageAccountForm.valueChanges.subscribe(status => {
            if (environment.production == false)
                console.log('registerForm subscribed');
                
            for (let controlKey in this.manageAccountForm.controls)
            {
                let control = this.manageAccountForm.get(controlKey);
                if (control.invalid && (control.dirty || control.touched))
                {
                    this.manageStatus = 'INVALID';
                    return;
                }
                
            }

            this.manageStatus = 'VALID';
        });
    }

    public async manageAccount(): Promise<void>
    {
        let serviceMessage = await this.authService.manageAccount(this.currentPassword.value, this.newPassword.value);
        if(serviceMessage.success)
        {
            this.manageStatus= 'SUCCESS';
            
            this.snackbar.openFromComponent(SnackBarComponent, {
                data: serviceMessage.content,
                duration: 5000,
                panelClass: ['mat-toolbar', 'mat-accent']
            });
        }
        else
        {
            // display error message
            this.alert = serviceMessage.content;
            this.manageStatus= 'INVALID';

            this.translationService.update.subscribe(update => {
                if (environment.production == false)
                    console.log("alert translation subscribed");
                if (this.alert)
                    this.alert = this.translationService.get('authentication.invalidCredentials');       
            });
        }
    }

    public async deleteAccount(): Promise<void>
    {
        let dialogReference = this.dialog.open(ConfirmationDialogComponent, {
            width: "600px",
            data: { 
                message: `${this.translationService.get('input.deleteNotDelete').replace("{email}", this.authService.userEmail.value)}?`
            }
        });

        dialogReference.afterClosed().subscribe(async result => {
           if (result == CONFIRM)
           {
                let success = await this.authService.deleteAccount(this.currentPassword.value);
                if(success)
                {
                    this.snackbar.openFromComponent(SnackBarComponent, {
                        data: `${this.authService.userEmail.value} ${this.translationService.get('input.accountDeleted')}.`,
                        duration: 5000,
                        panelClass: ['mat-toolbar', 'mat-accent']
                    });

                    //navigate to home page
                    this.router.navigate(['']);
                }
                else
                {
                    // display error message
                    this.alert = this.translationService.get('authentication.invalidCredentials');
                    this.translationService.update.subscribe(update => {
                        if (environment.production == false)
                            console.log("alert translation subscribed");
                        if (this.alert)
                            this.alert = this.translationService.get('authentication.invalidCredentials');       
                    });
                }
            }
        });
    }


  

}
