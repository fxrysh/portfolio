(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{443:function(E,x,s){"use strict";s.r(x);var f=function(){var v=this,o=v.$createElement,i=v._self._c||o;return i("canvas",{ref:"canvas",staticClass:"canvas",attrs:{"aria-label":"landing background"}})},p=[],n=s(317),h=`#define GLSLIFY 1
uniform float objectOpacity;
uniform float randomSeed;
uniform float noisePower;
uniform float pixelRatio;
uniform float time;
uniform vec2 resolution;

varying vec3 vPosition;

vec4 permute(vec4 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}
vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;

    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

vec3 normalizeRGBColor(vec3 color) {
    return color / 255.0;
}

mat2 getRotationMatrix(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

float rand(vec2 p) {
    vec2 k1 = vec2(23.14069263277926, 2.665144142690225);
    return fract(cos(dot(p, k1)) * 12345.6789);
}

float lines(vec2 uv, float offset) {
    return smoothstep(0.0, 0.5 + offset * 0.5, abs(0.55 * (sin(uv.x * 12.0) + offset * 2.0)));
}

void main(void) {
    float shaderZoom = 0.0;

    if(resolution.x > 700.0) {
        shaderZoom = 0.25;
    } else {
        shaderZoom = 0.45;
    }

    vec3 color1 = vec3(0.0, 0.0, 0.0);
    vec3 color2 = vec3(255.0, 230.0, 237.0);

    // LIGHT_GREEN
    // vec3 color3 = vec3(230.0, 255.0, 233.0);
    // GREEN
    vec3 color3 = vec3(125.0, 179.0, 132.0);
    // DARK_GREEN
    // vec3 color3 = vec3(89.0, 128.0, 94.0);
    // DARK_GREEN v2
    // vec3 color3 = vec3(51.0, 128.0, 61.0);
    // DESATURATED_GREEN
    // vec3 color3 = vec3(143.0, 204.0, 151.0);
    // BLACK
    // vec3 color3 = vec3(64.0, 57.0, 59.0);
    // PINK + BLACK
    // vec3 color3 = vec3(128.0, 115.0, 118.0);
    // LIGHT_BLUE + GRAY
    // vec3 color3 = vec3(152.0, 172.0, 179.0);

    color1 = normalizeRGBColor(color1);
    color2 = normalizeRGBColor(color2);
    color3 = normalizeRGBColor(color3);

    float noise = snoise(vPosition + time * 0.175 + randomSeed * 100.0) * (noisePower * 0.55);
    vec2 baseUv = getRotationMatrix(noise + -1.0) * vPosition.xy * shaderZoom;

    float firstPattern = lines(baseUv, 0.5);
    float secondPattern = lines(baseUv, 0.05);

    vec3 firstColor = mix(color3, color2, firstPattern);
    vec3 resColor = mix(firstColor, color1, secondPattern);

    float grainStrength = 0.075;
    if(pixelRatio > 2.0) {
        grainStrength = 0.135;
    }

    vec2 uvNoise = vPosition.xy;
    uvNoise.y *= rand(vec2(uvNoise.y, randomSeed));

    vec3 grain = vec3(rand(uvNoise) * grainStrength);
    resColor += grain;

    gl_FragColor = vec4(resColor, 1.0) * objectOpacity;
}
`,y=`#define GLSLIFY 1
varying vec3 vPosition;
varying vec2 vUv;

void main(void) {
    vUv = uv;
    vPosition = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,w=new n.a,g=2.3,c=!1,u=!1,m=!1,e=null,l=16/9,r=null,t=null,d=null,z={mounted:function(){var o=this,i=this.$refs.canvas;c=this.$prefersReducedMotion(),l=window.innerWidth/window.innerHeight,d=new n.f,e=new n.i({powerPreference:"high-performance",precision:"highp",canvas:i}),e.setPixelRatio(Math.min(window.devicePixelRatio,g)),e.outputEncoding=n.j,e.autoClearColor=new n.b(3,3,3),e.failIfMajorPerformanceCaveat=!0,r=new n.d(70,l,.5,2),r.position.set(0,0,1);var a=2,P=new n.e(a*l,a),b=new n.g({fragmentShader:h,vertexShader:y,extensions:{derivatives:"#extension GL_OES_standard_derivatives : enable"},uniforms:{time:{value:0},randomSeed:{value:Math.random()},objectOpacity:{value:c?1:0},noisePower:{value:1},pixelRatio:{value:window.devicePixelRatio},resolution:{value:new n.h(window.innerWidth,window.innerHeight)}},depthTest:!1});t=new n.c(P,b),d.add(t),r.matrixAutoUpdate=!1,t.matrixAutoUpdate=!1,window.addEventListener("resize",this.resize),this.resize(),this.$nuxt.$on("show-shader",function(){u=!0,o.$gsap.to(t.material.uniforms.objectOpacity,{value:1,duration:1.75,delay:.125})}),this.$gsap.ticker.add(this.render)},methods:{resize:function(){var o=e.domElement,i=o.clientWidth,a=o.clientHeight;(o.width!==i||o.height!==a)&&(e.setSize(i,a,!1),r.aspect=i/a,r.updateProjectionMatrix()),r.updateMatrix(),t.updateMatrix(),t.material.uniforms.resolution.value.set(window.innerWidth,window.innerHeight)},render:function(){this.$scrollY()-20>window.innerHeight||!u||c&&m||(c&&(m=!0),t.material.uniforms.time.value=w.getElapsedTime(),e.render(d,r))}}},R=z,_=s(36),C=Object(_.a)(R,f,p,!1,null,null,null),S=x.default=C.exports}}]);
