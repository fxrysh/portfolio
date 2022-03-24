<template>
    <canvas ref="canvas" class="canvas" aria-label="landing background" />
</template>

<script>
import * as THREE from 'three';

import fragmentShader from '~/shaders/fragment.glsl';
import vertexShader from '~/shaders/vertex.glsl';

const clock = new THREE.Clock();
const MAX_DPR = 2.3;

let prefersReducedMotion = false;
let isShaderRunning = false;
let hasRunOnce = false;
let renderer = null;
let aspect = 16 / 9;
let camera = null;
let object = null;
let scene = null;

export default {
    mounted() {
        const { canvas } = this.$refs;

        prefersReducedMotion = this.$prefersReducedMotion();
        aspect = window.innerWidth / window.innerHeight;

        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({
            powerPreference: 'high-performance',
            precision: 'highp',
            canvas
        });

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_DPR));
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.autoClearColor = new THREE.Color(3, 3, 3);
        renderer.failIfMajorPerformanceCaveat = true;

        camera = new THREE.PerspectiveCamera(70, aspect, 0.5, 2);
        camera.position.set(0, 0, 1);

        const size = 2;
        const geometry = new THREE.PlaneBufferGeometry(size * aspect, size);
        const material = new THREE.ShaderMaterial({
            fragmentShader,
            vertexShader,
            extensions: {
                derivatives: '#extension GL_OES_standard_derivatives : enable'
            },
            uniforms: {
                time: { value: 0.0 },
                randomSeed: { value: Math.random() },
                objectOpacity: { value: prefersReducedMotion ? 1.0 : 0.0 },
                noisePower: { value: 1.0 },
                pixelRatio: { value: window.devicePixelRatio },
                resolution: {
                    value: new THREE.Vector2(
                        window.innerWidth,
                        window.innerHeight
                    )
                }
            },
            depthTest: false
        });
        object = new THREE.Mesh(geometry, material);
        scene.add(object);

        camera.matrixAutoUpdate = false;
        object.matrixAutoUpdate = false;

        window.addEventListener('resize', this.resize);
        this.resize();

        this.$nuxt.$on('show-shader', () => {
            isShaderRunning = true;

            this.$gsap.to(object.material.uniforms.objectOpacity, {
                value: 1,
                duration: 1.75,
                delay: 0.125
            });
        });

        this.$gsap.ticker.add(this.render);
    },
    methods: {
        resize() {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            if (canvas.width !== width || canvas.height !== height) {
                renderer.setSize(width, height, false);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }

            camera.updateMatrix();
            object.updateMatrix();

            object.material.uniforms.resolution.value.set(
                window.innerWidth,
                window.innerHeight
            );
        },

        render() {
            if (
                this.$scrollY() - 20 > window.innerHeight ||
                !isShaderRunning ||
                (prefersReducedMotion && hasRunOnce)
            ) {
                return;
            }

            if (prefersReducedMotion) hasRunOnce = true;

            object.material.uniforms.time.value = clock.getElapsedTime();
            renderer.render(scene, camera);
        }
    }
};
</script>

<style></style>
