<template>
    <div ref="pointer" class="pointer">
        <ArrowLink
            ref="pointerArrow"
            aria-label="arrow for indicating link"
            class="pointer__arrow"
        />
    </div>
</template>

<script>
import ArrowLink from '~/images/arrow/link.svg?inline';

export default {
    components: { ArrowLink },
    data: () => ({ isPointerInWindow: true, isHovering: false }),
    watch: {
        isPointerInWindow(val) {
            if (val) this.$refs.pointer.classList.remove('pointer--hidden');
            else this.$refs.pointer.classList.add('pointer--hidden');
        },
        isHovering(val) {
            const duration = 0.3;
            const ease = 'back.out';

            const hoveringSize = 7;
            const idleSize = 1;

            if (val) {
                this.$gsap.to(this.$refs.pointer, {
                    scale: hoveringSize,
                    duration,
                    ease
                });
                this.$gsap.fromTo(
                    this.$refs.pointerArrow,
                    { scale: 0, rotate: 0 },
                    { scale: 1, rotate: -45, delay: 0.075, duration, ease }
                );
            } else {
                this.$gsap.to(this.$refs.pointer, {
                    scale: idleSize,
                    duration,
                    ease
                });
                this.$gsap.to(this.$refs.pointerArrow, {
                    scale: 0,
                    duration,
                    ease
                });
            }
        }
    },
    mounted() {
        const prefersReducedMotion = this.$prefersReducedMotion();

        if (
            'ontouchstart' in document.documentElement ||
            prefersReducedMotion
        ) {
            return;
        }

        const { pointer } = this.$refs;
        const gsap = this.$gsap;

        this.$nuxt.$on('show-layout', () => {
            gsap.to(pointer, {
                delay: 1,
                autoAlpha: 1,
                onEnd: () => {
                    // prettier-ignore
                    document.addEventListener('pointermove', this.pointermoveHandler, false)
                    // prettier-ignore
                    document.addEventListener('pointerover', this.pointeroverHandler, false)
                    document.addEventListener(
                        'pointerout',
                        this.pointeroutHandler,
                        false
                    );
                }
            });
        });

        this.$nuxt.$on('toggle-hovering', (val) => {
            if (typeof val === 'boolean') this.isHovering = val;
            else this.isHovering = !this.isHovering;
        });
    },
    methods: {
        pointeroutHandler(ev) {
            if (!ev.toElement && !ev.relatedTarget)
                this.isPointerInWindow = false;
        },
        pointeroverHandler() {
            if (this.isPointerInWindow) return;

            this.isPointerInWindow = true;
        },
        pointermoveHandler({ clientX, clientY }) {
            const pointerSize = this.$gsap.getProperty(
                this.$refs.pointer,
                'width'
            );

            const x = clientX - window.innerWidth / 2 - pointerSize / 2;
            const y = clientY - window.innerHeight / 2 - pointerSize / 2;

            this.$gsap.to(this.$refs.pointer, {
                x,
                y,
                opacity: this.isPointerInWindow ? 1 : 0,
                duration: 0.4,
                ease: 'power2.out(1.5)'
            });
        }
    }
};
</script>

<style lang="scss">
.pointer {
    transform-origin: center center;
    background-color: #ffe6ed;
    transition: opacity 300ms;
    mix-blend-mode: exclusion;
    justify-content: center;
    pointer-events: none;
    align-items: center;
    border-radius: 50%;
    visibility: hidden;
    position: fixed;
    display: flex;
    height: 12px;
    z-index: 100;
    width: 12px;
    opacity: 0;
    left: 50%;
    top: 50%;

    &__arrow {
        transform-origin: center center;
        transform: scale(0);
        width: 22.5%;
        height: auto;
    }

    &--hidden {
        opacity: 0 !important;
    }
}
</style>
