define([
    'jscore/core',
    'layouts/LauncherTiles',
    '../../widgets/my-widget/MyWidget',
    './MainView',
    'i18n!metrics/dictionary.json'
], function (core, LauncherTiles, 
    LauncherControls, 
    View, dictionary) {
    'use strict';

    return core.Region.extend({

        View: View,

        onStart: function () {
            this.allApps = this.options.apps;
            var container = this.view.getContainer();

            this.controls = new LauncherControls({});
            // this.controls.addEventHandler(LauncherControls.prototype.VIEW_CHANGE, function () {
            //     this.updateAppTiles();
            //     this.savePreferences(true); // save preferred view quietly
            // }.bind(this));
            // this.controls.attachTo(container);

            this.launcherTiles = new LauncherTiles({});

            this.launcherTiles.addEventHandler(LauncherTiles.prototype.LAUNCHER_FAVORITE, function (app) {
                if (this.isShowOnlyFavorites()) {
                    this.updateAppTiles();
                }
                this.savePreferences();
            }.bind(this));

            this.launcherTiles.addEventHandler(LauncherTiles.prototype.LAUNCHER_LAUNCH, function (app) {
                // can track last time appName was launched, etc.
            });
            this.launcherTiles.attachTo(container);

            this.updateAppTiles();
        },

        onStop: function () {
            this.view.destroy(); // regions with uit views should call view.destroy()
        },

        updateAppTiles: function () {
        //     this.hideMessage();

             var appsToShow;
            if (this.isShowOnlyFavorites()) {
                appsToShow = this.allApps.filter(function (app) {
                    return app.favorite;
                });
            }
            else {
                appsToShow = this.allApps;
            }

            this.controls.setAppCount(appsToShow.length, this.allApps.length);

            this.launcherTiles.setOptions({
                apps: appsToShow,
                showFavorites: true
            });

            if (this.allApps.length === 0) {
                this.showMessage("error", Dictionary.get('errorNoAppsTitle'), Dictionary.get('errorNoAppsDescription'));
            }
            else if (appsToShow.length === 0) {
                this.showMessage("dialogInfo", Dictionary.get('infoNoFavoriteAppsTitle'), Dictionary.get('infoNoFavoriteAppsDescription'));
            }
        },

        isShowOnlyFavorites: function () {
            return this.controls.isShowOnlyFavorites();
        },
    });
});
