import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public alert: string = null;
    public loginStatus: string;
   

    public loginForm = new FormGroup({
        email     : new FormControl('',[
          Validators.required,
        ]),
        password  : new FormControl('',[
          Validators.required
        ]),
    });

    get email() { return this.loginForm.get('email') }

    get password() { return this.loginForm.get('password') }

    constructor(
        private authService: AuthenticationService,
        private translationService: TranslationService,
        private router: Router) 
    {
    }

    ngOnInit(): void 
    {
        this.loginForm.valueChanges.subscribe(status => {
            if (environment.production == false)
                console.log('registerForm subscribed');
                
            for (let controlKey in this.loginForm.controls)
            {
                let control = this.loginForm.get(controlKey);
                if (control.invalid && (control.dirty || control.touched))
                {
                    this.loginStatus = 'INVALID';
                    return;
                }
                
            }

            this.loginStatus = 'VALID';
        });
    }

    public async login(): Promise<void>
    {
        let success = await this.authService.login(this.email.value, this.password.value);
        if(success)
        {
            this.loginStatus= 'SUCCESS';
            //navigate to home page
            this.router.navigate(['']);
        }
        else
        {
            // display error message
            this.alert = this.translationService.get('authentication.invalidCredentials');
            this.loginStatus= 'INVALID';

            this.translationService.update.subscribe(update => {
                if (environment.production == false)
                    console.log("alert translation subscribed");
                if (this.alert)
                    this.alert = this.translationService.get('authentication.invalidCredentials');       
            });
        }
    }
}
