<template>
    <div class="scroll-down">
        <div class="sr-only">Scroll down to see more content</div>
        <div class="scroll-down__text" aria-hidden="true">
            {{ scrollText }}
        </div>
        <div
            v-for="key in 3"
            v-show="!prefersReducedMotion"
            :key="key"
            ref="scrollDownCircles"
            class="scroll-down__circle"
            aria-hidden="true"
        />
    </div>
</template>

<script>
export default {
    data: () => ({ prefersReducedMotion: false }),
    computed: {
        scrollText() {
            if (this.prefersReducedMotion) return 'Scroll Down';
            else return 'Scroll';
        }
    },
    mounted() {
        this.prefersReducedMotion = this.$prefersReducedMotion();
        if (this.prefersReducedMotion) return;

        const { scrollDownCircles } = this.$refs;
        const gsap = this.$gsap;

        const opacityRangeMapper = gsap.utils.mapRange(
            0,
            scrollDownCircles.length,
            0.8,
            0.3
        );

        const circlesTl = gsap.timeline({
            defaults: { duration: 1.75, ease: 'power2.inOut' },
            repeat: -1
        });

        circlesTl.fromTo(
            scrollDownCircles,
            { opacity: 0 },
            { opacity: (key) => opacityRangeMapper(key) }
        );

        circlesTl.fromTo(
            scrollDownCircles,
            { yPercent: 0 },
            { yPercent: -250, duration: 2.5, stagger: 0.15 },
            '<+0.5'
        );

        circlesTl.to(
            scrollDownCircles,
            { opacity: 0, duration: 0.75 },
            '-=0.45'
        );
    }
};
</script>

<style lang="scss">
.scroll-down {
    --base-font-size: calc(var(--step--1) - 0.075rem);

    position: relative;
    cursor: pointer;
    margin: 0;

    &__text {
        padding-inline-start: calc(var(--base-font-size) + 0.5rem);
        font-size: calc(var(--base-font-size) + 0.13rem);
        letter-spacing: 0.5px;
        font-weight: 200;

        @media (prefers-reduced-motion: reduce) {
            padding-inline-start: 0;
        }
    }

    &__circle {
        --size: var(--base-font-size);
        --min-size: 15px;

        box-shadow: 0 0 1px 1px rgba($color: #fff, $alpha: 1);
        min-height: var(--min-size);
        min-width: var(--min-size);
        background: transparent;
        height: var(--size);
        width: var(--size);
        position: absolute;
        border-radius: 50%;
        bottom: 10%;
        left: 0;
    }
}
</style>
