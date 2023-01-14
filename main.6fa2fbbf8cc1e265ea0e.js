(()=>{"use strict";var t={d:(e,i)=>{for(var o in i)t.o(i,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:i[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{Circle:()=>d});const i=(t,e)=>Math.floor(Math.random()*(e-t))+t,o=t=>t[Math.floor(Math.random()*t.length)],n=function(){const t=window.MutationObserver||window.WebKitMutationObserver;return(e,i)=>{if(e&&1===e.nodeType){if(t){const o=new t(i);return o.observe(e,{childList:!0,subtree:!0}),o}e.addEventListener("DOMNodeInserted",i,!1),e.addEventListener("DOMNodeRemoved",i,!1)}}}(),s=t=>{const e=t<0?Math.abs(t):-Math.abs(t);return Math.min(e,3)},a=t=>{const{x:e,y:i}=t.velocity;t.velocity.x=Math.min(e,3),t.velocity.y=Math.min(i,3)};window.dataLayer=window.dataLayer||[];const c=t=>{const e=t.currentTarget||t.target;"A"!==(e.tagName||e.nodeName)&&"on-side"!==e.getAttribute("aria-label-navigate")||gtag("event","url_clicked",{addr:e.href,text:encodeURIComponent(e.innerText)})};!function(t){if(!window.location.protocol.toString().startsWith("https"))return;const e=document.createElement("script");e.setAttribute("src","https://www.googletagmanager.com/gtag/js?id="+t),e.async=!0,e.setAttribute("type","application/javascript"),document.getElementsByTagName("head")[0].appendChild(e),window.gtag=window.gtag||function(...t){window.dataLayer.push(...t)},gtag("js",new Date),gtag("config",t);const i=()=>{Array.prototype.forEach.call(document.getElementsByClassName("listen-on-click"),(t=>{(t=>{t.removeEventListener("click",c),t.addEventListener("click",c)})(t)}))};document.addEventListener("DOMContentLoaded",i),n(document.body,i)}("G-JPJZGW7PW6");class r{constructor(t,e){const{size:i,color:o,angle:n,thick:s,style:a,position:c,rotationSpeed:h,isClockwise:d,isOverride:l,velocity:y,data:g,mass:p,id:x}=e;if(++r.countShape,n>360&&n<0)throw new Error("Invalid angle");this.size=i,this.color=o,this.angle=n,this.thick=s,this.style=a,this.position=c,this.context=t,this.rotationSpeed=h,this.isClockwise=d,this.isOverride=void 0!==l&&l,this.velocity=y,this.data=void 0===g?{}:g,this.mass=s/i*Math.PI,this.id=void 0===x?r.countShape:x}applyStyle(){if("fill"===this.style)return this.context.fillStyle=this.color,void this.context.fill();this.context.strokeStyle=this.color,this.context.lineWidth=this.thick,this.context.stroke()}getAnglePoint(t,e){const{x:i,y:o}=this.position,n=e*(Math.PI/180);return{x:i+t*Math.cos(n),y:o+t*Math.sin(n)}}polygonShape(t){const e=360/t,i=this.getAnglePoint(this.size,0+this.angle);this.context.beginPath(),this.context.moveTo(i.x,i.y);for(let t=e;t<=360-e;t+=e){const e=this.getAnglePoint(this.size,t+this.angle);this.context.lineTo(e.x,e.y)}this.context.closePath()}move({x:t,y:e}){this.position.x+=t,this.position.y+=e}translate({x:t,y:e}){this.position={x:t,y:e}}rotate(t){this.angle=t}}r.countShape=0;const h=class extends r{},d=class extends h{get type(){return"circle"}draw(){const{x:t,y:e}=this.position;this.context.beginPath(),this.context.arc(t,e,this.size,0,2*Math.PI),this.context.closePath(),this.applyStyle()}};function l(t,e){return{x:t.x*Math.cos(e)-t.y*Math.sin(e),y:t.x*Math.sin(e)+t.y*Math.cos(e)}}class y{}y.width=0,y.height=0;const g=(t,e)=>{const{x:i,y:o}=t.position,n="stroke"===t.style,a=t.size+(n?.5*t.thick:0);i<=a&&(t.velocity.x=s(t.velocity.x),t.position.x=a+1,e&&e(t.position)),i>=y.width-a&&(t.velocity.x=s(t.velocity.x),t.position.x=y.width-(a+1),e&&e(t.position)),o<=a&&(t.velocity.y=s(t.velocity.y),t.position.y=a+1,e&&e(t.position)),o>=y.height-a&&(t.velocity.y=s(t.velocity.y),t.position.y=y.height-(a+1),e&&e(t.position))};var p;p=window.location.href.toString(),window.dataLayer.push({event:"pageview",url:p});const x=document.body,v=document.getElementById("canvas"),w=document.getElementById("overlayed-canvas"),u=v.getContext("2d"),m=w.getContext("2d"),f=Object.values(e),b=[],M={count:0,colors:["rgb(74, 176, 152, 1)","rgb(234, 94, 93, 1)","rgb(248, 186, 63, 1)","rgb(63, 130, 243, 1)"],sizeRange:[60,100],rotationSpeedRange:[1,7],thickRange:[20,50],styles:["stroke","fill"],transitionSpeedYRange:[.3,1],transitionSpeedXRange:[.3,.4]},S=({x:t,y:e},n)=>{const s={size:i(M.sizeRange[0],M.sizeRange[1]),color:o(M.colors),angle:7,thick:i(M.thickRange[0],M.thickRange[1]),style:o(M.styles),position:{x:t,y:e},rotationSpeed:i(M.rotationSpeedRange[0],M.rotationSpeedRange[1]),velocity:{x:i(M.transitionSpeedXRange[0],M.transitionSpeedXRange[1]),y:i(M.transitionSpeedXRange[0],M.transitionSpeedXRange[1])},isClockwise:o([!0,!1]),mass:i(.2,1)};return n||b.push(new(o(f))(u,s)),s};let k=!1,E=0;window.addEventListener("resize",(()=>{const t=window.innerWidth,e=window.innerHeight;v.width=2*t,v.height=2*e,w.width=v.width,w.height=v.height,y.width=v.width,y.height=v.height,M.count=Math.floor(Math.abs(t*e)/18e3),k=!0})),window.dispatchEvent(new Event("resize")),window.requestAnimationFrame((function t(){m.clearRect(0,0,v.width,v.height),u.clearRect(0,0,v.width,v.height),u.fillStyle="rgb(26, 43, 51, 1.0)",u.fillRect(0,0,v.width,v.height),b.forEach((t=>{t.isOverride||(b.forEach((e=>{if(t.id===e.id)return;const i=.5*(("stroke"===t.style?t.thick:0)+("stroke"===e.style?e.thick:0)),o=t.size+e.size+i;if(((t,e)=>{const i=Math.abs(t.position.x-e.position.x),o=Math.abs(t.position.y-e.position.y);return Math.sqrt(Math.pow(i,2)+Math.pow(o,2))})(t,e)<=o){const i=e.velocity;!function(t,e){const i=t.velocity.x-e.velocity.x,o=t.velocity.y-e.velocity.y;if(i*(e.position.x-t.position.x)+o*(e.position.y-t.position.y)>=0){const n=-Math.atan2(o,i),s=t.mass,a=e.mass,c=l(t.velocity,n),r=l(e.velocity,n),h={x:c.x*(s-a)/(s+a)+2*r.x*a/(s+a),y:c.y},d={x:r.x*(s-a)/(s+a)+2*c.x*a/(s+a),y:r.y},y=l(h,-n),g=l(d,-n);t.velocity.x=y.x,t.velocity.y=y.y,e.velocity.x=g.x,e.velocity.y=g.y}}(t,e),g(e),a(e),e.isOverride&&(e.velocity=i)}})),a(t),g(t),t.move(t.velocity)),t.draw()})),window.requestAnimationFrame(t)}));const R=window.setInterval((()=>{k&&(E++,M.count<=E&&clearInterval(R),S({x:i(20,v.width-20),y:i(20,v.height-20)}))}),100),I={x:0,y:0,isDown:!1,shapeIndex:-1};let O=0;const L={x:0,y:0},P=({x:t,y:e})=>{const{left:i,top:o,width:n,height:s}=v.getBoundingClientRect(),a=(t-i)/n*v.width,c=(e-o)/s*v.height;if(I.x=a,I.y=c,I.isDown){const i=(new Date).getTime(),o=O-i;try{b[I.shapeIndex].mass=1,b[I.shapeIndex].velocity.x=(t-L.x)/o,b[I.shapeIndex].velocity.y=(e-L.y)/o}catch(t){return}b[I.shapeIndex].translate({x:a,y:c}),L.x=t,L.y=e,O=i}},z=({x:t,y:e})=>{P({x:t,y:e}),L.x=t,L.y=e,O=(new Date).getTime(),I.isDown=!0,I.shapeIndex=b.length;const i=o(f),n=Object.assign(Object.assign({},S({x:I.x,y:I.y},!0)),{isOverride:!0});n.size=50,n.rotationSpeed=8,n.thick=40,n.style="fill",b[I.shapeIndex]=new i(u,n);let s=b[I.shapeIndex].color;s=s.replace("0.5","1.0"),b[I.shapeIndex].color=s},T=({x:t,y:e})=>{I.isDown=!1,P({x:t,y:e}),setTimeout((()=>{setTimeout((()=>{b.forEach(((t,e)=>{t.isOverride&&b.splice(e,1)}))}),30)}),50)};x.addEventListener("mousemove",(t=>P({x:t.pageX,y:t.pageY}))),x.addEventListener("mousedown",(t=>z({x:t.pageX,y:t.pageY}))),x.addEventListener("mouseup",(t=>T({x:t.pageX,y:t.pageY}))),x.addEventListener("touchmove",(t=>{const{pageX:e,pageY:i}=t.targetTouches[0];P({x:e,y:i})})),x.addEventListener("touchend",(t=>{const{pageX:e,pageY:i}=t.changedTouches[0];T({x:e,y:i})})),x.addEventListener("touchstart",(t=>{const{pageX:e,pageY:i}=t.changedTouches[0];z({x:e,y:i})}))})();