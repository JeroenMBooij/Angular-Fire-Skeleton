// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBtmCJxbdeQTQEsI0T8e-xBbKoGRH-LUZ0",
    authDomain: "starter-1c7d5.firebaseapp.com",
    projectId: "starter-1c7d5",
    storageBucket: "starter-1c7d5.appspot.com",
    messagingSenderId: "881006190092",
    appId: "1:881006190092:web:16e42cc5fd7c157ab2d829",
    measurementId: "G-6PWFVHMVFH"
  },
  authenticationClient: {
      baseUrl: "https://localhost:44389"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
