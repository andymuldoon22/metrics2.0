define([
    "jscore/core",
    "./SettingsView",
    'i18n!dashboard/dictionary.json'
], function (core, View, dictionary) {
    return core.Widget.extend({

        view: function () {
            return new View({i18n: dictionary.updates});
        },

        onViewReady: function () {
            this.view.getTextArea().setText(this.options.content);
            this.view.getInput().setValue(this.options.header);

            this.view.getApplyButton().addEventHandler('click', function () {
                this.trigger('apply', {
                    header: this.view.getInput().getValue(),
                    content: this.view.getTextArea().getValue()
                });
            }.bind(this));
        }

    });
});
