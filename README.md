# Angular PWA Firebase Starter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.1 and configured with:

* Firebase (version 8)
* ServiceWorkerModule (PWA)
* TranslateService
  * [ngx translate core](https://github.com/ngx-translate/core)
  * [ngx translate extract](https://github.com/biesbjerg/ngx-translate-extract)
* ThemeService
  * Angular Material
* AngularFireAnalyticsModule

## Development server

Edit enviroment.ts with your firebase connection settings ([Firebase Console](https://console.firebase.google.com/u/0/))

```
firebase: {   
	apiKey: "",   
	authDomain: "",   
	projectId: "",   
	storageBucket: "",   
	messagingSenderId: "",   
	appId: "",   
	measurementId: ""   
}
```

Enable email/password authentication in your Firebase Console

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
