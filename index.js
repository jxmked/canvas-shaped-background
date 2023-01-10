(()=>{"use strict";var t={771:(t,e,n)=>{n.d(e,{Z:()=>a});var o=n(81),i=n.n(o),r=n(645),s=n.n(r)()(i());s.push([t.id,'\nbody {\n    margin: 0;\n    padding: 0 !important; \n}\n\n#canvas {\n    padding: 0;\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    z-index: -10;\n}\n#canvas-container,\n#overlayed-canvas {\n    width: 100vw;\n    height: 100vh;\n    padding: 0;\n    margin: 0;\n    position: fixed;\n    z-index: -10;\n\n}\n#up {\n    grid-area: bu;\n}\n\n#down {\n    grid-area: bd;\n}\n\n#left {\n    grid-area: bl;\n}\n\n#right {\n    grid-area: br;\n}\n#up-left {\n    grid-area: bul;\n}\n#up-right {\n    grid-area: bur;\n}\n#down-left {\n    grid-area: bdl;\n}\n#down-right {\n    grid-area: bdr;\n}\n\n#buttons {\n    position: absolute;\n    bottom: 100px;\n    left: 50%;\n    transform: translateX(-50%);\n    width: 70%;\n    height: 100px;\n\n    display: grid;\n\n    grid-template-columns: repeat(3, 1fr);\n    grid-auto-rows: minmax(50px, auto);\n    grid-template-areas:\n    "bul bu bur"\n    "bl . br"\n    "bdl bd bdr";\n    gap: 5px;\n    display: none;\n}\n#backdrop {\n    z-index: 5555;\n    background-color: rgba(44,44,46,0.6);\n    backdrop-filter: blur(8px);\n    width: 100vw;\n    height: 100vh;\n    position: fixed;\n}\n',""]);const a=s},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",o=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),o&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),o&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,o,i,r){"string"==typeof t&&(t=[[null,t,void 0]]);var s={};if(o)for(var a=0;a<this.length;a++){var c=this[a][0];null!=c&&(s[c]=!0)}for(var l=0;l<t.length;l++){var h=[].concat(t[l]);o&&s[h[0]]||(void 0!==r&&(void 0===h[5]||(h[1]="@layer".concat(h[5].length>0?" ".concat(h[5]):""," {").concat(h[1],"}")),h[5]=r),n&&(h[2]?(h[1]="@media ".concat(h[2]," {").concat(h[1],"}"),h[2]=n):h[2]=n),i&&(h[4]?(h[1]="@supports (".concat(h[4],") {").concat(h[1],"}"),h[4]=i):h[4]="".concat(i)),e.push(h))}},e}},81:t=>{t.exports=function(t){return t[1]}},379:t=>{var e=[];function n(t){for(var n=-1,o=0;o<e.length;o++)if(e[o].identifier===t){n=o;break}return n}function o(t,o){for(var r={},s=[],a=0;a<t.length;a++){var c=t[a],l=o.base?c[0]+o.base:c[0],h=r[l]||0,u="".concat(l," ").concat(h);r[l]=h+1;var p=n(u),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)e[p].references++,e[p].updater(f);else{var y=i(f,o);o.byIndex=a,e.splice(a,0,{identifier:u,updater:y,references:1})}s.push(u)}return s}function i(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,i){var r=o(t=t||[],i=i||{});return function(t){t=t||[];for(var s=0;s<r.length;s++){var a=n(r[s]);e[a].references--}for(var c=o(t,i),l=0;l<r.length;l++){var h=n(r[l]);0===e[h].references&&(e[h].updater(),e.splice(h,1))}r=c}}},569:t=>{var e={};t.exports=function(t,n){var o=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var o="";n.supports&&(o+="@supports (".concat(n.supports,") {")),n.media&&(o+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(o+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),o+=n.css,i&&(o+="}"),n.media&&(o+="}"),n.supports&&(o+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(o,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(o){var i=e[o];if(void 0!==i)return i.exports;var r=e[o]={id:o,exports:{}};return t[o](r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.nc=void 0,(()=>{var t={};n.r(t),n.d(t,{Circle:()=>O,Cross:()=>A,Octagon:()=>_,Square:()=>m,Triangle:()=>b});var e=n(379),o=n.n(e),i=n(795),r=n.n(i),s=n(569),a=n.n(s),c=n(565),l=n.n(c),h=n(216),u=n.n(h),p=n(589),f=n.n(p),y=n(771),d={};d.styleTagTransform=f(),d.setAttributes=l(),d.insert=a().bind(null,"head"),d.domAPI=r(),d.insertStyleElement=u(),o()(y.Z,d),y.Z&&y.Z.locals&&y.Z.locals;const g=function(){function t(e,n){var o=n.size,i=n.color,r=n.angle,s=n.thick,a=n.style,c=n.position,l=n.rotationSpeed,h=n.isClockwise,u=n.isOverride,p=n.velocity,f=n.data;if(++t.countShape,r>360&&r<0)throw new Error("Invalid angle");this.size=o,this.color=i,this.angle=r,this.thick=s,this.style=a,this.position=c,this.context=e,this.rotationSpeed=l,this.isClockwise=h,this.isOverride=void 0!==u&&u,this.velocity=p,this.data=f}return t.prototype.applyStyle=function(){"stroke"===this.style?(this.context.strokeStyle=this.color,this.context.lineWidth=this.thick,this.context.stroke()):"fill"===this.style&&(this.context.fillStyle=this.color,this.context.fill())},t.prototype.getAnglePoint=function(t,e){var n=this.position,o=n.x,i=n.y,r=e*(Math.PI/180);return{x:o+t*Math.cos(r),y:i+t*Math.sin(r)}},t.prototype.move=function(t){var e=t.x,n=t.y;this.position.x+=e,this.position.y+=n},t.prototype.translate=function(t){var e=t.x,n=t.y;this.position={x:e,y:n}},t.prototype.rotate=function(t){this.angle=t},t.countShape=0,t}();var v,x=(v=function(t,e){return v=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},v(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}v(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});const b=function(t){function e(e,n){return t.call(this,e,n)||this}return x(e,t),Object.defineProperty(e.prototype,"type",{get:function(){return"triangle"},enumerable:!1,configurable:!0}),e.prototype.draw=function(t){var e=this.getAnglePoint(this.size,0+this.angle),n=this.getAnglePoint(this.size,120+this.angle),o=this.getAnglePoint(this.size,240+this.angle);this.context.beginPath(),this.context.moveTo(e.x,e.y),this.context.lineTo(n.x,n.y),this.context.lineTo(o.x,o.y),(t||function(){})(this.context),this.context.closePath(),this.applyStyle()},e}(g);var w=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();const m=function(t){function e(e,n){return t.call(this,e,n)||this}return w(e,t),Object.defineProperty(e.prototype,"type",{get:function(){return"square"},enumerable:!1,configurable:!0}),e.prototype.draw=function(t){var e=this.getAnglePoint(this.size,0+this.angle),n=this.getAnglePoint(this.size,90+this.angle),o=this.getAnglePoint(this.size,180+this.angle),i=this.getAnglePoint(this.size,270+this.angle);this.context.beginPath(),this.context.moveTo(e.x,e.y),this.context.lineTo(n.x,n.y),this.context.lineTo(o.x,o.y),this.context.lineTo(i.x,i.y),(t||function(){})(this.context),this.context.closePath(),this.applyStyle()},e}(g);var P=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();const O=function(t){function e(e,n){return t.call(this,e,n)||this}return P(e,t),Object.defineProperty(e.prototype,"type",{get:function(){return"circle"},enumerable:!1,configurable:!0}),e.prototype.draw=function(t){var e=this.position,n=e.x,o=e.y;this.context.beginPath(),this.context.arc(n,o,this.size,0,2*Math.PI),(t||function(){})(this.context),this.context.closePath(),this.applyStyle()},e}(g);var T=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();const _=function(t){function e(e,n){return t.call(this,e,n)||this}return T(e,t),Object.defineProperty(e.prototype,"type",{get:function(){return"octagon"},enumerable:!1,configurable:!0}),e.prototype.draw=function(t){var e=this.getAnglePoint(this.size,0+this.angle),n=this.getAnglePoint(this.size,45+this.angle),o=this.getAnglePoint(this.size,90+this.angle),i=this.getAnglePoint(this.size,135+this.angle),r=this.getAnglePoint(this.size,180+this.angle),s=this.getAnglePoint(this.size,225+this.angle),a=this.getAnglePoint(this.size,270+this.angle),c=this.getAnglePoint(this.size,315+this.angle);this.context.beginPath(),this.context.moveTo(e.x,e.y),this.context.lineTo(n.x,n.y),this.context.lineTo(o.x,o.y),this.context.lineTo(i.x,i.y),this.context.lineTo(r.x,r.y),this.context.lineTo(s.x,s.y),this.context.lineTo(a.x,a.y),this.context.lineTo(c.x,c.y),(t||function(){})(this.context),this.context.closePath(),this.applyStyle()},e}(g);var S=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();const A=function(t){function e(e,n){var o=t.call(this,e,n)||this;return o.style="stroke",o}return S(e,t),Object.defineProperty(e.prototype,"type",{get:function(){return"cross"},enumerable:!1,configurable:!0}),e.prototype.draw=function(t){var e=this.getAnglePoint(this.size,45+this.angle),n=this.getAnglePoint(this.size,135+this.angle),o=this.getAnglePoint(this.size,225+this.angle),i=this.getAnglePoint(this.size,315+this.angle);this.context.beginPath(),this.context.moveTo(this.position.x,this.position.y),this.context.lineTo(e.x,e.y),this.context.moveTo(this.position.x,this.position.y),this.context.lineTo(n.x,n.y),this.context.moveTo(this.position.x,this.position.y),this.context.lineTo(o.x,o.y),this.context.moveTo(this.position.x,this.position.y),this.context.lineTo(i.x,i.y),this.context.moveTo(this.position.x,this.position.y),(t||function(){})(this.context),this.context.closePath(),this.applyStyle()},e}(g);var z,j,C=function(){return C=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},C.apply(this,arguments)},E=document.getElementById("canvas"),M=document.getElementById("overlayed-canvas"),k=E.getContext("2d"),I=M.getContext("2d"),L=[],X=["rgb(74, 176, 152, 1)","rgb(234, 94, 93, 1)","rgb(248, 186, 63, 1)","rgb(63, 130, 243, 1)"],R=[60,100],Y=[1,7],q=[20,50],D=["stroke","fill"],Z=[-5,5],F=Object.values(t),N=function(t){return Math.floor(2*Math.random()*t-t)},B=function(t,e){return Math.floor(Math.random()*(e-t))+t},H=function(t){return t[Math.floor(Math.random()*t.length)]},U=function(t,e){var n=t.x,o=t.y,i={size:B(R[0],R[1]),color:H(X),angle:7,thick:B(q[0],q[1]),style:H(D),position:{x:n,y:o},rotationSpeed:B(Y[0],Y[1]),velocity:{x:B(Z[0],Z[1]),y:B(Z[0],Z[1])},isClockwise:H([!0,!1])};if(e)return i;var r=H(F);L.push(new r(k,i))},W=!1,J=0;window.addEventListener("resize",(function(){E.width=2*window.innerWidth,E.height=2*window.innerHeight,z=E.width,j=E.height,M.width=z,M.height=j,W=!0})),window.dispatchEvent(new Event("resize")),window.requestAnimationFrame((function t(){k.clearRect(0,0,E.width,E.height),I.clearRect(0,0,z,j),k.fillStyle="rgb(26, 43, 51, 1.0)",k.fillRect(0,0,E.width,E.height),L.forEach((function(t){var e=t.position,n=e.x,o=e.y,i=Math.abs(t.angle),r=t.velocity.x,s=t.velocity.y;(i+=t.rotationSpeed)<0?t.angle=360-i:i>360&&(t.angle=i-360),n<=0?(r=Math.abs(r)+N(2),n=0,t.isClockwise=H([!0,!1])):n>=z&&(r=-(Math.abs(r)+N(2)),n=z,t.isClockwise=H([!0,!1])),o<=0?(o=0,s=Math.abs(s)+N(2),t.isClockwise=H([!0,!1])):o>=j&&(o=j,s=-(Math.abs(s)+N(2)),t.isClockwise=H([!0,!1])),t.isOverride||t.move({x:r,y:s}),t.velocity.x=r,t.velocity.y=s,t.rotate(t.isClockwise?-i:i),t.draw()})),window.requestAnimationFrame(t)}));var G=window.setInterval((function(){W&&(10<=++J&&clearInterval(G),U({x:B(20,E.width-20),y:E.height}))}),0),K={x:0,y:0,isDown:!1,shapeIndex:-1},Q=document.body,V=function(t){var e=t.x,n=t.y,o=E.getBoundingClientRect(),i=o.left,r=o.top,s=o.width,a=o.height,c=(e-i)/s*E.width,l=(n-r)/a*E.height;K.x=c,K.y=l,K.isDown&&L[K.shapeIndex].translate({x:c,y:l})},$=function(t){var e=t.x,n=t.y;V({x:e,y:n}),K.isDown=!0,K.shapeIndex=L.length;var o=H(F),i=C(C({},U({x:K.x,y:K.y},!0)),{isOverride:!0});i.size=50,i.rotationSpeed=8,i.thick=40,i.style="fill",L[K.shapeIndex]=new o(I,i);var r=L[K.shapeIndex].color;r=r.replace("0.5","1.0"),L[K.shapeIndex].color=r},tt=function(t){var e=t.x,n=t.y;K.isDown=!1,V({x:e,y:n});try{L[K.shapeIndex].size=20}catch(t){}setTimeout((function(){try{L[K.shapeIndex].size=80}catch(t){}setTimeout((function(){L.forEach((function(t,e){t.isOverride&&L.splice(e,1)}))}),30)}),50)};Q.addEventListener("mousemove",(function(t){return V({x:t.pageX,y:t.pageY})})),Q.addEventListener("mousedown",(function(t){return $({x:t.pageX,y:t.pageY})})),Q.addEventListener("mouseup",(function(t){return tt({x:t.pageX,y:t.pageY})})),Q.addEventListener("touchmove",(function(t){var e=t.targetTouches[0],n=e.pageX,o=e.pageY;V({x:n,y:o})})),Q.addEventListener("touchend",(function(t){var e=t.changedTouches[0],n=e.pageX,o=e.pageY;tt({x:n,y:o})})),Q.addEventListener("touchstart",(function(t){var e=t.changedTouches[0],n=e.pageX,o=e.pageY;$({x:n,y:o})}))})()})();