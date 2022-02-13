import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SnackBarComponent } from 'src/app/components/shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

    public alert: string = null;
    public recoverStatus: string;
   

    public recoverForm = new FormGroup({
        email     : new FormControl('',[
          Validators.required,
        ])
    });

    get email() { return this.recoverForm.get('email') }

    constructor(
        private authService: AuthenticationService,
        private translationService: TranslationService,
        private router: Router,
        private snackbar: MatSnackBar) 
    {
    }

    ngOnInit()
    {
        this.recoverForm.valueChanges.subscribe(status => {
            if (environment.production == false)
                console.log('registerForm subscribed');
                
            for (let controlKey in this.recoverForm.controls)
            {
                let control = this.recoverForm.get(controlKey);
                if (control.invalid && (control.dirty || control.touched))
                {
                    this.recoverStatus = 'INVALID';
                    return;
                }
                
            }

            this.recoverStatus = 'VALID';
        });
    }

    public async recover(): Promise<void>
    {
        let success = await this.authService.recoverPassword(this.email.value);
        if(success)
        {
            this.recoverStatus= 'SUCCESS';
            this.snackbar.openFromComponent(SnackBarComponent, {
                data: `an email to recover your password has been sent to ${this.email.value}`,
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
            this.recoverStatus= 'INVALID';

            this.translationService.update.subscribe(update => {
                if (environment.production == false)
                    console.log("alert translation subscribed");
                if (this.alert)
                    this.alert = this.translationService.get('authentication.invalidCredentials');       
            });
        }
    }


}
