define([
    'jscore/core',
    'layouts/LauncherTiles',
    'i18n!metrics/dictionary.json',
    './regions/main/Main'
], function (core,LauncherTiles, dictionary, Main) {
    'use strict';

    return core.App.extend({

        /**
         * Called when the app is first instantiated in the current tab for the first time.
         */
        onStart: function () {
            console.log('metrics 3');
            var launcherTiles = new LauncherTiles({
                apps: [{
                    appName: 'app1',
                    title: 'My Application',
                    subtitle: 'App Group',
                    url: '#app1',
                    icon: 'network',
                    color: '#7b0663',
                    description: 'For network specialists who monitor network performance lorem ipsum...',
                    favorite: true
                }, {
                    appName: 'app2',
                    title: 'Other Application',
                    subtitle: 'App Group',
                    url: '#app2',
                    icon: 'user',
                    color: '#00625f',
                    description: 'For customer service representatives who receive calls lorem ipsum...',
                    favorite: false
                }],
                showFavorites: true
            });
            
            // Not using TopSection - no need for title or breadcrumbs
            this.main = new Main({
                context: this.getContext(),
                apps: [{
                    appName: 'app1',
                    title: 'My Application',
                    subtitle: 'App Group',
                    url: '#app1',
                    icon: 'network',
                    color: '#7b0663',
                    description: 'For network specialists who monitor network performance lorem ipsum...',
                    // favorite: true
                }, {
                    appName: 'app2',
                    title: 'Other Application',
                    subtitle: 'App Group',
                    url: '#app2',
                    icon: 'user',
                    color: '#00625f',
                    description: 'For customer service representatives who receive calls lorem ipsum...',
                    // favorite: false
                }],
                showFavorites: false
            });
            this.main.start(this.getElement());
            var eventBus = this.getEventBus();
    
            // // The app should should take 100% of available space
            // // so the background can be displayed full screen.
            // this.getElement().setStyle({
            //     position: "relative",
            //     width: "100%",
            //     height: "100%"
            // });

            // //TODO Normally get this app list from a REST call that returns only apps the user is allowed to access based on user role, license, etc.
            // this.apps = [
            //     {
            //         "appName": "alarmMonitor",
            //         "title": "Alarm Monitor",
            //         "subtitle": "Monitoring",
            //         "url": "#alarmmonitor",
            //         "icon": "eye",
            //         "color": "#ff7600",
            //         "description": "Analyze alarms, filtered by severity.",
            //         "favorite": true
            //     },
            //     {
            //         "appName": "userManagement",
            //         "title": "User Management",
            //         "subtitle": "Security",
            //         "url": "#usermanagement",
            //         "icon": "lock",
            //         "color": "#3385c2",
            //         "description": "Manage user profiles.",
            //         "favorite": false
            //     }
            // ];

            // /* Apps are displayed in order provided.
            //  If desired, sort apps by subtitle grouping first, then by title:
            //  this.apps.sort(function (a, b) {
            //  // Place empty subtitles last, opposite of normal sort
            //  if (!a.subtitle && b.subtitle) return 1;
            //  if (a.subtitle && !b.subtitle) return -1;

            //  var comparisonResult = a.subtitle.localeCompare(b.subtitle);
            //  if (comparisonResult === 0) {
            //  comparisonResult = a.title.localeCompare(b.title);
            //  }
            //  return comparisonResult;
            //  });
            //  */

            // // Not using TopSection - no need for title or breadcrumbs
            // this.main = new Main({
            //     context: this.getContext(),
            //     apps: this.apps
            // });
            // this.main.start(this.getElement());
        }

    });

});

// define([
//     'jscore/core',
//     'widgets/InlineMessage',
//     './regions/main/Main'
// ], function (core, InlineMessage, Main) {

//     return core.App.extend({

//         onStart: function () {

//             // The app should should take 100% of available space
//             // so the background can be displayed full screen.
//             this.getElement().setStyle({
//                 position: "relative",
//                 width: "100%",
//                 height: "100%"
//             });

//             //TODO Normally get this app list from a REST call that returns only apps the user is allowed to access based on user role, license, etc.
//             this.apps = [
//                 {
//                     "appName": "alarmMonitor",
//                     "title": "Alarm Monitor",
//                     "subtitle": "Monitoring",
//                     "url": "#alarmmonitor",
//                     "icon": "eye",
//                     "color": "#ff7600",
//                     "description": "Analyze alarms, filtered by severity.",
//                     "favorite": true
//                 },
//                 {
//                     "appName": "userManagement",
//                     "title": "User Management",
//                     "subtitle": "Security",
//                     "url": "#usermanagement",
//                     "icon": "lock",
//                     "color": "#3385c2",
//                     "description": "Manage user profiles.",
//                     "favorite": false
//                 }
//             ];

//             /* Apps are displayed in order provided.
//              If desired, sort apps by subtitle grouping first, then by title:
//              this.apps.sort(function (a, b) {
//              // Place empty subtitles last, opposite of normal sort
//              if (!a.subtitle && b.subtitle) return 1;
//              if (a.subtitle && !b.subtitle) return -1;

//              var comparisonResult = a.subtitle.localeCompare(b.subtitle);
//              if (comparisonResult === 0) {
//              comparisonResult = a.title.localeCompare(b.title);
//              }
//              return comparisonResult;
//              });
//              */

//             // Not using TopSection - no need for title or breadcrumbs
//             // this.main = new Main({
//             //     context: this.getContext(),
//             //     apps: this.apps
//             // });
//             // this.main.start(this.getElement());
//         },

//         onResume: function () {

//         },

//         onPause: function () {

//         },

//         onBeforeLeave: function () {

//         }
//     });

// });

