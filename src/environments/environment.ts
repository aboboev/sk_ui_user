// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    server: 'http://127.0.0.1:8000',
    pusher_app_key: '94252f3d48a1de771d1a',
    pusher_app_cluster: 'ap1'
    // production: true,
    // server: 'http://167.86.101.115',
    // pusher_app_key: '94252f3d48a1de771d1a',
    // pusher_app_cluster: 'ap1'
};

/*
* In development mode, to ignore zone related error stack frames such as
* `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
* import the following file, but please comment it out in production mode
* because it will have performance impact when throw error
*/
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
