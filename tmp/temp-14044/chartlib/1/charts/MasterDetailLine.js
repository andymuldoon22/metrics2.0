/* Copyright (c) Ericsson 2019 */

define("styles!chartlib/charts/masterdetailline/_masterDetailLine.less",function(){return".elChartlib-wMasterDetailLine {\n  position: relative;\n  height: 100%;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  cursor: default;\n}\n.elChartlib-wMasterDetailLine-master {\n  position: relative;\n}\n.elChartlib-wMasterDetailLine-master .elChartlib-wMasterDetailLine-slidingWindow,\n.elChartlib-wMasterDetailLine-master .elChartlib-wMasterDetailLine-overviewChart {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  padding: 0 36px;\n}\n.elChartlib-wMasterDetailLine-master .elChartlib-wMasterDetailLine-slidingWindow {\n  right: 4.32px;\n}\n.elChartlib-wMasterDetailLine-master .elChartlib-wMasterDetailLine-overviewChart {\n  right: 0;\n}\n"}),define("text!chartlib/charts/masterdetailline/_masterDetailLine.html",function(){return'<div class="elChartlib-wMasterDetailLine">\r\n    <section class="elChartlib-wMasterDetailLine-detail"></section>\r\n    <section class="elChartlib-wMasterDetailLine-master">\r\n        <div class="elChartlib-wMasterDetailLine-overviewChart"></div>\r\n        <div class="elChartlib-wMasterDetailLine-slidingWindow"></div>\r\n    </section>\r\n</div>'}),define("chartlib/charts/masterdetailline/MasterDetailLineView",["jscore/core","text!./_masterDetailLine.html","styles!./_masterDetailLine.less"],function(t,e,i){"use strict";var n=".elChartlib-wMasterDetailLine";return t.View.extend({CLASS_NAME:n.substring(0),getTemplate:function(){return e},getStyle:function(){return i},getDetailHolder:function(){return this.getElement().find(n+"-detail")},getMasterHolder:function(){return this.getElement().find(n+"-master")},getMasterOverviewChartHolder:function(){return this.getElement().find(n+"-overviewChart")},getMasterWindowHolder:function(){return this.getElement().find(n+"-slidingWindow")}})}),define("chartlib/charts/masterdetailline/MasterDetailLine",["jscore/core","jscore/ext/utils","jscore/ext/privateStore","chartlib/base/d3","chartlib/charts/Line","chartlib/widgets/SlidingWindow","./MasterDetailLineView"],function(t,e,i,n,a,r,s){"use strict";function l(t){P(this).data=t}function o(){return{min:P(this).minX,max:P(this).maxX}}function h(){var t=this.getData(),e=n.min(t,function(t){return n.min(t.data.map(x))}),i=n.max(t,function(t){return n.max(t.data.map(x))});P(this).minX=W(e),P(this).maxX=W(i)}function d(){p.call(this)}function c(t){var i,n,r=this.options,s=this.getData(),l=r.getData,o="function"==typeof l;if(o&&r.fullCallbackControl===!0)i=l(t,P(this).slidingWindow.getPanelPosition());else{n=o?l(t,P(this).slidingWindow.getPanelPosition()):s,i=n.map(function(e){return{label:e.label,visible:e.visible,data:e.data.filter(function(e){var i=E(e);return i>=t.start&&i<=t.end})}});var h=i.some(function(t){return t.data.length>=2}),d=i.some(function(t){return t.data.length<2}),c=!n.some(function(t){return t.data.length<2});if(d)return c||h?void u.call(this,t):void this.setPanelPosition({start:0,end:100})}if(P(this).displayRange=t,void 0===P(this).detailsLineChart){var g=e.clone(r,!0);g.chart=g.chart?g.chart:{margin:{left:5,right:5,bottom:5}},g.element=this.view.getDetailHolder(),g.data=i,g.legend=!1,P(this).detailsLineChart=new a(g)}else P(this).detailsLineChart.update(i);D.call(this)}function u(t){var e=P(this).displayRange;if(!e)return this.setPanelPosition({start:0,end:100}),void console.error("Too short of a window on load, setting range to 100%");var i=this.options.getData,a="function"==typeof i?i(t,P(this).slidingWindow.getPanelPosition()):this.getData(),r=t.start>e.start,s=e.end-e.start===t.end-t.start;s&&(r=!r);var l=a.reduce(function(e,i){var n=i.data.filter(function(e){var i=E(e);return r?i<t.start:i>t.end});return e.concat(n)},[]),o={start:r?n.max(l,E):t.start,end:r?t.end:n.min(l,E)};g.call(this,o),c.call(this,o)}function g(t){P(this).slidingWindow.setPanelPosition(f.call(this,t))}function f(t){var e=o.call(this),i=e.max-e.min;return{start:((t.start-e.min)*(100/i)).toFixed(3),end:((t.end-e.min)*(100/i)).toFixed(3)}}function v(t){var e=o.call(this),i=e.max-e.min;return{start:e.min+Math.floor(i/100*t.start),end:e.min+Math.ceil(i/100*t.end)}}function m(t){var e=y(t,S);e.element=this.view.getMasterOverviewChartHolder();var i=new a(e);i.addEventHandler("domattach",function(){requestAnimationFrame(p.bind(this))}.bind(this)),i.getEventBus().subscribe("legend:click",function(){l.call(this,i.data),this.trigger(this.VIEW_CHANGE,P(this).displayRange)}.bind(this)),P(this).masterLineChart=i}function w(t){if(void 0===P(this).slidingWindow){var e=new r({overlay:t.overview.overlay||H});e.attachTo(this.view.getMasterWindowHolder()),e.addEventHandler("change",b.bind(this)),P(this).slidingWindow=e}}function b(t){var e=o.call(this),i=e.max-e.min,n=e.min+i/100*t.start,a=e.min+i/100*t.end,r={start:n,end:a};this.trigger(this.VIEW_CHANGE,r,t)}function p(){var t=P(this).masterLineChart.getElement().find(".lineWrapper");if(void 0!==t){var e=parseFloat(t.getAttribute("height"));this.view.getMasterWindowHolder().setStyle({height:e+S.chart.margin.top})}}function C(t){var e=P(this).slidingWindow;requestAnimationFrame(function(){e.trigger("change",t.overview.overlay||H),this.trigger("domattach")}.bind(this))}function L(t){var e=t.overview.master.height;this.view.getMasterHolder().setStyle({height:e}),this.view.getDetailHolder().setStyle({height:"calc(100% - "+e+")"})}function D(){P(this).eventMapped||(P(this).eventMapped=!0,V.inbound.forEach(function(t){this.addEventHandler(t,function(){M(P(this).masterLineChart,t,arguments),M(P(this).detailsLineChart,t,arguments)}.bind(this))}.bind(this)),V.outbound.forEach(function(t){P(this).detailsLineChart.addEventHandler(t,function(){M(this,t,arguments)}.bind(this))}.bind(this)))}function M(t,e,i){t&&(i=Array.prototype.slice.apply(i),i.unshift(e),t.trigger.apply(t,i))}function y(t,i){var n={};return e.extend(n,t,!0),e.extend(n,i,!0),n}function W(t){return t instanceof Date?t.getTime():t}function E(t){return W(x(t))}function x(t){return void 0!==t.x?t.x:t.label}var P=i.create(),H={start:40,end:60},A={overview:{overlay:void 0,master:{height:"30%"}}},S={theme:{plotOptions:{line:{lineWidth:1}}},chart:{margin:{top:0,right:5,bottom:5,left:0}},plotOptions:{line:{datalabels:!1}},grid:{axisLabels:{y:!1},tickSize:{y:{width:0}}},tooltip:!1},V={inbound:["reference:change"],outbound:["chart:click","chart:mousemove","chart:mouseleave","entry:click","entry:contextmenu","entry:mouseenter","entry:mouseleave"]};return t.Widget.extend({View:s,VIEW_CHANGE:"display-range:change",onViewReady:function(){var e=this.options.element,i=y(A,this.options);this.options=i,this.attachTo(e),l.call(this,i.data),h.call(this),m.call(this,i),P(this).windowResizeEvt=t.Window.addEventHandler("resize",d.bind(this))},onDestroy:function(){t.Window.removeEventHandler(P(this).windowResizeEvt),P(this).masterLineChart&&P(this).masterLineChart.destroy(),P(this).detailsLineChart&&P(this).detailsLineChart.destroy()},onDOMAttach:function(){var t=this.options,e=this.getElement().getProperty("offsetHeight");0===e&&this.getElement().setStyle({height:a.prototype.baseHeight+"px"}),L.call(this,t),this.addEventHandler(this.VIEW_CHANGE,c.bind(this)),w.call(this,t),C.call(this,t)},getData:function(){return P(this).data},update:function(t){l.call(this,t),h.call(this),P(this).masterLineChart.update(t),this.trigger(this.VIEW_CHANGE,v.call(this,P(this).slidingWindow.getPanelPosition()))},setPanelPosition:function(t,e){if(P(this).slidingWindow){var i=P(this).slidingWindow.getPanelPosition();t.start===i.start&&t.end===i.end||(P(this).slidingWindow.setPanelPosition(t),e!==!0&&b.call(this,{start:void 0!==t.start?t.start:i.start,end:void 0!==t.end?t.end:i.end}))}},getPanelPosition:function(){if(P(this).slidingWindow)return P(this).slidingWindow.getPanelPosition()},redraw:function(){P(this).masterLineChart&&P(this).masterLineChart.redraw(),P(this).detailsLineChart&&P(this).detailsLineChart.redraw(),P(this).slidingWindow&&P(this).slidingWindow.redraw()}})}),define("chartlib/charts/MasterDetailLine",["chartlib/charts/masterdetailline/MasterDetailLine"],function(t){return t});