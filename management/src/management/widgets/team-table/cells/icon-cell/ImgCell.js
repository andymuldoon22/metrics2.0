/*global define*/
define([
    'tablelib/Cell',
    './ImgCellView'
], function (Cell, View) {
    'use strict';

    return Cell.extend({

        // root element must be a <td>
        view: function () {
            var attr = this.getColumnDefinition().attribute;
            var avatar = this.getRow().getData()[attr];

            return new View({
                avatar: avatar
            });
        },

        setValue: function () {
        }

    });
});
