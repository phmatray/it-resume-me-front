// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'default',
  firebase: {
    config: {
      apiKey: 'AIzaSyBpEC3EM2Tu8Db_QS7RcGUqAgtPupAmNJo',
      authDomain: 'courseapp-1ac01.firebaseapp.com',
      projectId: 'courseapp-1ac01',
      storageBucket: 'courseapp-1ac01.appspot.com',
      messagingSenderId: '1000527886313',
      appId: '1:1000527886313:web:74eb94902833427d0b7d78'
    },
    actionCodeSettings: {
      url: 'http://localhost:5200/profile/new',
      handleCodeInApp: true
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
