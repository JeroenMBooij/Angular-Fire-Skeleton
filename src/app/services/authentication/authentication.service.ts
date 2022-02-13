import { Injectable } from '@angular/core';
import "firebase/auth";
import { AngularFireAuth } from '@angular/fire/auth';
import { AccountRegistration, AuthenticationClient, Credentials } from './authentication-client.generated';
import { environment } from 'src/environments/environment';
import * as lsKeys from 'src/app/common/constants/localstorage.constants';
import { BehaviorSubject } from 'rxjs';
import { AppUser } from 'src/app/models/authentication/app-user.model';
import { TranslationService } from '../translation/translation.service';
import { ServiceMessage } from 'src/app/models/ServiceMessage.model';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService 
{
    public userId: BehaviorSubject<string> = new BehaviorSubject("");
    public userEmail: BehaviorSubject<string> = new BehaviorSubject("");
    public username: BehaviorSubject<string> = new BehaviorSubject("");

    private user: any = null;

    constructor(
        private authClient: AuthenticationClient, 
        private fireAuth: AngularFireAuth,
        private translationService: TranslationService) 
    {
        this.fireAuth.authState.subscribe(user => {
            
            if(environment.production == false)
                console.log("authentication state subscribed.");

            if (user) 
            {
                this.userId.next(user.uid);
                this.userEmail.next(user.email);
                this.username.next(user.displayName);
                this.user = user;
            }
            else 
            {
                this.userId.next("");
                this.userEmail.next("");
                this.username.next("");
                this.user = null;
            }
        });
    }

    public async register(appUser: AppUser): Promise<boolean>
    {
        return await this.basicRegistration(appUser);
    }

    public async login(email: string, password: string): Promise<boolean>
    {
        return await this.basicLogin(email, password);
    }

    public async logout(): Promise<void>
    {
        await this.basicLogout();
    }

    public async manageAccount(oldPassword: string, newPassword: string): Promise<ServiceMessage>
    {
        return await this.basicManageAccount(oldPassword, newPassword);
    }
    
    public async recoverPassword(email: string): Promise<boolean>
    {
        return await this.basicRecoverPassword(email);
    }

    public async deleteAccount(password: string): Promise<boolean>
    {
        return await this.basicDeleteAccount(password);
    }

    private async basicRegistration(appUser: AppUser): Promise<boolean>
    {
        try
        {
            var userCredential = await this.fireAuth.createUserWithEmailAndPassword(appUser.email, appUser.password);

            await userCredential.user.updateProfile({displayName: appUser.username});
            this.username.next(appUser.username);

            return true;
        }
        catch(error)
        {
            if(environment.production == false)
                console.log(error);

            return false;
        }
    }

    private async basicLogin(email: string, password: string): Promise<boolean>
    {
        try
        {
            var userCredential = await this.fireAuth.signInWithEmailAndPassword(email, password);

            return true;
        }
        catch(error)
        {
            if(environment.production == false)
                console.log(error);

            return false;
        }
    }

    private async basicLogout(): Promise<void>
    {
        await this.fireAuth.signOut();
    }

    public async basicManageAccount(oldPassword: string, newPassword: string): Promise<ServiceMessage>
    {
        try
        {
            let correctOldPassword = await this.basicLogin(this.user.email, oldPassword);
            if (correctOldPassword == false)
                return new ServiceMessage(false, this.translationService.get('authentication.invalidCredentials'));

            await this.user.updatePassword(newPassword);

            let successMessage = this.translationService.get('authentication.passwordUpdated').replace('{email}', this.userEmail.value);
            return new ServiceMessage(true, successMessage);
        }
        catch(error)
        {
            if(environment.production == false)
                console.log(error);

                return new ServiceMessage(false, this.translationService.get('authentication.validPassword'));
        }
    }

    private async basicRecoverPassword(email: string): Promise<boolean>
    {
        try
        {
            await this.fireAuth.sendPasswordResetEmail(email);

            return true;
        }
        catch(error)
        {
            if(environment.production == false)
                console.log(error);

            return false;
        }
    }

    public async basicDeleteAccount(password: string): Promise<boolean>
    {
        let correctPassword = await this.basicLogin(this.user.email, password);
            if (correctPassword == false)
                return false;
        try
        {
            await this.user.delete();

            return true;
        }
        catch(error)
        {
            if(environment.production == false)
                console.log(error);

            return false;
        }
    }

    private async customRegistration(email: string, password): Promise<boolean>
    {
        try
        {
            let jwtToken = await new Promise<string>((resolve, reject) =>
            {  
                this.authClient.register(new AccountRegistration())
            });
        }
        catch(error)
        {
            if(environment.production == false)
                console.log(error);

            return false;
        }
    }

    private async customLogin(email: string, password: string): Promise<boolean>
    {
        try
        {
            let jwtToken = await new Promise<string>((resolve, reject) =>
            {  
                this.authClient.login(new Credentials({email: email, password: password}))
                        .subscribe(token =>  {
                            if(environment.production == false)
                                console.log("authentication client subscribed."); 

                            resolve(token);
                        },
                            error => reject(error)
                        );
            });

            localStorage.setItem(lsKeys.jwtTokenKey, jwtToken);
            
            var userCredential = await this.fireAuth.signInWithCustomToken(jwtToken);

            return true;
        }
        catch(error)
        {
            if(environment.production == false)
                console.log(error);

            return false;
        }
    }
    
    private async customLogout(): Promise<void>
    {
        await this.fireAuth.signOut();

        localStorage.removeItem(lsKeys.jwtTokenKey);
    }


}