define([
    'jscore/core',
    './MyFormView',
    'template!./_myForm.xml',
    'layouts/Form',
    'formvalidator/Validator',
    'i18n!form-example/dictionary.json'
], function (core, View, FormTemplate, Form, FormValidator, dictionary) {

    return core.Widget.extend({

        view: function () {
            return new View({
                i18n: {
                    message: dictionary.get('message')
                }
            });
        },

        onViewReady: function () {
            // Used by this example to keep track of the editable
            // state of the form.
            this._editable = true;

            // Instantiate a new instance of the form, passing the template for it.
            // Note how we can use Handlebars to load our form template in order
            // to support internationalisation.
            this.form = new Form({
                content: FormTemplate(dictionary), //not safe i18n, safe retrieval on key by key basis, too many keys required
                labels: {
                    add: dictionary.get('f.labels.add'),
                    empty: dictionary.get('f.labels.empty')
                }
            });
            this.form.attachTo(this.getElement());

            // The form validator is fully compatible with the form layout.
            this.formValidator = new FormValidator();

            // The form layout allows us to fetch the metadata for each of the forms
            // by using a JSON path. In this case, we want to add a validation rule
            // for the input field with the required symbol. We can fetch that input field
            // and then register it with the form validator.
            var inputField = this.form.getField('input');

            // The first argument of addField expects normally a selector, however since
            // we're defining the element attribute, we can pass a unique identifier instead.
            // Each form element has an 'iid' identifier to identify the element instance.
            // It is guaranteed to be unique within the form. Then we use the 'input' property
            // which gives a reference to the DOM element or widget that the Form Layout is using.
            this.formValidator.addField(inputField.iid, {
                element: inputField.input,
                validation: {
                    validate: function (field, callbacks) {
                        if (field.getValue() === '') {
                            callbacks.error(dictionary.get('requiredMissing'));
                        } else {
                            callbacks.success();
                        }
                    }
                }
            });
        },

        validate: function () {
            // Triggers the validation for the form.
            this.formValidator.checkValidity({
                success: function () {
                }
            });
        },

        serialize: function () {
            return JSON.stringify(this.form.getData(), null, 4);
        },

        deserialize: function (data) {
            this.form.setData(JSON.parse(data));
        },

        toggleEditable: function () {
            this._editable = !this._editable;
            this.form.setEditable(this._editable);
        },

        reset: function () {
            this.form.reset();
        }
    });
});
