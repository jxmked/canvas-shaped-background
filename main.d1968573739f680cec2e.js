(()=>{var t={103:()=>{},261:(t,e,o)=>{"use strict";o.r(e)},75:function(t){(function(){var e,o,n,i,r,a;"undefined"!=typeof performance&&null!==performance&&performance.now?t.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(t.exports=function(){return(e()-r)/1e6},o=process.hrtime,i=(e=function(){var t;return 1e9*(t=o())[0]+t[1]})(),a=1e9*process.uptime(),r=i-a):Date.now?(t.exports=function(){return Date.now()-n},n=Date.now()):(t.exports=function(){return(new Date).getTime()-n},n=(new Date).getTime())}).call(this)},87:(t,e,o)=>{for(var n=o(75),i="undefined"==typeof window?o.g:window,r=["moz","webkit"],a="AnimationFrame",s=i["request"+a],l=i["cancel"+a]||i["cancelRequest"+a],c=0;!s&&c<r.length;c++)s=i[r[c]+"Request"+a],l=i[r[c]+"Cancel"+a]||i[r[c]+"CancelRequest"+a];if(!s||!l){var u=0,f=0,h=[];s=function(t){if(0===h.length){var e=n(),o=Math.max(0,16.666666666666668-(e-u));u=o+e,setTimeout((function(){var t=h.slice(0);h.length=0;for(var e=0;e<t.length;e++)if(!t[e].cancelled)try{t[e].callback(u)}catch(t){setTimeout((function(){throw t}),0)}}),Math.round(o))}return h.push({handle:++f,callback:t,cancelled:!1}),f},l=function(t){for(var e=0;e<h.length;e++)h[e].handle===t&&(h[e].cancelled=!0)}}t.exports=function(t){return s.call(i,t)},t.exports.cancel=function(){l.apply(i,arguments)},t.exports.polyfill=function(t){t||(t=i),t.requestAnimationFrame=s,t.cancelAnimationFrame=l}},851:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.MovableScreenObject=e.ScreenObject=void 0;class o{constructor(){this._is_visible=!0}get visibility(){return this._is_visible}}e.ScreenObject=o,e.MovableScreenObject=class extends o{}},601:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.randomColors=void 0,e.randomColors=["#4ab098","#ea5e5d","#f8ba3f","#3f82f3"]},244:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t){this.rect=t.getBoundingClientRect(),this.factor=t.width/this.rect.width}x(t){return this.factor*(t-this.rect.left)}y(t){return this.factor*(t-this.rect.top)}}},233:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=(t,e)=>{const o=[],n=e.w/2,i=e.h/2;for(let e=0;e<t;e++){const r=Math.PI/(t/2)*e;o.push({index:e,x:n-n*Math.cos(r),y:i-i*Math.sin(r)})}return o}},519:(t,e,o)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=o(655).__importDefault(o(87)),i=o(928);class r{constructor(t){this.canvas=t,this.init(),this.ctx=this.canvas.getContext("2d"),this.layers=new Map,this.initializedLayers=[],this.beforeExtendedAnim=t=>{},this.afterExtendedAnim=t=>{}}wallCollisionChecker(t,e){const{width:o,height:n}=this.canvas,{position:i,scale:a}=t.config,s=t.area.w*a/2,l=t.area.h*a/2;let c=0;i.y-l<=r.wallAdjustment?c|=8:i.y+l>=n&&(c|=2),i.x-s<=r.wallAdjustment?c|=1:i.x+s>=o&&(c|=4),c>0&&e(c)}init(){try{const t=getComputedStyle(this.canvas);this.canvas.width=2*parseFloat(t.width),this.canvas.height=2*parseFloat(t.height)}catch(t){throw new Error("Failed to get actual screen size")}}start(){(0,n.default)(this.animate.bind(this))}animate(){const{width:t,height:e}=this.canvas;this.ctx.clearRect(0,0,t,e),this.ctx.imageSmoothingEnabled=!1,this.beforeExtendedAnim.call(this.beforeExtendedAnim,this.ctx);for(const[o,n]of this.layers)n.update(0),this.wallCollisionChecker(n,(o=>{const{position:a,velocity:s,scale:l}=n.config,c=n.area;(10&o)>0&&(s.y=(0,i.flipNum)(s.y),a.y=e,(8&o)>0&&(a.y=c.h*l+r.wallAdjustment),a.y-=c.h*l/2),(5&o)>0&&(s.x=(0,i.flipNum)(s.x),a.x=t,(1&o)>0&&(a.x=c.w*l+r.wallAdjustment),a.x-=c.w*l/2)})),n.display(this.ctx);this.afterExtendedAnim.call(this.afterExtendedAnim,this.ctx),(0,n.default)(this.animate.bind(this))}insertLayer(t,e){this.layers.set(t,e)}initializeLayers(){for(const[t,e]of this.layers)t in this.initializedLayers||(e.init(),this.initializedLayers.push(t))}beforeLayersAnimation(t){this.beforeExtendedAnim=t}afterLayersAnimation(t){this.afterExtendedAnim=t}}e.default=r,r.wallAdjustment=-80},588:(t,e,o)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=o(655).__importDefault(o(533));class i extends n.default{init(){this.path2D.ellipse(0,0,this.pathDimension.w/2,this.pathDimension.h/2,0,0,2*Math.PI)}update(t=0){const{velocity:e,position:o,is_movable:n}=this.config;void 0!==e.rot&&(this.config.rotation+=e.rot),n||(o.x+=e.x,o.y+=e.y)}display(t){if(this.is_hidden)return;const{position:e,scale:o,rotation:n}=this.config;t.save(),t.translate(e.x,e.y),t.scale(o,o),t.rotate(n),this.applyStyle(t,!0),t.restore()}}e.default=i},69:(t,e,o)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=o(655).__importDefault(o(533));class i extends n.default{init(){const t=this.path2D;let{w:e,h:o}=this.pathDimension;t.moveTo(.4*e,0),t.lineTo(.4*e,.4*o),t.lineTo(0,.4*o),t.lineTo(0,.6*o),t.lineTo(.4*e,.6*o),t.lineTo(.4*e,o),t.lineTo(.6*e,o),t.lineTo(.6*e,.6*o),t.lineTo(e,.6*o),t.lineTo(e,.4*o),t.lineTo(.6*e,.4*o),t.lineTo(.6*e,0),t.closePath()}update(t=0){const{velocity:e,position:o,is_movable:n}=this.config;void 0!==e.rot&&(this.config.rotation+=e.rot),n||(o.x+=e.x,o.y+=e.y)}display(t){if(this.is_hidden)return;const{position:e,scale:o,rotation:n}=this.config;t.save(),t.translate(e.x,e.y),t.scale(o,o),t.rotate(n),t.translate(-this.pathDimension.w/2,-this.pathDimension.h/2),this.applyStyle(t,!0),t.restore()}}e.default=i},245:(t,e,o)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=o(655),i=n.__importDefault(o(533)),r=n.__importDefault(o(233));class a extends i.default{init(){const t=this.path2D;for(const e of(0,r.default)(6,this.pathDimension))(0===e.index?t.moveTo:t.lineTo).call(t,e.x,e.y);t.closePath()}update(t=0){const{velocity:e,position:o}=this.config;o.x+=e.x,o.y+=e.y,void 0!==e.rot&&(this.config.rotation+=e.rot)}display(t){if(this.is_hidden)return;const{position:e,scale:o,rotation:n}=this.config;t.save(),t.translate(e.x,e.y),t.scale(o,o),t.rotate(n),t.translate(-this.pathDimension.w/2,-this.pathDimension.h/2),this.applyStyle(t,!0),t.restore()}}e.default=a},960:(t,e,o)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Cross=e.Octagon=e.Hexagon=e.Circle=e.Square=e.Triangle=void 0;const n=o(655),i=n.__importDefault(o(8));e.Triangle=i.default;const r=n.__importDefault(o(205));e.Square=r.default;const a=n.__importDefault(o(245));e.Hexagon=a.default;const s=n.__importDefault(o(893));e.Octagon=s.default;const l=n.__importDefault(o(69));e.Cross=l.default;const c=n.__importDefault(o(588));e.Circle=c.default},893:(t,e,o)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=o(655),i=n.__importDefault(o(533)),r=n.__importDefault(o(233));class a extends i.default{init(){const t=this.path2D;for(const e of(0,r.default)(8,this.pathDimension))(0===e.index?t.moveTo:t.lineTo).call(t,e.x,e.y);t.closePath()}update(t=0){const{velocity:e,position:o,is_movable:n}=this.config;void 0!==e.rot&&(this.config.rotation+=e.rot),n||(o.x+=e.x,o.y+=e.y)}display(t){if(this.is_hidden)return;const{position:e,scale:o,rotation:n}=this.config;t.save(),t.translate(e.x,e.y),t.scale(o,o),t.rotate(n),t.translate(-this.pathDimension.w/2,-this.pathDimension.h/2),this.applyStyle(t,!0),t.restore()}}e.default=a},533:(t,e,o)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=o(851);class i extends n.ScreenObject{constructor(t){super(),this.config=t,i._shapeID++,this.pathDimension={h:100,w:100},this.path2D=new Path2D,this.is_hidden=!1}get shapeID(){return i._shapeID}get area(){return this.pathDimension}move({x:t,y:e}){this.config.position={x:t,y:e}}applyStyle(t,e){if("fill"===this.config.style)return t.fillStyle=this.config.color,void(e?t.fill(this.path2D):t.fill());t.fillStyle="none",t.strokeStyle=this.config.color,t.lineWidth=this.config.thick,e?t.stroke(this.path2D):t.stroke()}}i._shapeID=0,e.default=i},205:(t,e,o)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=o(655),i=n.__importDefault(o(533)),r=n.__importDefault(o(233));class a extends i.default{init(){const t=this.path2D;for(const e of(0,r.default)(4,this.pathDimension))(0===e.index?t.moveTo:t.lineTo).call(t,e.x,e.y);t.closePath()}update(t=0){const{velocity:e,position:o,is_movable:n}=this.config;void 0!==e.rot&&(this.config.rotation+=e.rot),n||(o.x+=e.x,o.y+=e.y)}display(t){if(this.is_hidden)return;const{position:e,scale:o,rotation:n}=this.config;t.save(),t.translate(e.x,e.y),t.scale(o,o),t.rotate(n),t.translate(-this.pathDimension.w/2,-this.pathDimension.h/2),this.applyStyle(t,!0),t.restore()}}e.default=a},8:(t,e,o)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=o(655),i=n.__importDefault(o(533)),r=n.__importDefault(o(233));class a extends i.default{init(){const t=this.path2D;for(const e of(0,r.default)(3,this.pathDimension))(0===e.index?t.moveTo:t.lineTo).call(t,e.x,e.y);t.closePath()}update(t=0){const{velocity:e,position:o,is_movable:n}=this.config;void 0!==e.rot&&(this.config.rotation+=e.rot),n||(o.x+=e.x,o.y+=e.y)}display(t){if(this.is_hidden)return;const{position:e,scale:o,rotation:n}=this.config;t.save(),t.translate(e.x,e.y),t.scale(o,o),t.rotate(n),t.translate(-this.pathDimension.w/2,-this.pathDimension.h/2),this.applyStyle(t,!0),t.restore()}}e.default=a},701:(t,e,o)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=o(655).__importStar(o(960)),i=o(928),r=o(601),a=o(851),s=Object.values(n);class l extends a.MovableScreenObject{constructor(t){super(),this.identifier=t,this.shapes=new Map,this.coor={x:0,y:0},this.is_down=!0,this.is_to_be_kill=!1,this._kill_now=!1,this.lift_up_time=0,this.viewingLevel=1,this.shapes.set(1,this.getRandomShape(1)),this.shapes.set(2,this.getRandomShape(.8)),this.shapes.set(3,this.getRandomShape(1.6))}getRandomShape(t){return new((0,i.getRandomItem)(s))({rotation:0,velocity:{x:0,y:0,rot:(0,i.flipper)(400)*(0,i.random)()},color:(0,i.getRandomItem)(r.randomColors),is_solid:Math.random()>.5,thick:5,style:Math.random()>.5?"stroke":"fill",position:this.coor,is_movable:!0,scale:t})}get kill_now(){return this._kill_now}get to_be_kill(){return this.is_to_be_kill}get id(){return this.identifier}get position(){return Object.assign({},this.coor)}move({x:t,y:e}){this.coor={x:t,y:e}}up(){this.is_down&&(this.is_down=!1,this.is_to_be_kill=!0)}down({x:t,y:e}){this.coor={x:t,y:e}}init(){for(const t of this.shapes.values())t.init()}update(t){this.is_to_be_kill&&(this.is_down||0!==this.lift_up_time||(this.lift_up_time=t,this.viewingLevel=2),.5*l.kill_interval+this.lift_up_time<=t&&(this.viewingLevel=3),this.lift_up_time+l.kill_interval<=t&&(this._kill_now=!0));for(const e of this.shapes.values())e.config.position=this.coor,e.update(t)}display(t){try{this.shapes.get(this.viewingLevel).display(t)}catch(t){console.error("Shape doesn't exists")}}}e.default=l,l.kill_interval=100},544:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.flipNum=void 0,e.flipNum=t=>0===t?t:t>0?-t:Math.abs(t)},643:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.flipper=void 0,e.flipper=t=>Math.floor(2*Math.random()*t-t)},355:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getRandomInRange=void 0,e.getRandomInRange=(t,e)=>Math.floor(Math.random()*(e-t))+t},949:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getRandomItem=void 0,e.getRandomItem=t=>t[Math.floor(Math.random()*t.length)]},928:(t,e,o)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=o(655);n.__exportStar(o(355),e),n.__exportStar(o(643),e),n.__exportStar(o(949),e),n.__exportStar(o(544),e),n.__exportStar(o(451),e)},451:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.random=void 0,e.random=()=>Math.random()/1e3},655:(t,e,o)=>{"use strict";o.r(e),o.d(e,{__assign:()=>r,__asyncDelegator:()=>g,__asyncGenerator:()=>w,__asyncValues:()=>x,__await:()=>b,__awaiter:()=>u,__classPrivateFieldGet:()=>P,__classPrivateFieldIn:()=>T,__classPrivateFieldSet:()=>M,__createBinding:()=>h,__decorate:()=>s,__exportStar:()=>d,__extends:()=>i,__generator:()=>f,__importDefault:()=>S,__importStar:()=>D,__makeTemplateObject:()=>O,__metadata:()=>c,__param:()=>l,__read:()=>y,__rest:()=>a,__spread:()=>_,__spreadArray:()=>v,__spreadArrays:()=>m,__values:()=>p});var n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])},n(t,e)};function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}var r=function(){return r=Object.assign||function(t){for(var e,o=1,n=arguments.length;o<n;o++)for(var i in e=arguments[o])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},r.apply(this,arguments)};function a(t,e){var o={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(o[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(n=Object.getOwnPropertySymbols(t);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(t,n[i])&&(o[n[i]]=t[n[i]])}return o}function s(t,e,o,n){var i,r=arguments.length,a=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,n);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(a=(r<3?i(a):r>3?i(e,o,a):i(e,o))||a);return r>3&&a&&Object.defineProperty(e,o,a),a}function l(t,e){return function(o,n){e(o,n,t)}}function c(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}function u(t,e,o,n){return new(o||(o=Promise))((function(i,r){function a(t){try{l(n.next(t))}catch(t){r(t)}}function s(t){try{l(n.throw(t))}catch(t){r(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(a,s)}l((n=n.apply(t,e||[])).next())}))}function f(t,e){var o,n,i,r,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function s(s){return function(l){return function(s){if(o)throw new TypeError("Generator is already executing.");for(;r&&(r=0,s[0]&&(a=0)),a;)try{if(o=1,n&&(i=2&s[0]?n.return:s[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,s[1])).done)return i;switch(n=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,n=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=e.call(t,a)}catch(t){s=[6,t],n=0}finally{o=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}}var h=Object.create?function(t,e,o,n){void 0===n&&(n=o);var i=Object.getOwnPropertyDescriptor(e,o);i&&!("get"in i?!e.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return e[o]}}),Object.defineProperty(t,n,i)}:function(t,e,o,n){void 0===n&&(n=o),t[n]=e[o]};function d(t,e){for(var o in t)"default"===o||Object.prototype.hasOwnProperty.call(e,o)||h(e,t,o)}function p(t){var e="function"==typeof Symbol&&Symbol.iterator,o=e&&t[e],n=0;if(o)return o.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function y(t,e){var o="function"==typeof Symbol&&t[Symbol.iterator];if(!o)return t;var n,i,r=o.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(n=r.next()).done;)a.push(n.value)}catch(t){i={error:t}}finally{try{n&&!n.done&&(o=r.return)&&o.call(r)}finally{if(i)throw i.error}}return a}function _(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(y(arguments[e]));return t}function m(){for(var t=0,e=0,o=arguments.length;e<o;e++)t+=arguments[e].length;var n=Array(t),i=0;for(e=0;e<o;e++)for(var r=arguments[e],a=0,s=r.length;a<s;a++,i++)n[i]=r[a];return n}function v(t,e,o){if(o||2===arguments.length)for(var n,i=0,r=e.length;i<r;i++)!n&&i in e||(n||(n=Array.prototype.slice.call(e,0,i)),n[i]=e[i]);return t.concat(n||Array.prototype.slice.call(e))}function b(t){return this instanceof b?(this.v=t,this):new b(t)}function w(t,e,o){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,i=o.apply(t,e||[]),r=[];return n={},a("next"),a("throw"),a("return"),n[Symbol.asyncIterator]=function(){return this},n;function a(t){i[t]&&(n[t]=function(e){return new Promise((function(o,n){r.push([t,e,o,n])>1||s(t,e)}))})}function s(t,e){try{(o=i[t](e)).value instanceof b?Promise.resolve(o.value.v).then(l,c):u(r[0][2],o)}catch(t){u(r[0][3],t)}var o}function l(t){s("next",t)}function c(t){s("throw",t)}function u(t,e){t(e),r.shift(),r.length&&s(r[0][0],r[0][1])}}function g(t){var e,o;return e={},n("next"),n("throw",(function(t){throw t})),n("return"),e[Symbol.iterator]=function(){return this},e;function n(n,i){e[n]=t[n]?function(e){return(o=!o)?{value:b(t[n](e)),done:"return"===n}:i?i(e):e}:i}}function x(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,o=t[Symbol.asyncIterator];return o?o.call(t):(t=p(t),e={},n("next"),n("throw"),n("return"),e[Symbol.asyncIterator]=function(){return this},e);function n(o){e[o]=t[o]&&function(e){return new Promise((function(n,i){!function(t,e,o,n){Promise.resolve(n).then((function(e){t({value:e,done:o})}),e)}(n,i,(e=t[o](e)).done,e.value)}))}}}function O(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t}var j=Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e};function D(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o in t)"default"!==o&&Object.prototype.hasOwnProperty.call(t,o)&&h(e,t,o);return j(e,t),e}function S(t){return t&&t.__esModule?t:{default:t}}function P(t,e,o,n){if("a"===o&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===o?n:"a"===o?n.call(t):n?n.value:e.get(t)}function M(t,e,o,n,i){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!i)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?i.call(t,o):i?i.value=o:e.set(t,o),o}function T(t,e){if(null===e||"object"!=typeof e&&"function"!=typeof e)throw new TypeError("Cannot use 'in' operator on non-object");return"function"==typeof t?e===t:t.has(e)}}},e={};function o(n){var i=e[n];if(void 0!==i)return i.exports;var r=e[n]={exports:{}};return t[n].call(r.exports,r,r.exports,o),r.exports}o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{"use strict";const t=o(655);o(261),o(103);const e=t.__importStar(o(960)),n=t.__importDefault(o(519)),i=o(928),r=t.__importDefault(o(244)),a=t.__importDefault(o(701)),s=o(601),l=document.querySelector("#canvas"),c=document.querySelector("#overlayed-canvas"),u=new n.default(l),f=Object.values(e);let h=0;u.start();const{width:d,height:p}=l;c.width=d,c.height=p;const y=Math.abs(Math.floor(Math.sqrt(d*p)/39));let _=window.setInterval((()=>{!function(){h++;const t=new((0,i.getRandomItem)(f))({rotation:0,velocity:{x:(0,i.flipper)(d*(0,i.random)()),y:(0,i.flipper)(p*(0,i.random)()),rot:(0,i.flipper)(100)*(0,i.random)()},color:(0,i.getRandomItem)(s.randomColors),scale:400*(0,i.random)()+1,is_solid:Math.random()>.5,thick:5,style:Math.random()>.5?"stroke":"fill",position:{x:(0,i.getRandomInRange)(0,d),y:(0,i.getRandomInRange)(0,p)},is_movable:!1});u.insertLayer(String(h),t),u.initializeLayers()}(),h>=y&&window.clearInterval(_)}),10);console.log(`Viewing ${y} moving items.`);const m=c.getContext("2d"),v=new r.default(c),b=[],w=[];c.addEventListener("touchstart",(function(t){t.preventDefault();for(const{identifier:e,clientX:o,clientY:n}of Array.from(t.touches)){if(e in w)continue;const t=new a.default(e);t.down({x:v.x(o),y:v.y(n)}),t.init(),b.push(t),w.push(e)}})),c.addEventListener("touchmove",(function(t){t.preventDefault();for(const{identifier:e,clientX:o,clientY:n}of Array.from(t.touches))for(const t of b)t.to_be_kill||e===t.id&&t.move({x:v.x(o),y:v.y(n)})})),c.addEventListener("touchend",(function(t){t.preventDefault();const e=Array.from(t.touches).map((t=>t.identifier));for(const t of b)t.to_be_kill||-1===e.indexOf(t.id)&&t.up();for(const t in w)-1===e.indexOf(w[t])&&w.splice(Number(t),1)})),u.afterLayersAnimation((t=>{const e=performance.now();m.clearRect(0,0,l.width,l.height),m.imageSmoothingEnabled=!1;for(const t in b){const o=b[t];o.kill_now?b.splice(Number(t),1):(o.update(e),o.display(m))}}))})()})();