(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{291:function(i,n,_){i.exports={}},319:function(i,n,_){"use strict";var l=_(291),a=_.n(l)},451:function(i,n,_){"use strict";_.r(n);var l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("a",{staticClass:"social-link",attrs:{href:e.href,rel:"noopener noreferrer"},on:{focus:e.showHoverText,blur:e.hideHoverText,pointerenter:e.showHoverText,pointerleave:e.hideHoverText}},[s("div",{staticClass:"social-link__wrapper",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"social-link__line serif"},e._l(e.linkText,function(r,o){return s("span",{key:o,ref:"hoverChars",refInFor:!0},[e._v(e._s(r))])}),0),e._v(" "),s("span",{staticClass:"social-link__line"},e._l(e.linkText,function(r,o){return s("span",{key:o,ref:"idleChars",refInFor:!0},[e._v(e._s(r))])}),0)]),e._v(" "),s("span",{staticClass:"sr-only"},[e._v(e._s(e.linkText))])])},a=[],c=_(7),m=_(79),j=_(150),y=_(22),O=_(20),x=_(21),g=_(10),T=_(28),P=_(16),b=_(29);function d(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),s.push.apply(s,r)}return s}function u(e){for(var t=1;t<arguments.length;t++){var s=arguments[t]!=null?arguments[t]:{};t%2?d(Object(s),!0).forEach(function(r){Object(c.a)(e,r,s[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):d(Object(s)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(s,r))})}return e}var f={props:{href:{type:String,required:!0,default:"https://example.com",validator:function(t){return t.startsWith("http://")||t.startsWith("https://")||t.startsWith("mailto:")}}},data:function(){return{prefersReducedMotion:!1}},computed:{linkText:function(){return this.$slots.default[0].text.trim()}},mounted:function(){this.prefersReducedMotion=this.$prefersReducedMotion()},methods:{timelineFactory:function(t){return this.$gsap.timeline(u({defaults:{stagger:.05,duration:.2}},t))},showHoverText:function(){if(!this.prefersReducedMotion){this.prevTl&&this.prevTl.kill();var t=this.timelineFactory();t.to(this.$refs.idleChars,{yPercent:-100}),t.to(this.$refs.hoverChars,{yPercent:-100},"<"),this.prevTl=t}},hideHoverText:function(){if(!this.prefersReducedMotion){this.prevTl&&this.prevTl.kill();var t=this.timelineFactory();t.to(this.$refs.idleChars,{yPercent:0}),t.to(this.$refs.hoverChars,{yPercent:0},"<"),this.prevTl=t}}}},p=f,k=_(319),v=_(36),h=Object(v.a)(p,l,a,!1,null,null,null),C=n.default=h.exports}}]);
