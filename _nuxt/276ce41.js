(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{304:function(n,a,e){n.exports={}},420:function(n,a,e){"use strict";var i=e(304),f=e.n(i)},455:function(n,a,e){"use strict";e.r(a);var i=function(){var _=this,r=_.$createElement,o=_._self._c||r;return o("div",{ref:"loader",staticClass:"loader",staticStyle:{position:"fixed",top:"0",left:"0","z-index":"5",width:"100vw",height:"100vh","background-color":"#030303","pointer-events":"all"}},[o("p",{staticClass:"loader__word"},_._l(_.firstWord,function(d,t){return o("span",{key:t,ref:"loaderWord1Chars",refInFor:!0,staticClass:"loader__word__char"},[_._v(_._s(d))])}),0),_._v(" "),o("p",{staticClass:"loader__word"},[_._v("and Welcome.")]),_._v(" "),o("p",{staticClass:"loader__word loader__word--logo serif"},[_._v("FI")])])},f=[],g=e(50),w=e(33),p={data:function(){return{firstWord:"Hello"}},mounted:function(){var r=this;this.$disableScrollY();var o=.65,d=this.$refs,t=d.loader,h=d.loaderWord1Chars,c=Array.from(t.children),y=this.$gsap,s=y.timeline({delay:.6,paused:!1,defaults:{duration:.65,ease:"power1.out"}});s.set(c,{opacity:0,filter:"blur(10px)"});for(var l=0;l<c.length;l++){var u=c[l];l===0?(s.set(u,{opacity:1,filter:"blur(0px)"}),s.fromTo(h,{color:"#000"},{color:"#fff",ease:"power3.out",stagger:.05})):s.to(u,{opacity:1,filter:"blur(0px)"},"-=0.125"),s.to(u,{opacity:0,filter:"blur(5px)"},"+=".concat(o))}s.to(t,{opacity:0,onStart:function(){r.$enableScrollY()},onEnd:function(){r.$nuxt.$emit("show-shader"),r.$nuxt.$emit("show-layout")}}),s.set(t,{display:"none"})}},v=p,O=e(420),m=e(36),j=Object(m.a)(v,i,f,!1,null,null,null),b=a.default=j.exports}}]);
