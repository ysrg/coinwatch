(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{154:function(e,t,i){(function(e){function n(e){return e&&"object"===typeof e&&"default"in e?e.default:e}Object.defineProperty(t,"__esModule",{value:!0});var r=i(1),o=n(r),a=n(i(12)),l=i(169),c=i(149),s=n(i(296)),d=n(i(91)),h=n(i(97)),u=n(i(92)),p=n(i(84)),m=i(88),f=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},g=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t},v=function(e){var t=e.style,i=e.node,n=e.handlers,r=e.theme;if(t.width<=0||t.height<=0)return null;var a=i.label&&t.orientLabel&&t.height>t.width,l=Math.max(document.documentElement.clientWidth,window.innerWidth||0)>576?t.width/t.height<.5:t.width/t.height<.95;return o.createElement("g",{transform:"translate("+t.x+","+t.y+")"},o.createElement("rect",b({width:t.width,height:t.height,fill:t.fill?t.fill:t.color,strokeWidth:t.borderWidth,stroke:t.borderColor},n)),i.label&&o.createElement("text",{textAnchor:"middle",dominantBaseline:"central",style:b({},r.labels.text,{fontSize:Math.max(document.documentElement.clientWidth,window.innerWidth||0)>576?t.width<=t.height&&t.width<=50&&t.height<55?"65%":t.width<=t.height&&t.width<=50&&t.height<85?"85%":t.width<=t.height&&t.width<=30?"70%":t.width<=t.height&&t.width<=80&&t.height>180?"130%":t.width<=t.height&&t.height<=80?"80%":t.width<=t.height&&t.height<=130&&t.width<70?"70%":t.width<=t.height&&t.height<=120?"90%":t.width<=t.height&&t.width<=140&&t.height>180?"120%":t.width<=t.height&&t.width<=150&&t.height>180?"150%":t.width<=t.height&&t.width<=180&&t.height>180?"170%":t.width<=t.height&&t.height<=180&&t.width<90?"90%":t.width<=t.height&&t.height<=180&&t.width<120?"110%":t.width<=t.height&&t.height<=210?"140%":t.width>=t.height&&t.width<=40?"50%":t.width>=t.height&&t.width<=80?"70%":t.width>=t.height&&t.height>=150?"170%":t.width>=t.height&&t.height<20?"70%":t.width>=t.height&&t.height<100&&t.width<=250?"90%":t.width>=t.height&&t.height<150?"120%":"2em":t.width<=t.height&&t.height<=55?"6px":t.width<=t.height&&t.height<=80?"9px":t.width<=t.height&&t.width<=13?"9px":t.width>=t.height&&t.width<=55?"6px":t.width>=t.height&&t.height<=13?"9px":t.width>=t.height&&t.width<=80?"9px":"12px",fill:t.labelTextColor,pointerEvents:"none"}),transform:"translate("+t.width/2+","+t.height/2+") rotate("+(a&&l?-90:0)+")"},i.label))};v.propTypes={node:a.object.isRequired,style:a.shape({x:a.number.isRequired,y:a.number.isRequired,width:a.number.isRequired,height:a.number.isRequired,color:a.string.isRequired,borderWidth:a.number.isRequired,borderColor:a.string.isRequired,labelTextColor:a.string.isRequired,orientLabel:a.bool.isRequired}).isRequired,handlers:a.object.isRequired,theme:l.themePropType.isRequired};var y=function(e){var t=e.node,i=e.style,n=e.handlers;if(i.width<=0||i.height<=0)return null;var r=t.label&&i.orientLabel&&i.height>i.width;return o.createElement("div",b({id:(t.data&&t.data.id?t.data.id:t.id).replace(/[^\w]/gi,"-"),style:{boxSizing:"border-box",position:"absolute",top:i.y,left:i.x,width:i.width,height:i.height,background:i.color,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",borderWidth:i.borderWidth,borderStyle:"solid",borderColor:i.borderColor}},n),!1!==t.label&&o.createElement("span",{style:{color:i.labelTextColor,transform:"rotate("+(r?"-90":"0")+"deg)",WebkitUserSelect:"none",MozUserSelect:"none",MsUserSelect:"none",userSelect:"none"}},t.label))};y.propTypes={node:a.object.isRequired,style:a.shape({x:a.number.isRequired,y:a.number.isRequired,width:a.number.isRequired,height:a.number.isRequired,color:a.string.isRequired,borderWidth:a.number.isRequired,borderColor:a.string.isRequired,labelTextColor:a.string.isRequired,orientLabel:a.bool.isRequired}).isRequired,handlers:a.object.isRequired};var w={identity:a.oneOfType([a.string,a.func]).isRequired,leavesOnly:a.bool.isRequired,tile:l.treeMapTilePropType.isRequired,innerPadding:a.number.isRequired,outerPadding:a.number.isRequired,enableLabel:a.bool.isRequired,label:a.oneOfType([a.string,a.func]).isRequired,labelFormat:a.string,labelSkipSize:a.number.isRequired,orientLabel:a.bool.isRequired,borderWidth:a.number.isRequired,borderColor:a.any.isRequired,isInteractive:a.bool.isRequired,onClick:a.func.isRequired,tooltip:a.func},C=b({},w,{nodeComponent:a.func.isRequired},l.defsPropTypes),x=b({},w,{nodeComponent:a.func.isRequired}),T=b({},w,{pixelRatio:a.number.isRequired}),E={identity:"id",tile:"squarify",leavesOnly:!1,enableLabel:!0,label:"id",labelSkipSize:0,labelTextColor:"inherit:darker(1)",orientLabel:!0,innerPadding:0,outerPadding:0,borderWidth:0,borderColor:"inherit",isInteractive:!0,onClick:l.noop},k=b({},E,{nodeComponent:v,defs:[],fill:[]}),R=b({},E,{nodeComponent:y}),M=b({},E,{pixelRatio:e.window&&e.window.devicePixelRatio?e.window.devicePixelRatio:1}),L=Object.freeze({TreeMapPropTypes:C,TreeMapHtmlPropTypes:x,TreeMapCanvasPropTypes:T,TreeMapDefaultProps:k,TreeMapHtmlDefaultProps:R,TreeMapCanvasDefaultProps:M}),q=[l.withHierarchy(),l.withDimensions(),l.withColors({defaultColorBy:"depth"}),l.withTheme(),l.withMotion(),u(["identity"],function(e){var t=e.identity;return{getIdentity:l.getAccessorFor(t)}}),u(["borderColor"],function(e){var t=e.borderColor;return{getBorderColor:l.getInheritedColorGenerator(t)}}),u(["label","labelFormat"],function(e){var t=e.label,i=e.labelFormat;return{getLabel:l.getLabelGenerator(t,i)}}),u(["labelTextColor"],function(e){var t=e.labelTextColor;return{getLabelTextColor:l.getInheritedColorGenerator(t)}}),u(["width","height","tile","innerPadding","outerPadding"],function(e){var t=e.width,i=e.height,n=e.tile,r=e.innerPadding,o=e.outerPadding;return{treemap:c.treemap().size([t,i]).tile(l.treeMapTileFromProp(n)).round(!0).paddingInner(r).paddingOuter(o)}}),u(["root","treemap","leavesOnly","getIdentity","getColor"],function(e){var t=e.root,i=e.treemap,n=e.leavesOnly,r=e.getIdentity,o=e.getColor,a=s(t);i(a);var l=n?a.leaves():a.descendants();return{nodes:l=l.map(function(e){return e.path=function(e,t){return e.ancestors().map(function(e){return t(e.data)}).join(".")}(e,r),e.nodeHeight=e.height,e.x=e.x0,e.y=e.y0,e.width=e.x1-e.x0,e.height=e.y1-e.y0,e.data.color=e.color=o(b({},e.data,{depth:e.depth})),e.data.id=e.id=r(e.data),e.data.value=e.value,e})}}),u(["enableLabel","nodes","getLabel","labelSkipSize"],function(e){var t=e.enableLabel,i=e.nodes,n=e.getLabel,r=e.labelSkipSize;if(t)return{nodes:i.map(function(e){return e.nodeHeight>0||0!==r&&Math.min(e.width,e.height)<=r?e:b({},e,{label:n(e.data)})})}})],S=[u(["nodes","defs","fill"],function(e){var t=e.nodes,i=e.defs,n=e.fill;return{defs:l.bindDefs(i,t,n,{targetKey:"fill"})}})],P=function(e){var t=L[e.displayName+"DefaultProps"];switch(e.displayName){case"TreeMap":return d.apply(void 0,[h(t)].concat(q,S,[l.withMotion(),p]))(e);case"TreeMapHtml":return d.apply(void 0,[h(t)].concat(q,[l.withMotion(),p]))(e);case"TreeMapCanvas":return d.apply(void 0,[h(t)].concat(q,[p]))(e)}return e},W=function(e){var t=e.data;return b({x:t.x,y:t.y,width:t.width,height:t.height},l.colorMotionSpring(t.color))},O=function(e){return function(t){var i=t.data;return b({x:m.spring(i.x+i.width/2,e),y:m.spring(i.y+i.height/2,e),width:m.spring(0,e),height:m.spring(0,e)},l.colorMotionSpring(i.color,e))}},j=function(e){var t=e.node,i=e.theme,n=e.tooltip;return o.createElement(l.BasicTooltip,{id:t.id,value:t.value,enableChip:!0,color:t.color,theme:i,renderContent:"function"===typeof n?n.bind(null,b({node:t},t)):null})};j.propTypes={node:a.shape({id:a.oneOfType([a.string,a.number]).isRequired,value:a.number.isRequired,color:a.string.isRequired}).isRequired,theme:a.object.isRequired,tooltip:a.func};var N=p(j),I=function(e,t){var i=t.isInteractive,n=t.onClick,r=t.showTooltip,a=t.hideTooltip,l=t.theme,c=t.tooltip;if(!i)return{};var s=function(t){r(o.createElement(N,{node:e,theme:l,tooltip:c}),t)};return{onMouseEnter:s,onMouseMove:s,onMouseLeave:a,onClick:function(t){return n(e,t)}}},D=function(e){var t=e.nodes,i=e.nodeComponent,n=e.margin,r=e.outerWidth,a=e.outerHeight,c=e.theme,s=e.borderWidth,d=e.getBorderColor,h=e.defs,u=e.getLabelTextColor,p=e.orientLabel,f=e.animate,g=e.motionStiffness,v=e.motionDamping,y=e.isInteractive,w=e.onClick,C=e.tooltipFormat,x=e.tooltip,T={stiffness:g,damping:v},E=function(e,t,i){return I(e,{isInteractive:y,onClick:w,showTooltip:t,hideTooltip:i,theme:c,tooltipFormat:C,tooltip:x})};return o.createElement(l.Container,{isInteractive:y,theme:c},function(e){var g=e.showTooltip,v=e.hideTooltip;return o.createElement(l.SvgWrapper,{width:r,height:a,margin:n,defs:h,theme:c},!f&&o.createElement("g",null,t.map(function(e){return o.createElement(i,{key:e.path,node:e,style:{fill:e.fill,x:e.x0,y:e.y0,width:e.width,height:e.height,color:e.color,borderWidth:s,borderColor:d(e),labelTextColor:u(e),orientLabel:p},handlers:E(e,g,v),theme:c})})),f&&o.createElement(m.TransitionMotion,{willEnter:W,willLeave:O(T),styles:t.map(function(e){return{key:e.path,data:e,style:b({x:m.spring(e.x,T),y:m.spring(e.y,T),width:m.spring(e.width,T),height:m.spring(e.height,T)},l.colorMotionSpring(e.color,T))}})},function(e){return o.createElement("g",null,e.map(function(e){var t=e.style,n=e.data;return t.color=l.getInterpolatedColor(t),o.createElement(i,{key:n.path,node:n,style:b({},t,{fill:n.fill,borderWidth:s,borderColor:d(t),labelTextColor:u(t),orientLabel:p}),handlers:E(n,g,v),theme:c})}))}))})};D.propTypes=C,D.displayName="TreeMap";var H=P(D);H.displayName="TreeMap";var A=function(e){var t=e.nodes,i=e.nodeComponent,n=e.margin,r=e.outerWidth,a=e.outerHeight,c=e.theme,s=e.borderWidth,d=e.getBorderColor,h=e.getLabelTextColor,u=e.orientLabel,p=e.animate,f=e.motionStiffness,g=e.motionDamping,v=e.isInteractive,y=e.onClick,w=e.tooltipFormat,C=e.tooltip,x={stiffness:f,damping:g},T=function(e,t,i){return I(e,{isInteractive:v,onClick:y,showTooltip:t,hideTooltip:i,theme:c,tooltipFormat:w,tooltip:C})};return o.createElement(l.Container,{theme:c},function(e){var c=e.showTooltip,f=e.hideTooltip;return o.createElement("div",{style:{position:"relative",width:r,height:a}},!p&&o.createElement("div",{style:{position:"absolute",top:n.top,left:n.left}},t.map(function(e){return o.createElement(i,{key:e.path,node:e,style:{x:e.x,y:e.y,width:e.width,height:e.height,color:e.color,borderWidth:s,borderColor:d(e),labelTextColor:h(e),orientLabel:u},handlers:T(e,c,f)})})),p&&o.createElement(m.TransitionMotion,{willEnter:W,willLeave:O(x),styles:t.map(function(e){return{key:e.path,data:e,style:b({x:m.spring(e.x,x),y:m.spring(e.y,x),width:m.spring(e.width,x),height:m.spring(e.height,x)},l.colorMotionSpring(e.color,x))}})},function(e){return o.createElement("div",{style:{position:"absolute",top:n.top,left:n.left}},e.map(function(e){var t=e.style,n=e.data;return t.color=l.getInterpolatedColor(t),o.createElement(i,{key:n.path,node:n,style:b({},t,{fill:n.fill,borderWidth:s,borderColor:d(t),labelTextColor:h(t),orientLabel:u}),handlers:T(n,c,f)})}))}))})};A.propTypes=x,A.displayName="TreeMapHtml";var B=P(A);B.displayName="TreeMapHtml";var F=function(e,t,i,n){return e.find(function(e){return l.isCursorInRect(e.x+t.left,e.y+t.top,e.width,e.height,i,n)})},z=function(e){function t(){var i,n;f(this,t);for(var r=arguments.length,a=Array(r),c=0;c<r;c++)a[c]=arguments[c];return i=n=g(this,e.call.apply(e,[this].concat(a))),n.handleMouseHover=function(e,t){return function(i){var r=n.props,a=r.isInteractive,c=r.nodes,s=r.margin,d=r.theme;if(a){var h=l.getRelativeCursor(n.surface,i),u=h[0],p=h[1],m=F(c,s,u,p);void 0!==m?e(o.createElement(N,{node:m,theme:d}),i):t()}}},n.handleMouseLeave=function(e){return function(){e()}},n.handleClick=function(e){var t=n.props,i=t.isInteractive,r=t.nodes,o=t.margin,a=t.onClick;if(i){var c=l.getRelativeCursor(n.surface,e),s=c[0],d=c[1],h=F(r,o,s,d);void 0!==h&&a(h,e)}},g(n,i)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.componentDidMount=function(){this.ctx=this.surface.getContext("2d"),this.draw(this.props)},t.prototype.componentDidUpdate=function(){this.ctx=this.surface.getContext("2d"),this.draw(this.props)},t.prototype.draw=function(e){var t=this,i=e.nodes,n=e.pixelRatio,r=e.margin,o=e.outerWidth,a=e.outerHeight,c=e.borderWidth,s=e.getBorderColor,d=e.enableLabel,h=e.getLabelTextColor,u=e.orientLabel,p=e.theme;this.surface.width=o*n,this.surface.height=a*n,this.ctx.scale(n,n),this.ctx.fillStyle=p.background,this.ctx.fillRect(0,0,o,a),this.ctx.translate(r.left,r.top),i.forEach(function(e){t.ctx.fillStyle=e.color,t.ctx.fillRect(e.x,e.y,e.width,e.height),c>0&&(t.ctx.strokeStyle=s(e),t.ctx.lineWidth=c,t.ctx.strokeRect(e.x,e.y,e.width,e.height))}),d&&(this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.font=p.labels.text.fontSize+"px sans-serif",i.filter(function(e){return void 0!==e.label}).forEach(function(e){var i=h(e),n=u&&e.height>e.width;t.ctx.save(),t.ctx.translate(e.x+e.width/2,e.y+e.height/2),t.ctx.rotate(l.degreesToRadians(n?-90:0)),t.ctx.fillStyle=i,t.ctx.fillText(e.label,0,0),t.ctx.restore()}))},t.prototype.render=function(){var e=this,t=this.props,i=t.outerWidth,n=t.outerHeight,r=t.pixelRatio,a=t.isInteractive,c=t.theme;return o.createElement(l.Container,{isInteractive:a,theme:c},function(t){var a=t.showTooltip,l=t.hideTooltip;return o.createElement("canvas",{ref:function(t){e.surface=t},width:i*r,height:n*r,style:{width:i,height:n},onMouseEnter:e.handleMouseHover(a,l),onMouseMove:e.handleMouseHover(a,l),onMouseLeave:e.handleMouseLeave(l),onClick:e.handleClick})})},t}(r.Component);z.propTypes=T,z.displayName="TreeMapCanvas";var _=P(z);_.displayName="TreeMapCanvas";t.TreeMap=H,t.ResponsiveTreeMap=function(e){return o.createElement(l.ResponsiveWrapper,null,function(t){var i=t.width,n=t.height;return o.createElement(H,b({width:i,height:n},e))})},t.TreeMapHtml=B,t.ResponsiveTreeMapHtml=function(e){return o.createElement(l.ResponsiveWrapper,null,function(t){var i=t.width,n=t.height;return o.createElement(B,b({width:i,height:n},e))})},t.TreeMapCanvas=_,t.ResponsiveTreeMapCanvas=function(e){return o.createElement(l.ResponsiveWrapper,null,function(t){var i=t.width,n=t.height;return o.createElement(_,b({width:i,height:n},e))})},t.TreeMapPropTypes=C,t.TreeMapHtmlPropTypes=x,t.TreeMapCanvasPropTypes=T,t.TreeMapDefaultProps=k,t.TreeMapHtmlDefaultProps=R,t.TreeMapCanvasDefaultProps=M}).call(this,i(4))},160:function(e,t,i){e.exports=i(394)},165:function(e,t,i){},335:function(e,t){},389:function(e,t,i){},394:function(e,t,i){"use strict";i.r(t);var n=i(1),r=i.n(n),o=i(150),a=i.n(o),l=(i(165),i(11)),c=i(151),s=i(152),d=i(159),h=i(153),u=i(158),p=i(25),m=i(154),f=function(e){var t=e.data;return r.a.createElement(m.ResponsiveTreeMap,{root:{name:"coinwatch",color:"#fff",children:t},identity:"name",value:"loc",innerPadding:0,outerPadding:0,label:function(e){return"".concat(e.name," ").concat(e.prch?e.prch+"% ":"")},labelSkipSize:12,labelTextColor:"inherit:darker(3.3)",colorBy:function(e){return e.color},borderWidth:.5,borderColor:"inherit:darker(1.3)",motionDamping:35,motionStiffness:300,animate:!1,tooltip:function(e){return r.a.createElement("p",{style:{color:e.data.color}}," ","".concat(e.data.name," ").concat(e.data.loc?e.data.loc+"x":"")," ")},theme:{tooltip:{container:{color:"#fff",background:"#333"}}}})},b=i(155),g=i.n(b),v=i(48),y=i.n(v),w=i(156),C=i.n(w),x=i(157),T=i.n(x),E=function(e){var t=e.isLive,i=e.isActive,n=e.selected,o=e.handleClick,a=e.handleLiveClick;return r.a.createElement("header",{className:"App-header"},r.a.createElement("div",{className:"btn-group","data-toggle":"buttons",role:"group"},r.a.createElement("button",{value:"Live",onClick:a,className:"live btn  ".concat(t?"active btn-danger":"btn-primary")},"Live",t?r.a.createElement("div",{style:{color:"#ffffff"},className:"la-ball-scale-multiple la-dark la-sm"},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null)):null),r.a.createElement("button",{disabled:!i,value:"5m",onClick:o,type:"button",className:"btn btn-secondary ".concat(n["5m"])},"5m"),r.a.createElement("button",{disabled:!i,value:"15m",onClick:o,type:"button",className:"btn btn-secondary ".concat(n["15m"])},"15m"),r.a.createElement("button",{disabled:!i,value:"30m",onClick:o,type:"button",className:"btn btn-secondary ".concat(n["30m"])},"30m"),r.a.createElement("button",{disabled:!i,value:"1h",onClick:o,type:"button",className:"btn btn-secondary ".concat(n["1h"])},"1H"),r.a.createElement("button",{disabled:!i,value:"4h",onClick:o,type:"button",className:"btn btn-secondary ".concat(n["4h"])},"4H"),r.a.createElement("button",{disabled:!i,value:"8h",onClick:o,type:"button",className:"btn btn-secondary ".concat(n["8h"])},"8H"),r.a.createElement("button",{disabled:!i,value:"1d",onClick:o,type:"button",className:"btn btn-secondary ".concat(n["1d"])},"1D"),r.a.createElement("button",{disabled:!i,value:"1w",onClick:o,type:"button",className:"btn btn-secondary ".concat(n["1w"])},"1W"),r.a.createElement("button",{disabled:!i,value:"1M",onClick:o,type:"button",className:"btn btn-secondary ".concat(n["1M"])},"1M")))},k=(i(389),{isActive:!0,selected:{"4h":"active"},isLive:!1,socket:null,data:{}}),R=function(e){function t(e){var i;return Object(c.a)(this,t),(i=Object(d.a)(this,Object(h.a)(t).call(this,e))).computeLimit=function(e){switch(e){case"5m":return 48;case"15m":return 16;case"30m":return 8;case"1h":case"4h":return 5;case"8h":case"1d":return 4;case"1w":case"1M":return 2}},i.connectSocket=function(e){var t=g()("/");i.setState({socket:t}),"string"!==typeof e&&i.setState({isLive:!i.state.isLive}),t.on("retrieve",function(e){var t=e[e.symbol],n=Object.keys(t),r=n[n.length-1],o=i.state.data[e.symbol].length-1,a=C()(i.state,{data:Object(l.a)({},e.symbol,Object(l.a)({},o,{volume:{$set:t[r].volume}}))});i.setState({data:a.data})});var n=Object.keys(i.state.selected)[0];y.a.post("/",{timestamp:e||n,limit:i.computeLimit(e||n)}).catch(function(e){return e})},i.getTreemapData=function(){var e=i.state.data,t=Object.keys(e);return t.length?t.map(function(t){var n=t,r=e[t][e[t].length-1],o=e[t][0],a=e[t].slice(0,-1),l=a.reduce(function(e,t,i,n){return e+=Number(t.volume)},0)/a.length,c=0!==l?(r.volume/l).toFixed(3):0,s=c>0?Math.round(100*c)/100:0,d=r.open,h=r.close,u=Math.abs(r.time-o.time)/36e5,p=d<h?h/d*100-100:100-d/h*100,m=i.computeColor(p);return{time:u,open:d,name:"USDT"==n.slice(-4)?n.slice(0,-4):n.slice(0,-3),loc:s,prch:p.toFixed(2),color:m}}):{name:"g",loc:32,prch:3,color:"red"}},i.computeColor=function(e){return e<0?e<-1?e<-3?e<-7?"#DB4B38":"#E97253":"#EE9778":"#fcd3bf":e>2?e>5?e>10?"#5FA964":"#ACD6A0":"#CDE7C2":"#e4efdc"},i.handleLiveClick=function(e){if(i.state.isLive)return i.state.socket.disconnect(),void i.setState({isLive:!1});i.connectSocket()},i.handleClick=function(e){var t=Object(p.a)(Object(p.a)(i));i.setState({selected:Object(l.a)({},e.target.value,"active"),isActive:!1}),i.state.isLive&&(i.state.socket.disconnect(),i.connectSocket(e.target.value)),y.a.get("/api/coins",{params:{timestamp:e.target.value,limit:i.computeLimit(e.target.value)}}).then(function(e){var i=e.data.result.reduce(function(e,t,i){return e[t.symbol]=t[t.symbol],e},{});t.setState({data:i,isActive:!0})}).catch(function(e){})},i.state=k,i}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;y.a.get("/api/coins",{params:{timestamp:"4h",limit:5}}).then(function(t){var i=t.data.result.reduce(function(e,t,i){return e[t.symbol]=t[t.symbol],e},{});e.setState({data:i})}).catch(function(e){return e})}},{key:"render",value:function(){var e=this.state,t=e.isLive,i=e.isActive,n=e.selected,o=this.getTreemapData();return r.a.createElement("div",{className:"App"},r.a.createElement(E,{isLive:t,isActive:i,selected:n,handleClick:this.handleClick,handleLiveClick:this.handleLiveClick}),o.length>90&&i?r.a.createElement("div",{className:"tree"},r.a.createElement(f,{data:o})):r.a.createElement(T.a,{fadeIn:"none",className:"spinner"}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(r.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[160,2,1]]]);
//# sourceMappingURL=main.8434e731.chunk.js.map