define([
    "jscore/core",
    "./Settings/Settings",
    "container/api",
    'i18n!dashboard/dictionary.json',
], function (core, Settings, container, Dictionary) {
    return core.Widget.extend({

        id: 'SampleWidget',

        actions: [
            {
                name: Dictionary.get('widgetActions.refresh'),
                action: function () {
                    alert(Dictionary.get('widgetActions.refresh'));
                }
            },
            {
                name: Dictionary.get('widgetActions.anotherAction'),
                action: function () {
                    alert(Dictionary.get('widgetActions.anotherAction'));
                }
            }
        ],

        init: function (options) {
            this.backgroundColor = options.backgroundColor || '#ffffff';
            this.content = options.content || 'Content Text';
            this.header = options.item.header;
        },

        onViewReady: function () {
            this.getElement().setText(this.content);
            this.getElement().setStyle('text-align', 'justify');
        },

        onSettings: function () {
            this.settings = new Settings({content: this.content, header: this.header});
            container.getEventBus().publish("flyout:show", {
                header: "Sample Widget Settings",
                content: this.settings
            });

            this.settings.addEventHandler('apply', function (opts) {
                this.getElement().setText(opts.content);
                this.content = opts.content;
                this.header = opts.header;
                this.options.context.eventBus.publish('dashboard:header', this, this.header);
                this.closeSettings();
            }.bind(this));

        },

        closeSettings: function () {
            container.getEventBus().publish("flyout:hide");
        },

        toJSON: function () {
            return {
                content: this.content,
                backgroundColor: this.backgroundColor
            };
        }

    });
});
