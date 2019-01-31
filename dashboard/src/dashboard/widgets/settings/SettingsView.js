define([
    "jscore/core",
    "template!./_settings.hbs",
    'styles!./_settings.less'
], function (core, template, styles) {

    var _prefix = '.eaDashboard-wSettings';

    return core.View.extend({

        getTemplate: function () {
            return template(this.options);
        },
        getStyle: function () {
            return styles;
        },
        getContent: function () {
            return this.getElement().find(_prefix + '-content');
        },
        getApplyButton: function () {
            return this.getElement().find(_prefix + '-apply');
        },
        getCancelButton: function () {
            return this.getElement().find(_prefix + '-cancel');
        }
    });
});
