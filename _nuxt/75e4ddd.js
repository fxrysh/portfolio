(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{301:function(i,l,s){var r=s(334);r.__esModule&&(r=r.default),typeof r=="string"&&(r=[[i.i,r,""]]),r.locals&&(i.exports=r.locals);var n=s(51).default,d=n("99d71c18",r,!1,{sourceMap:!1})},333:function(i,l,s){"use strict";var r=s(301),n=s.n(r)},334:function(i,l,s){var r=s(50),n=r(function(d){return d[1]});n.push([i.i,".social-link{display:inline-block;margin:0;cursor:pointer}.social-link__wrapper{position:relative;line-height:1;overflow:hidden}.social-link__line{letter-spacing:.25px;cursor:pointer;margin:0;padding:0;white-space:nowrap}.social-link__line:first-child{font-size:calc(var(--step-0) - .125rem);transform:translateY(100%)}@media(prefers-reduced-motion:reduce){.social-link__line:first-child{display:none}}.social-link__line:nth-child(2){position:absolute;top:0;right:0;font-size:calc(var(--step--1) - .0125rem)}@media screen and (max-width:600px){.social-link__line:nth-child(2){font-size:calc(var(--step--1) - .05rem);right:50%;transform:translateX(50%)}}@media(prefers-reduced-motion:reduce){.social-link__line:nth-child(2){display:none}}@media(prefers-reduced-motion:reduce){.social-link{cursor:pointer!important}.social-link .sr-only{position:static;width:auto;height:auto;font-size:var(--step--1)}.social-link .sr-only:is(:focus,:hover){color:#ffe6ed;text-decoration:underline}}.social-link span{display:inline-block}",""]),n.locals={},i.exports=n},476:function(i,l,s){"use strict";s.r(l);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("a",{staticClass:"social-link",attrs:{href:e.href,rel:"noopener noreferrer"},on:{focus:e.showHoverText,blur:e.hideHoverText,pointerenter:e.showHoverText,pointerleave:e.hideHoverText}},[o("div",{staticClass:"social-link__wrapper",attrs:{"aria-hidden":"true"}},[o("span",{staticClass:"social-link__line serif"},e._l(e.linkText,function(_,a){return o("span",{key:a,ref:"hoverChars",refInFor:!0},[e._v(e._s(_))])}),0),e._v(" "),o("span",{staticClass:"social-link__line"},e._l(e.linkText,function(_,a){return o("span",{key:a,ref:"idleChars",refInFor:!0},[e._v(e._s(_))])}),0)]),e._v(" "),o("span",{staticClass:"sr-only"},[e._v(e._s(e.linkText))])])},n=[],d=s(7),m=s(80),y=s(148),j=s(22),O=s(20),x=s(21),g=s(10),T=s(28),k=s(16),P=s(29);function c(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var _=Object.getOwnPropertySymbols(e);t&&(_=_.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),o.push.apply(o,_)}return o}function f(e){for(var t=1;t<arguments.length;t++){var o=arguments[t]!=null?arguments[t]:{};t%2?c(Object(o),!0).forEach(function(_){Object(d.a)(e,_,o[_])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):c(Object(o)).forEach(function(_){Object.defineProperty(e,_,Object.getOwnPropertyDescriptor(o,_))})}return e}var u={props:{href:{type:String,required:!0,default:"https://example.com",validator:function(t){return t.startsWith("http://")||t.startsWith("https://")||t.startsWith("mailto:")}}},data:function(){return{prefersReducedMotion:!1}},computed:{linkText:function(){return this.$slots.default[0].text.trim()}},mounted:function(){this.prefersReducedMotion=this.$prefersReducedMotion()},methods:{timelineFactory:function(t){return this.$gsap.timeline(f({defaults:{stagger:.05,duration:.2}},t))},showHoverText:function(){if(!this.prefersReducedMotion){this.prevTl&&this.prevTl.kill();var t=this.timelineFactory();t.to(this.$refs.idleChars,{yPercent:-100}),t.to(this.$refs.hoverChars,{yPercent:-100},"<"),this.prevTl=t}},hideHoverText:function(){if(!this.prefersReducedMotion){this.prevTl&&this.prevTl.kill();var t=this.timelineFactory();t.to(this.$refs.idleChars,{yPercent:0}),t.to(this.$refs.hoverChars,{yPercent:0},"<"),this.prevTl=t}}}},p=u,b=s(333),v=s(35),h=Object(v.a)(p,r,n,!1,null,null,null),C=l.default=h.exports}}]);
