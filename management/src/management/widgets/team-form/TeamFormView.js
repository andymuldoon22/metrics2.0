define([
    'jscore/core',
    'template!./_myForm.hbs'
], function (core, template) {

    return core.View.extend({

        getTemplate: function () {
            return template(this.options);
        }

    });

});
