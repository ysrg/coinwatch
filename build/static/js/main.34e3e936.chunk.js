(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{158:function(t,e,a){t.exports=a(360)},163:function(t,e,a){},188:function(t,e){},355:function(t,e,a){},360:function(t,e,a){"use strict";a.r(e);var n=a(1),c=a.n(n),s=a(149),i=a.n(s),o=(a(163),a(24)),l=a(150),r=a(151),h=a(152),u=a(156),d=a(153),b=a(157),m=a(154),v=a.n(m),p=a(80),f=a.n(p),k=a(155),y=(a(355),function(t){function e(t){var a;return Object(r.a)(this,e),(a=Object(u.a)(this,Object(d.a)(e).call(this,t))).connectSocket=function(t){var e=v()("/");"string"!==typeof t&&a.setState({isLive:!a.state.isLive}),e.on("retrieve",function(t){a.handleRes(t,a.state.isLive)})},a.handleRes=function(t,e){console.log("live",e);var n=Object.keys(t[t.symbol]).slice(-3),c=n.reduce(function(e,a,n){return e[a]=t[t.symbol][a],e},{});if(Object.keys(c).length>2){var s=Math.abs(n[n.length-1]-n[n.length-2])/36e5,i=+c[n[n.length-(e?1:2)]].volume,r=+c[n[n.length-(e?2:3)]].volume,h=+c[n[n.length-(e?1:2)]].open,u=+c[n[n.length-(e?1:2)]].close,d=h<u?u/h*100-100:100-h/u*100,b=Math.abs(n[n.length-1]-n[n.length-2])/36e5,m=i&&r?(i/r).toFixed(3):0;a.setState(Object(o.a)({period:s},t.symbol,Object(l.a)({},c,{time:b,currVol:i,prevVol:r,change:m,prch:d.toFixed(2)})))}},a.computeColor=function(t){return a.state[t].prch<0?a.state[t].prch<-3?a.state[t].prch<-6?a.state[t].prch<-15?"#DB4B38":"#E97253":"#EE9778":"#fcd3bf":a.state[t].prch>3?a.state[t].prch>10?a.state[t].prch>15?"#5FA964":"#ACD6A0":"#CDE7C2":"#e4efdc"},a.handleClick=function(t){a.setState(a.baseState,function(){}),a.setState({selected:Object(o.a)({},t.target.value,"active"),isActive:!1}),setTimeout(function(){a.setState({isActive:!0})},1500),f.a.post("/",{timestamp:t.target.value}).then(function(t){}).catch(function(t){})},a.baseState=a.state,a.state={isActive:!0,tvol:0,selected:!1,isLive:!1},a}return Object(b.a)(e,t),Object(h.a)(e,[{key:"componentDidMount",value:function(){var t=this.setState.bind(this);f.a.post("/",{timestamp:"4h"}).then(function(e){t({selected:{"4h":"active"}})}).catch(function(t){}),this.connectSocket("4h")}},{key:"shouldComponentUpdate",value:function(t,e){var a=Object.keys(e),n=Object.keys(this.state);a.indexOf("BTCUSDT"),n.indexOf("BTCUSDT");return 111!==Object.keys(this.state).length||Object.keys(this.state).length!==Object.keys(e).length||this.state.tvol!==e.tvol||this.state.isActive!==e.isActive}},{key:"componentDidUpdate",value:function(t,e,a){var n=this,c=Object.keys(this.state);Object.keys(this.state[c[c.length-1]]);c.length;var s=new Date(15422868e5),i=new Date(15422832e5),o=(Math.abs(s-i),Object.keys(this.state).reduce(function(t,e,a){return n.state[e].hasOwnProperty("currVol")&&(t+=n.state[e].currVol),t},0));this.state.tvol!==o&&this.setState({tvol:o})}},{key:"render",value:function(){var t=this,e=Object.keys(this.state).map(function(e){var a=t.computeColor(e);return{name:"USDT"==e.slice(-4)?e.slice(0,-4):e.slice(0,-3),color:a,loc:+t.state[e].change>0?Math.round(100*t.state[e].change)/100:0,prch:t.state[e].prch,time:t.state[e].time,o:function(){return c.a.createElement("h1",null,e)}}}).filter(function(e){return e.time==t.state.period});return c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"App-header"},c.a.createElement("div",{className:"btn-group","data-toggle":"buttons",role:"group"},c.a.createElement("button",{onClick:this.connectSocket,value:"Live",className:"btn btn-danger ".concat(this.state.isLive?"active":null)},"Live",c.a.createElement("div",{style:{color:"#ffffff"},class:"la-ball-scale-multiple la-dark la-sm"},c.a.createElement("div",null),c.a.createElement("div",null),c.a.createElement("div",null))),c.a.createElement("button",{disabled:!this.state.isActive,value:"5m",onClick:this.handleClick,type:"button",className:"btn btn-secondary ".concat(this.state.selected["5m"])},"5m"),c.a.createElement("button",{disabled:!this.state.isActive,value:"15m",onClick:this.handleClick,type:"button",className:"btn btn-secondary ".concat(this.state.selected["15m"])},"15m"),c.a.createElement("button",{disabled:!this.state.isActive,value:"30m",onClick:this.handleClick,type:"button",className:"btn btn-secondary ".concat(this.state.selected["30m"])},"30m"),c.a.createElement("button",{disabled:!this.state.isActive,value:"1h",onClick:this.handleClick,type:"button",className:"btn btn-secondary ".concat(this.state.selected["1h"])},"1H"),c.a.createElement("button",{disabled:!this.state.isActive,value:"4h",onClick:this.handleClick,type:"button",className:"btn btn-secondary ".concat(this.state.selected["4h"])},"4H"),c.a.createElement("button",{disabled:!this.state.isActive,value:"8h",onClick:this.handleClick,type:"button",className:"btn btn-secondary ".concat(this.state.selected["8h"])},"8H"),c.a.createElement("button",{disabled:!this.state.isActive,value:"1d",onClick:this.handleClick,type:"button",className:"btn btn-secondary ".concat(this.state.selected["1d"])},"1D"),c.a.createElement("button",{disabled:!this.state.isActive,value:"1w",onClick:this.handleClick,type:"button",className:"btn btn-secondary ".concat(this.state.selected["1w"])},"1W"),c.a.createElement("button",{disabled:!this.state.isActive,value:"1M",onClick:this.handleClick,type:"button",className:"btn btn-secondary ".concat(this.state.selected["1M"])},"1M"))),Object.keys(this.state).length>100?c.a.createElement(k.ResponsiveTreeMap,{root:{name:"crypto-signal",color:"#f3f9ef",children:e},identity:"name",value:"loc",innerPadding:3,outerPadding:4,label:function(t){return"".concat(t.name," ").concat(t.prch?t.prch+"%":"")},labelSkipSize:8,labelTextColor:"inherit:darker(3.2)",colorBy:function(t){return t.color},borderWidth:1,borderColor:"inherit:darker(2.3)",motionDamping:35,motionStiffness:300,animate:!1,tooltip:function(t){return c.a.createElement("p",{style:{color:t.data.color}}," ","".concat(t.data.name," ").concat(t.data.loc?t.data.loc+"x":"")," ")},theme:{tooltip:{container:{color:"#fff",background:"#333"}}}}):"Loading")}}]),e}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[158,2,1]]]);
//# sourceMappingURL=main.34e3e936.chunk.js.map