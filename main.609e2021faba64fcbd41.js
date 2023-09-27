(()=>{var t={103:()=>{},261:(t,e,n)=>{"use strict";n.r(e)},75:function(t){(function(){var e,n,o,i,r,a;"undefined"!=typeof performance&&null!==performance&&performance.now?t.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(t.exports=function(){return(e()-r)/1e6},n=process.hrtime,i=(e=function(){var t;return 1e9*(t=n())[0]+t[1]})(),a=1e9*process.uptime(),r=i-a):Date.now?(t.exports=function(){return Date.now()-o},o=Date.now()):(t.exports=function(){return(new Date).getTime()-o},o=(new Date).getTime())}).call(this)},87:(t,e,n)=>{for(var o=n(75),i="undefined"==typeof window?n.g:window,r=["moz","webkit"],a="AnimationFrame",s=i["request"+a],l=i["cancel"+a]||i["cancelRequest"+a],c=0;!s&&c<r.length;c++)s=i[r[c]+"Request"+a],l=i[r[c]+"Cancel"+a]||i[r[c]+"CancelRequest"+a];if(!s||!l){var u=0,f=0,h=[];s=function(t){if(0===h.length){var e=o(),n=Math.max(0,16.666666666666668-(e-u));u=n+e,setTimeout((function(){var t=h.slice(0);h.length=0;for(var e=0;e<t.length;e++)if(!t[e].cancelled)try{t[e].callback(u)}catch(t){setTimeout((function(){throw t}),0)}}),Math.round(n))}return h.push({handle:++f,callback:t,cancelled:!1}),f},l=function(t){for(var e=0;e<h.length;e++)h[e].handle===t&&(h[e].cancelled=!0)}}t.exports=function(t){return s.call(i,t)},t.exports.cancel=function(){l.apply(i,arguments)},t.exports.polyfill=function(t){t||(t=i),t.requestAnimationFrame=s,t.cancelAnimationFrame=l}},851:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.MovableScreenObject=e.ScreenObject=void 0;class n{constructor(){this._is_visible=!0}get visibility(){return this._is_visible}}e.ScreenObject=n,e.MovableScreenObject=class extends n{}},601:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.randomColors=void 0,e.randomColors=["#4ab098","#ea5e5d","#f8ba3f","#3f82f3"]},244:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t){this.canvas=t,this.rect=this.canvas.getBoundingClientRect(),this.factor=this.canvas.width/this.rect.width}x(t){return this.factor*(t-this.rect.left)}y(t){return this.factor*(t-this.rect.top)}resize(){this.rect=this.canvas.getBoundingClientRect(),this.factor=this.canvas.width/this.rect.width}}},233:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=(t,e)=>{const n=[],o=e.w/2,i=e.h/2,r=Math.PI/(t/2);for(let e=0;e<t;e++){const t=r*e;n.push({index:e,x:o-o*Math.cos(t),y:i-i*Math.sin(t)})}return n}},519:(t,e,n)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=n(655).__importDefault(n(87)),i=n(928);class r{constructor(t){this.canvas=t,this.init(),this.ctx=this.canvas.getContext("2d"),this.layers=new Map,this.initializedLayers=[],this.beforeExtendedAnim=t=>{},this.afterExtendedAnim=t=>{}}wallCollisionChecker(t,e){const{width:n,height:o}=this.canvas,{position:i,scale:a}=t.config,s=t.area.w*a/2,l=t.area.h*a/2;let c=0;i.y-l<=r.wallAdjustment?c|=8:i.y+l>=o&&(c|=2),i.x-s<=r.wallAdjustment?c|=1:i.x+s>=n&&(c|=4),c>0&&e(c)}init(){try{const t=getComputedStyle(this.canvas);this.canvas.width=2*parseFloat(t.width),this.canvas.height=2*parseFloat(t.height)}catch(t){throw new Error("Failed to get actual screen size")}}start(){(0,o.default)(this.animate.bind(this))}animate(){const{width:t,height:e}=this.canvas;this.ctx.clearRect(0,0,t,e),this.ctx.imageSmoothingEnabled=!1,this.beforeExtendedAnim.call(this.beforeExtendedAnim,this.ctx);for(const[n,o]of this.layers)o.update(),this.wallCollisionChecker(o,(n=>{const{position:a,velocity:s,scale:l}=o.config,c=o.area;(10&n)>0&&(s.y=(0,i.flipNum)(s.y),a.y=e,(8&n)>0&&(a.y=c.h*l+r.wallAdjustment),a.y-=c.h*l/2),(5&n)>0&&(s.x=(0,i.flipNum)(s.x),a.x=t,(1&n)>0&&(a.x=c.w*l+r.wallAdjustment),a.x-=c.w*l/2)})),o.display(this.ctx);this.afterExtendedAnim.call(this.afterExtendedAnim,this.ctx),(0,o.default)(this.animate.bind(this))}insertLayer(t,e){this.layers.set(t,e)}initializeLayers(){for(const[t,e]of this.layers)t in this.initializedLayers||(e.init(),this.initializedLayers.push(t))}beforeLayersAnimation(t){this.beforeExtendedAnim=t}afterLayersAnimation(t){this.afterExtendedAnim=t}}e.default=r,r.wallAdjustment=-80},588:(t,e,n)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=n(655).__importDefault(n(533));class i extends o.default{init(){this.path2D.ellipse(0,0,this.pathDimension.w/2,this.pathDimension.h/2,0,0,2*Math.PI)}display(t){const{position:e,scale:n,rotation:o}=this.config;t.save(),t.translate(e.x,e.y),t.scale(n,n),t.rotate(o),this.applyStyle(t,!0),t.restore()}}e.default=i},69:(t,e,n)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=n(655).__importDefault(n(533));class i extends o.default{init(){const t=this.path2D,{w:e,h:n}=this.pathDimension;t.moveTo(.4*e,0),t.lineTo(.4*e,.4*n),t.lineTo(0,.4*n),t.lineTo(0,.6*n),t.lineTo(.4*e,.6*n),t.lineTo(.4*e,n),t.lineTo(.6*e,n),t.lineTo(.6*e,.6*n),t.lineTo(e,.6*n),t.lineTo(e,.4*n),t.lineTo(.6*e,.4*n),t.lineTo(.6*e,0),t.closePath()}display(t){const{position:e,scale:n,rotation:o}=this.config;t.save(),t.translate(e.x,e.y),t.scale(n,n),t.rotate(o),t.translate(-this.pathDimension.w/2,-this.pathDimension.h/2),this.applyStyle(t,!0),t.restore()}}e.default=i},245:(t,e,n)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=n(655),i=o.__importDefault(n(533)),r=o.__importDefault(n(233));class a extends i.default{init(){const t=this.path2D;for(const e of(0,r.default)(3,this.pathDimension))0===e.index?t.moveTo(e.x,e.y):t.lineTo(e.x,e.y);t.closePath()}display(t){const{position:e,scale:n,rotation:o}=this.config;t.save(),t.translate(e.x,e.y),t.scale(n,n),t.rotate(o),t.translate(-this.pathDimension.w/2,-this.pathDimension.h/2),this.applyStyle(t,!0),t.restore()}}e.default=a},960:(t,e,n)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Cross=e.Octagon=e.Hexagon=e.Circle=e.Square=e.Triangle=void 0;const o=n(655),i=o.__importDefault(n(8));e.Triangle=i.default;const r=o.__importDefault(n(205));e.Square=r.default;const a=o.__importDefault(n(245));e.Hexagon=a.default;const s=o.__importDefault(n(893));e.Octagon=s.default;const l=o.__importDefault(n(69));e.Cross=l.default;const c=o.__importDefault(n(588));e.Circle=c.default},893:(t,e,n)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=n(655),i=o.__importDefault(n(533)),r=o.__importDefault(n(233));class a extends i.default{init(){const t=this.path2D;for(const e of(0,r.default)(3,this.pathDimension))0===e.index?t.moveTo(e.x,e.y):t.lineTo(e.x,e.y);t.closePath()}display(t){const{position:e,scale:n,rotation:o}=this.config;t.save(),t.translate(e.x,e.y),t.scale(n,n),t.rotate(o),t.translate(-this.pathDimension.w/2,-this.pathDimension.h/2),this.applyStyle(t,!0),t.restore()}}e.default=a},533:(t,e,n)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=n(851);class i extends o.ScreenObject{constructor(t){super(),this.config=t,i._shapeID++,this.pathDimension={h:100,w:100},this.path2D=new Path2D}get shapeID(){return i._shapeID}get area(){return this.pathDimension}move({x:t,y:e}){this.config.position={x:t,y:e}}applyStyle(t,e){if("fill"===this.config.style)return t.fillStyle=this.config.color,void(e?t.fill(this.path2D):t.fill());t.fillStyle="none",t.strokeStyle=this.config.color,t.lineWidth=this.config.thick,e?t.stroke(this.path2D):t.stroke()}update(){const{velocity:t,position:e}=this.config;void 0!==t.rot&&(this.config.rotation+=t.rot),e.x+=t.x,e.y+=t.y}}e.default=i,i._shapeID=0},205:(t,e,n)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=n(655),i=o.__importDefault(n(533)),r=o.__importDefault(n(233));class a extends i.default{init(){const t=this.path2D;for(const e of(0,r.default)(3,this.pathDimension))0===e.index?t.moveTo(e.x,e.y):t.lineTo(e.x,e.y);t.closePath()}display(t){const{position:e,scale:n,rotation:o}=this.config;t.save(),t.translate(e.x,e.y),t.scale(n,n),t.rotate(o),t.translate(-this.pathDimension.w/2,-this.pathDimension.h/2),this.applyStyle(t,!0),t.restore()}}e.default=a},8:(t,e,n)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=n(655),i=o.__importDefault(n(533)),r=o.__importDefault(n(233));class a extends i.default{init(){const t=this.path2D;for(const e of(0,r.default)(3,this.pathDimension))0===e.index?t.moveTo(e.x,e.y):t.lineTo(e.x,e.y);t.closePath()}display(t){const{position:e,scale:n,rotation:o}=this.config;t.save(),t.translate(e.x,e.y),t.scale(n,n),t.rotate(o),t.translate(-this.pathDimension.w/2,-this.pathDimension.h/2),this.applyStyle(t,!0),t.restore()}}e.default=a},701:(t,e,n)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=n(655).__importStar(n(960)),i=n(928),r=n(601),a=n(851),s=Object.values(o);class l extends a.MovableScreenObject{constructor(t){super(),this.identifier=t,this.shapes=new Map,this.coor={x:0,y:0},this.is_down=!0,this.is_to_be_kill=!1,this._kill_now=!1,this.lift_up_time=0,this.viewingLevel=1,this.shapes.set(1,this.getRandomShape(1.2)),this.shapes.set(2,this.getRandomShape(.8)),this.shapes.set(3,this.getRandomShape(1.6))}getRandomShape(t){return new((0,i.getRandomItem)(s))({rotation:0,velocity:{x:0,y:0,rot:(0,i.flipper)(400)*(0,i.random)()},color:(0,i.getRandomItem)(r.randomColors),is_solid:Math.random()>.5,thick:5,style:Math.random()>.5?"stroke":"fill",position:this.coor,scale:t})}get kill_now(){return this._kill_now}get to_be_kill(){return this.is_to_be_kill}get id(){return this.identifier}move({x:t,y:e}){this.coor={x:t,y:e}}up(){this.is_down&&(this.is_down=!1,this.is_to_be_kill=!0)}down({x:t,y:e}){this.coor={x:t,y:e}}init(){for(const t of this.shapes.values())t.init()}update(t){this.is_to_be_kill&&(this.is_down||0!==this.lift_up_time||(this.lift_up_time=t,this.viewingLevel=2),.5*l.kill_interval+this.lift_up_time<=t&&(this.viewingLevel=3),this.lift_up_time+l.kill_interval<=t&&(this._kill_now=!0));const e=this.shapes.get(this.viewingLevel);e.config.position=this.coor,e.update()}display(t){try{this.shapes.get(this.viewingLevel).display(t)}catch(t){console.error("Shape doesn't exists")}}}e.default=l,l.kill_interval=100},544:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.flipNum=void 0,e.flipNum=t=>0===t?t:t>0?-t:Math.abs(t)},643:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.flipper=void 0,e.flipper=t=>Math.floor(2*Math.random()*t-t)},355:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getRandomInRange=void 0,e.getRandomInRange=(t,e)=>Math.floor(Math.random()*(e-t))+t},949:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getRandomItem=void 0,e.getRandomItem=t=>t[Math.floor(Math.random()*t.length)]},928:(t,e,n)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=n(655);o.__exportStar(n(355),e),o.__exportStar(n(643),e),o.__exportStar(n(949),e),o.__exportStar(n(544),e),o.__exportStar(n(451),e)},451:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.random=void 0,e.random=()=>Math.random()/1e3},655:(t,e,n)=>{"use strict";n.r(e),n.d(e,{__assign:()=>r,__asyncDelegator:()=>g,__asyncGenerator:()=>b,__asyncValues:()=>x,__await:()=>w,__awaiter:()=>u,__classPrivateFieldGet:()=>P,__classPrivateFieldIn:()=>T,__classPrivateFieldSet:()=>M,__createBinding:()=>h,__decorate:()=>s,__exportStar:()=>d,__extends:()=>i,__generator:()=>f,__importDefault:()=>S,__importStar:()=>D,__makeTemplateObject:()=>O,__metadata:()=>c,__param:()=>l,__read:()=>y,__rest:()=>a,__spread:()=>_,__spreadArray:()=>v,__spreadArrays:()=>m,__values:()=>p});var o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},o(t,e)};function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var r=function(){return r=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},r.apply(this,arguments)};function a(t,e){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(n[o]=t[o]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(o=Object.getOwnPropertySymbols(t);i<o.length;i++)e.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(t,o[i])&&(n[o[i]]=t[o[i]])}return n}function s(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a}function l(t,e){return function(n,o){e(n,o,t)}}function c(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}function u(t,e,n,o){return new(n||(n=Promise))((function(i,r){function a(t){try{l(o.next(t))}catch(t){r(t)}}function s(t){try{l(o.throw(t))}catch(t){r(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,s)}l((o=o.apply(t,e||[])).next())}))}function f(t,e){var n,o,i,r,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function s(s){return function(l){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;r&&(r=0,s[0]&&(a=0)),a;)try{if(n=1,o&&(i=2&s[0]?o.return:s[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,s[1])).done)return i;switch(o=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,o=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=e.call(t,a)}catch(t){s=[6,t],o=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}}var h=Object.create?function(t,e,n,o){void 0===o&&(o=n);var i=Object.getOwnPropertyDescriptor(e,n);i&&!("get"in i?!e.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(t,o,i)}:function(t,e,n,o){void 0===o&&(o=n),t[o]=e[n]};function d(t,e){for(var n in t)"default"===n||Object.prototype.hasOwnProperty.call(e,n)||h(e,t,n)}function p(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],o=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&o>=t.length&&(t=void 0),{value:t&&t[o++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function y(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var o,i,r=n.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(o=r.next()).done;)a.push(o.value)}catch(t){i={error:t}}finally{try{o&&!o.done&&(n=r.return)&&n.call(r)}finally{if(i)throw i.error}}return a}function _(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(y(arguments[e]));return t}function m(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var o=Array(t),i=0;for(e=0;e<n;e++)for(var r=arguments[e],a=0,s=r.length;a<s;a++,i++)o[i]=r[a];return o}function v(t,e,n){if(n||2===arguments.length)for(var o,i=0,r=e.length;i<r;i++)!o&&i in e||(o||(o=Array.prototype.slice.call(e,0,i)),o[i]=e[i]);return t.concat(o||Array.prototype.slice.call(e))}function w(t){return this instanceof w?(this.v=t,this):new w(t)}function b(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o,i=n.apply(t,e||[]),r=[];return o={},a("next"),a("throw"),a("return"),o[Symbol.asyncIterator]=function(){return this},o;function a(t){i[t]&&(o[t]=function(e){return new Promise((function(n,o){r.push([t,e,n,o])>1||s(t,e)}))})}function s(t,e){try{(n=i[t](e)).value instanceof w?Promise.resolve(n.value.v).then(l,c):u(r[0][2],n)}catch(t){u(r[0][3],t)}var n}function l(t){s("next",t)}function c(t){s("throw",t)}function u(t,e){t(e),r.shift(),r.length&&s(r[0][0],r[0][1])}}function g(t){var e,n;return e={},o("next"),o("throw",(function(t){throw t})),o("return"),e[Symbol.iterator]=function(){return this},e;function o(o,i){e[o]=t[o]?function(e){return(n=!n)?{value:w(t[o](e)),done:"return"===o}:i?i(e):e}:i}}function x(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,n=t[Symbol.asyncIterator];return n?n.call(t):(t=p(t),e={},o("next"),o("throw"),o("return"),e[Symbol.asyncIterator]=function(){return this},e);function o(n){e[n]=t[n]&&function(e){return new Promise((function(o,i){!function(t,e,n,o){Promise.resolve(o).then((function(e){t({value:e,done:n})}),e)}(o,i,(e=t[n](e)).done,e.value)}))}}}function O(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t}var j=Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e};function D(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&h(e,t,n);return j(e,t),e}function S(t){return t&&t.__esModule?t:{default:t}}function P(t,e,n,o){if("a"===n&&!o)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?o:"a"===n?o.call(t):o?o.value:e.get(t)}function M(t,e,n,o,i){if("m"===o)throw new TypeError("Private method is not writable");if("a"===o&&!i)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===o?i.call(t,n):i?i.value=n:e.set(t,n),n}function T(t,e){if(null===e||"object"!=typeof e&&"function"!=typeof e)throw new TypeError("Cannot use 'in' operator on non-object");return"function"==typeof t?e===t:t.has(e)}}},e={};function n(o){var i=e[o];if(void 0!==i)return i.exports;var r=e[o]={exports:{}};return t[o].call(r.exports,r,r.exports,n),r.exports}n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{"use strict";const t=n(655);n(261),n(103);const e=t.__importStar(n(960)),o=t.__importDefault(n(519)),i=n(928),r=t.__importDefault(n(244)),a=t.__importDefault(n(701)),s=n(601),l=document.querySelector("#canvas"),c=document.querySelector("#overlayed-canvas"),u=new r.default(c),f=new o.default(l),h=Object.values(e);f.start();const d=Math.abs(Math.floor(Math.sqrt(l.width*l.height)/39));function p(){c.width=l.width,c.height=l.height,u.resize()}p();let y=0,_=window.setInterval((()=>{!function(){y++;const t=new((0,i.getRandomItem)(h))({rotation:0,velocity:{x:(0,i.flipper)(l.width*(0,i.random)()),y:(0,i.flipper)(l.height*(0,i.random)()),rot:(0,i.flipper)(100)*(0,i.random)()},color:(0,i.getRandomItem)(s.randomColors),scale:400*(0,i.random)()+1,is_solid:Math.random()>.5,thick:5,style:Math.random()>.5?"stroke":"fill",position:{x:(0,i.getRandomInRange)(0,l.width),y:(0,i.getRandomInRange)(0,l.height)}});f.insertLayer(String(y),t),f.initializeLayers()}(),y>=d&&window.clearInterval(_)}),10);console.log(`Viewing ${d} moving items.`);const m=c.getContext("2d"),v=[],w=[];c.addEventListener("touchstart",(function(t){t.preventDefault();for(const{identifier:e,clientX:n,clientY:o}of Array.from(t.touches)){if(-1!==w.indexOf(e))continue;const t=new a.default(e);t.down({x:u.x(n),y:u.y(o)}),t.init(),v.push(t),w.push(e)}})),c.addEventListener("touchmove",(function(t){t.preventDefault();for(const{identifier:e,clientX:n,clientY:o}of Array.from(t.touches))for(const t of v)t.to_be_kill||e===t.id&&t.move({x:u.x(n),y:u.y(o)})})),c.addEventListener("touchend",(function(t){t.preventDefault();const e=Array.from(t.touches).map((t=>t.identifier));for(const t of v)t.to_be_kill||-1===e.indexOf(t.id)&&t.up();for(const t in w)-1===e.indexOf(w[t])&&w.splice(Number(t),1)})),f.afterLayersAnimation((t=>{m.clearRect(0,0,l.width,l.height),m.imageSmoothingEnabled=!1;const e=performance.now();for(const t in v){const n=v[t];n.kill_now?v.splice(Number(t),1):(n.update(e),n.display(m))}})),window.addEventListener("resize",p)})()})();