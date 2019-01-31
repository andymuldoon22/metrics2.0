/* Copyright (c) Ericsson 2019 */

define("chartlib/charts/Line",["chartlib/base/d3","jscore/ext/privateStore","chartlib/charts/Chart"],function(t,a,e){"use strict";function i(t){var a=this.options.animation;t.exit().transition().duration(.5*a.transitionDuration).delay(a.transitionDelay).ease(a.easing).style("opacity",0).remove()}function r(t){return t.map(function(t){return{label:t.label,visible:t.visible,data:t.data?t.data.map(function(t){return{label:void 0!==t.x?t.x:t.label,value:void 0!==t.y?t.y:t.value}}):[]}})}function n(t){var a=this.options,e=this.chartSize,i=this.getSize(),r=a.chart.margin;e.width=i.width-r.left-r.right,e.height=i.height-r.top-r.bottom,e.margins={left:r.left,top:r.top},e=this.changeSizeForGrid(e,t),e=this.changeSizeForTitle(e),e=this.changeSizeForLegend(e,t)}function l(t,a){var e=this.options,r=this.shapeHelper,n=this.colorScale,l=e.theme.plotOptions.line,s=e.plotOptions.line.chartType,o=l.areaLines;if("area"===s&&(a.enter().append("path").attr("class","enter area").attr("stroke-width","0").attr("fill",function(t){return n(t.label,t)}).attr("fill-opacity",l.fillOpacity).attr("d",function(t,a){return r.area(t.data)}),i.call(this,a)),t.enter().append("path").attr("class","enter line").attr("fill","none").attr("stroke-linejoin","round").attr("stroke-linecap","round").attr("d",function(t){return r.line(t.data)}).attr("stroke",function(t){return o&&"area"===s?o.color:n(t.label,t)}).attr("stroke-width",function(t,a){return o&&"area"===s?o.width:l.lineWidth}),i.call(this,t),l.dashArray){var h=l.dashArray;t.attr("stroke-dasharray",function(t,a,e){return Array.isArray(h)?h[e]:h(t.label,t,e)})}}function s(t){t.enter().append("circle").attr("class","trackerDot hoverable datapoint").attr("fill","none").attr("r",5).style({cursor:"pointer"}),t.exit().remove()}function o(t){var a=this.options.animation,e=this.colorScale;t.transition().duration(a.transitionDuration).delay(a.transitionDelay).ease(a.easing).attr("fill",function(t){return e(t.label,t)}).style({display:"none"})}function h(){if(this.firstRun){var a=this,e=function(e){return function(){var i=t.mouse(this),r={x:i[0],y:i[1]};a.trigger(e,{coordinate:r,value:{x:d.call(a,r),y:u.call(a,r)}})}};L(this).mouseTrackingRect.on("mousemove",e("chart:mousemove")),this.lineWrapper.on("click",e("chart:click")).on("mouseleave",function(){a.trigger("chart:mouseleave")})}L(this).mouseTrackingRect.attr("width",Math.max(0,this.chartSize.width)).attr("height",Math.max(0,this.chartSize.height))}function c(){var t=this.options,a=t.tooltip.interpolate===!0,e=this.lineWrapper,i=this;void 0===this.mouseMoveEvtId&&(this.mouseMoveEvtId=i.addEventHandler("chart:mousemove",function(t){var r=t.coordinate;e.selectAll("circle.trackerDot").attr("cx",function(t){if(a)return r.x;var e=f.call(i,r,t);if(e&&!isNaN(e.value))return i.scaleHelper.x(e.label)}).attr("cy",function(t,e){if(a){if(void 0===i.pathLinesSelection[0][e])return;var n=y.call(i,r,t,i.pathLinesSelection[0][e]);return void 0!==n?n.y:0}var l=f.call(i,r,t),s=i.defaults.theme.plotOptions.line.lineWidth;if(l&&!isNaN(l.value))return i.scaleHelper.y(l.value)-(5-s)/2}).style("opacity",1).style("display",function(t){var a=f.call(i,r,t);if(void 0===t.data[0]||isNaN(a.value))return"none";var e=t.data,n=d.call(i,r),l=n>=e[0].label&&n<=e[e.length-1].label;return l?"block":"none"})}),this.mouseLeaveEvtId=i.addEventHandler("chart:mouseleave",function(){var a=t.animation;e.selectAll("circle.trackerDot").transition().duration(.5*a.transitionDuration).delay(a.transitionDelay).ease(a.easing).style("opacity",0)}))}function d(t){return p.call(this,"x",t)}function u(t){return p.call(this,"y",t)}function p(t,a){var e=this.options.plotOptions.scaleType[t],i=a[t],r=this.scaleHelper[t];if("ordinal"===e){for(var n=r.range(),l=0;i>n[l];)l++;if(0!==l){var s=n[l]-n[l-1],o=i-n[l-1];l=o<s/2?l-1:l}return r.domain()[l]}var h=r.invert(i),c="time"===e;return c?h.getTime():h}function f(t,a){var e=this.options.plotOptions.scaleType.x;if("ordinal"===e){var i=d.call(this,t);return a.data.find(function(t){return t.label===i})}return v(d.call(this,t),a.data)}function y(t,a,e){if(void 0!==a.data[0])for(var i,r,n,l=this.scaleHelper.x(a.data[0].label),s=t.x-l,o=s,h=e.getTotalLength();;){if(i=Math.floor((o+h)/2),r=e.getPointAtLength(i),n=r.x+(-l||0),i===h||i===o)return r;if(n>s)h=i;else{if(!(n<s))return r;o=i}}}function v(t,a){if(a.length<2)return void 0!==a[0]?a[0]:void 0;if(2===a.length){var e=a[0].label,i=a[1].label,r=i-e,n=t-e;return n<r/2?a[0]:a[1]}var l=Math.floor(a.length/2),s=a[l];return s.label===t?s:v(t,t<s.label?a.slice(0,l+1):a.slice(l))}function g(t){var a=void 0!==this.grid?this.grid.getEntriesAxisFormat():void 0,e="time"===this.options.plotOptions.scaleType.x,i=void 0!==a?a(e?new Date(t.x):t.x):t.x,r=this.getDataLabelFormat();return i+" : "+r(t.y)}function x(t){void 0!==t.line&&(b.call(this,t.line,"line"),L(this).references.line=t.line),void 0!==t.area&&(b.call(this,t.area,"area"),L(this).references.area=t.area)}function b(a,e){var r=this.options,n=this.scaleHelper,l="line"===e,s=e+"Reference",o=L(this).referenceGroups[e],h=o.selectAll("."+s).data(a),c=this.xMin,d=this.xMax,u=this.yMin,p=this.yMax;h.enter().append(l?"line":"rect").attr("class",s),i.call(this,h),h.each(function(a){var e={};if(void 0!==a.x||void 0!==a.y)e={x1:n.x(void 0!==a.x?a.x:c),y1:n.y(void 0!==a.y?a.y:u),x2:n.x(void 0!==a.x?a.x:d),y2:n.y(void 0!==a.y?a.y:p)};else if(void 0!==a.x1||void 0!==a.y1){var i=void 0!==a.y1?Math.min(a.y1,a.y2):void 0,l=void 0!==a.y2?Math.min(Math.max(a.y1,a.y2),p):void 0,s=n.x(void 0!==a.x1?a.x1:c),o=n.y(void 0!==a.y1?a.y1:u),h=void 0!==a.x1?n.x(a.x2)-n.x(a.x1):n.x(d),f=void 0!==i?n.y(i)-n.y(l):n.y(u);e={x:s,y:o-f,width:Math.max(0,h),height:Math.max(0,f)}}var y=a.options;if(y&&y.transition===!1)t.select(this).attr(y).attr(e);else{var v=r.animation;t.select(this).attr(y).transition().duration(v.transitionDuration).delay(v.transitionDelay).ease(v.easing).attr(e)}})}function m(){void 0===L(this).referenceEvtId&&(L(this).referenceEvtId=this.addEventHandler("reference:change",x.bind(this)))}var L=a.create();return e.extend({defaults:{theme:{plotOptions:{line:{dashArray:!1,fillOpacity:1,datalabels:{fill:"#58585b"},lineWidth:3,areaLines:{color:"#ffffff",width:1}}}},plotOptions:{line:{interpolateMode:"linear",chartType:"line",orderDataBySum:!1,datalabels:!1,references:[]},area:{references:[]},scaleType:{x:"ordinal",y:"linear"}}},onChartReady:function(){this.attachTo(this.options.element)},createPrivateVariables:function(){this.data=[],this.unsortedData=[],this.yMax=0,this.yMin=0,this.storedData=null,this.shapeHelper={},this.lineWrapper=[],this.dataLabelWrapper=[],this.lineWrapperClipPath=[],this.dataPadded=!1,this.wasPadded=!1,this.dataLabelsChanged=!1,this.dataLabelsChangedTimes=0},redraw:function(){this.createWrapper(),this.update(this.options.data)},createWrapper:function(){0===this.lineWrapper.length&&(this.lineWrapperClipPath=this.defs.append("clipPath"),this.lineWrapperClipPath.attr("id","lineChartWrapperClipPath-"+this.id).append("rect"),this.lineWrapper=this.svg.append("g").attr("id","lineWrapper-"+this.id),this.lineWrapper.attr("clip-path","url(#lineChartWrapperClipPath-"+this.id+")"),this.dataLabelWrapperClipPath=this.defs.append("clipPath"),this.dataLabelWrapperClipPath.attr("id","dataLabelWrapperClipPath-"+this.id).append("rect"),L(this).dataPathGroup=this.lineWrapper.append("g").attr("class","dataPathGroup"),L(this).referenceGroup=this.lineWrapper.append("g").attr("class","referenceGroup"),this.dataLabelWrapper=this.lineWrapper.append("g").attr("id","dataLabelWrapper-"+this.id).attr("clip-path","url(#dataLabelWrapperClipPath-"+this.id+")"),L(this).referenceGroups={area:L(this).referenceGroup.append("g").attr("class","areaReferenceGroup"),line:L(this).referenceGroup.append("g").attr("class","lineReferenceGroup")},L(this).mouseTrackingRect=this.lineWrapper.append("rect").attr("class","mousetracker").style("opacity",0).attr("x",0).attr("y",0))},onUpdate:function(t){this.options.data=t,t=r(t),this.data=this.addIDsToData(t);var a=this.data,e=this.options,d=this.chartSize,u=this.lineWrapper,p=this.lineWrapperClipPath,f=this.dataLabelWrapper,y=this.dataLabelWrapperClipPath,v=this.colorScale,g=e.plotOptions,b=g.line.datalabels===!0;a=a.filter(function(t){return t.visible!==!1}),this.sortDataOnSum(),this.getMaxValues(a),n.call(this,this.data);var D=e.grid?this.grid.getOptions().gridPadding:{left:0,right:0},M=d.margins,A=M.left+D.left;u.attr("transform","translate("+A+","+M.top+")");var O=d.width,S=d.height;p.selectAll("rect").attr("y",-20).attr("x",-6).attr("width",Math.max(0,O-(D.left+D.right)+12)).attr("height",Math.max(0,S+20)),y.selectAll("rect").attr("y",-20).attr("x",-D.left).attr("width",Math.max(0,O)).attr("height",Math.max(0,S+20)),this.setScaleType(),this.createShapeHelpers();var W=L(this).dataPathGroup.selectAll("g.lineGroup").data(a);W.enter().append("g").attr("class","lineGroup"),i.call(this,W);var P,T,C,w=function(t){return[t]},H=W.selectAll("path.area").data(w),k=W.selectAll("path.line").data(w);if(b&&(C=f.selectAll("g.dataLabelObject").data(a),C.enter().append("g").attr("class","dataLabelObject"),i.call(this,C),P=C.selectAll(".dataLabelDot").data(function(t){return t.data=t.data.map(function(a){return a.fill=v(t.label,t),a}),t.data}),T=C.selectAll(".dataLabelText").data(function(t){return t.data})),this.dataLabelsChanged===!0){D=e.grid?this.grid.getOptions().gridPadding:{left:0,right:0};var G=O-D.left-D.right;G/=a[0].data.length-2,this.updateLabelChangedLineAndArea(k,H,G),b&&this.updateLabelChangedDataLabels(P,T,G)}else this.dataPadded===!0&&(this.updateInstantlyOnNewDataLineAndArea(k,H),b&&this.updateInstantlyOnNewDataDataLabels(P,T),this.dataPadded=!1,this.wasPadded=!0,this.setScaleType(),this.createShapeHelpers()),this.regularUpdateLineAndArea(k,H),b&&this.regularUpdateDataLabels(P,T);if(l.call(this,k,H),this.pathLinesSelection=L(this).dataPathGroup.selectAll("path.line"),void 0===L(this).references){var z=g.line.references,N=g.area.references;L(this).references={line:0!==z.length?z:void 0,area:0!==N.length?N:void 0}}if(x.call(this,L(this).references),h.call(this),m.call(this),e.tooltip){var E,V=u.selectAll("g.trackerDotGroup");if(V.empty())V=u.append("g").attr("class","trackerDotGroup");else{var I=V.remove();this.lineWrapper.node().appendChild(I.node())}E=V.selectAll("circle.trackerDot").data(a),s.call(this,E),o.call(this,E),c.call(this)}b&&this.createDataLabels(P,T),e.grid&&this.grid.update(t,this.chartSize,this.scaleHelper),e.legend!==!1&&this.legend.update(this.unsortedData,this.chartSize,this.scaleHelper)},updateInstantlyOnNewDataLineAndArea:function(t,a){var e=this.shapeHelper,i=this.options;t.attr("class","update line").attr("d",function(t){return e.line(t.data)}),"area"===i.plotOptions.line.chartType&&a.attr("class","update area").attr("d",function(t){return e.area(t.data)})},updateInstantlyOnNewDataDataLabels:function(t,a){var e=this.scaleHelper;t.attr("class","update dataLabelDot").attr("cx",function(t){return e.x(t.label)}).attr("cy",function(t){return e.y(t.value)}),a.attr("class","update dataLabelText").attr("y",function(t){return e.y(t.value)-5}).attr("x",function(t){return e.x(t.label)})},regularUpdateLineAndArea:function(t,a){var e=this.options,i=this.shapeHelper,r=this.colorScale,n=e.animation,l=n.transitionDuration,s=n.transitionDelay,o=n.easing;t.attr("class","update line").transition().duration(l).delay(s).ease(o).attr("d",function(t,a){return i.line(t.data)}).attr("stroke",function(t){var a=e.theme.plotOptions.line.areaLines;return a&&"area"===e.plotOptions.line.chartType?a.color:r(t.label,t)}),"area"===e.plotOptions.line.chartType&&a.attr("class","update area").transition().duration(l).delay(s).ease(o).attr("d",function(t,a){return i.area(t.data)}).attr("fill",function(t){return r(t.label,t)})},regularUpdateDataLabels:function(a,e){var i=this.scaleHelper,r=this.getDataLabelFormat(),n=this.options.animation,l=n.transitionDuration,s=n.transitionDelay,o=n.easing;a.attr("class","update dataLabelDot").transition().duration(l).delay(s).ease(o).attr("cx",function(t){return i.x(t.label)}).attr("cy",function(t){return i.y(t.value)}).attr("fill",function(t){return t.fill}),e.attr("class","update dataLabelText").transition().duration(l).delay(s).ease(o).attr("y",function(t){return i.y(t.value)-5}).attr("x",function(t){return i.x(t.label)}).tween("text",function(a){var e=t.interpolate(this.currentValue,a.value);return function(t){this.currentValue=e(t),this.textContent=r(this.currentValue)}})},updateLabelChangedLineAndArea:function(t,a,e){var i=this.shapeHelper,r=this.options,n=r.animation,l=n.transitionDuration,s=n.transitionDelay,o=n.easing;t.attr("class","update line").transition().duration(l).delay(s).ease(o).style("opacity",1).attr("d",function(t,a){return i.line(t.data)}).attr("transform","translate(0, 0)"),"area"===r.plotOptions.line.chartType&&a.attr("class","update area").transition().duration(l).delay(s).ease(o).attr("d",function(t,a){return i.area(t.data)})},updateLabelChangedDataLabels:function(a,e,i){var r=this.scaleHelper,n=this.options.animation,l=this.getDataLabelFormat();a.attr("class","update dataLabelDot").style("opacity",1).transition().duration(n.transitionDuration).delay(n.transitionDelay).ease(n.easing).attr("cx",function(t){return r.x(t.label)}).attr("cy",function(t){return r.y(t.value)}).attr("transform","translate(0, 0)").style("opacity",function(t,a){return 0===a?0:1}),e.attr("class","update dataLabelText").transition().duration(n.transitionDuration).delay(n.transitionDelay).ease(n.easing).attr("y",function(t){return r.y(t.value)-5}).attr("x",function(t){return r.x(t.label)}).style("opacity",1).attr("transform","translate(0, 0)").style("opacity",function(t,a){return 0===a?0:1}).tween("text",function(a){var e=t.interpolate(this.currentValue,a.value);return function(t){this.currentValue=Math.round(e(t)),this.textContent=l(this.currentValue)}})},setScaleType:function(){var a,e=this.options,i=this.scaleHelper,r=e.grid?this.grid.getOptions().gridPadding:{left:0,right:0},n=this.chartSize,l=n.width-(r.left+r.right),s=e.plotOptions.scaleType.x;this.dataPadded===!0&&(l-=l/(this.storedData[0].data.length-1)),this.dataLabelsChanged===!0&&(l-=l/(this.data[0].data.length-2)),"ordinal"===s?a=t.scale.ordinal().rangePoints([0,l]).domain(this.getLabelDomain()):(a="time"===s?t.time.scale():t.scale.linear(),a.domain([this.xMin,this.xMax]).range([0,l])),i.x=a;var o=this.yMin,h=this.yMax;o===h&&(o-=5,h+=5),i.y=t.scale.linear().domain([o,h]).range([n.height,0]).nice()},createDataLabels:function(t,a){var e=this.scaleHelper,r=this.options,n=this.dataLabelsChanged,l=this.wasPadded,s=this.chartSize,o=this.data,h=this.dataLabelWrapper,c=this.getDataLabelFormat();t.enter().append("circle").attr("r",3).attr("class","enter dataLabelDot").attr("fill",function(t){return t.fill}).attr("cx",function(t){return e.x(t.label)}).attr("cy",function(t){return e.y(t.value)}),a.enter().append("text").attr("class","enter dataLabelText").attr("text-anchor","middle").attr("x",function(t){return e.x(t.label)}).attr("y",function(t){return e.y(t.value)-5}).attr("fill",r.theme.plotOptions.line.datalabels.fill).text(function(t){return this.currentValue=t.value,c(this.currentValue)});var d=r.animation;if(n===!0){var u=r.grid?this.grid.getOptions().gridPadding:{left:0,right:0},p=(s.width-u.left-u.right)/(o[0].data.length-2);h.selectAll(".enter").attr("transform","translate("+p+", 0)").style("opacity",0).transition().duration(d.transitionDuration).delay(d.transitionDelay).ease(d.easing).attr("transform","translate(0, 0)").style("opacity",1)}l===!0&&h.selectAll(".enter").attr("opacity",0).transition().duration(d.transitionDuration).delay(d.transitionDelay).ease(d.easing).attr("opacity",1),i.call(this,a),i.call(this,t)},sortDataOnSum:function(){var a=this.options,e=this.data;this.unsortedData=JSON.parse(JSON.stringify(e)),a.plotOptions.line.orderDataBySum===!0&&(e.forEach(function(a){a.sum=t.sum(a.data,function(t){return t.value})}),e.sort(function(t,a){return a.sum-t.sum}))},getMaxValues:function(a){var e=this.options.chart,i=e.scale,r=i.x,n=i.y;r?(this.xMin=r.min,this.xMax=r.max):(this.xMin=t.min(a,function(a){return t.min(a.data.map(function(t){return t.label}))}),this.xMax=t.max(a,function(a){return t.max(a.data.map(function(t){return t.label}))}));var l=e.zeroBaseline.y;n?(this.yMin=l?0:n.min,this.yMax=n.max):(this.yMin=l?0:t.min(a,function(a){return t.min(a.data.map(function(t){return t.value}))}),this.yMax=t.max(a,function(a){return t.max(a.data.map(function(t){return t.value}))}),0===this.yMax&&0===this.yMin&&(this.yMax=5))},getLabelDomain:function(){var t=[];return this.data.forEach(function(a){t=t.concat(t,a.data.map(function(t){return t.label}))}),t.filter(function(t,a,e){return e.indexOf(t)===a})},createShapeHelpers:function(){var a=this.scaleHelper,e=this.shapeHelper,i=this.chartSize,r=this.options.plotOptions.line,n=r.interpolateMode,l=r.chartType;if(n.includes("-with-gaps")){var s=n.substring(0,n.length-10);n="line"===l?function(a){var e=0,i=[];a.forEach(function(t){isNaN(t[1])?(e++,i[e]=[]):i[e]?i[e].push(t):i[e]=[t]});var r=[];i.forEach(function(a){r.push(t.svg.line().interpolate(s)(a))});var n=r.join("");return n.substr(1)}:s}e.line=t.svg.line().interpolate(n).x(function(t){return a.x(t.label)}).y(function(t){return a.y(t.value)}),e.area=t.svg.area().interpolate(n).x(function(t){return a.x(t.label)}).y0(i.height).y1(function(t){return a.y(t.value)})},getTooltipContent:function(t,a){var e,i=this.options,r=i.grid?this.grid.getOptions().gridPadding:{left:0,right:0},n=i.tooltip,l=this.chartSize.margins.left+r.left,s="function"==typeof n.format?n.format:g,o={x:a[0]-l,y:a[1]};if(n.interpolate!==!0)e=f.call(this,o,t),e={label:t.label,x:e.label,y:e.value};else{var h,c=-1;this.data.some(function(a){return a.visible!==!1&&c++,t.label===a.label}),h=y.call(this,o,t,this.pathLinesSelection[0][c]),e={label:t.label,x:d.call(this,h),y:u.call(this,h)}}return s.call(this,e)},getValuesAtX:function(t,a){return this.data.map(function(e,i){var r,n={x:this.scaleHelper.x(t)};if(a){var l=y.call(this,n,e,this.pathLinesSelection[0][i]);r={label:d.call(this,l),value:u.call(this,l)}}else r=f.call(this,n,e);return{label:e.label,data:{x:r.label,y:r.value}}}.bind(this))}})});