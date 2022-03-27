<template>
    <a
        :href="href"
        rel="noopener noreferrer"
        class="social-link"
        @focus="showHoverText"
        @blur="hideHoverText"
        @pointerenter="showHoverText"
        @pointerleave="hideHoverText"
    >
        <div class="social-link__wrapper" aria-hidden="true">
            <span class="social-link__line serif">
                <span
                    v-for="(char, key) in linkText"
                    :key="key"
                    ref="hoverChars"
                    >{{ char }}</span
                >
            </span>
            <span class="social-link__line">
                <span
                    v-for="(char, key) in linkText"
                    :key="key"
                    ref="idleChars"
                    >{{ char }}</span
                >
            </span>
        </div>
        <span class="sr-only">{{ linkText }}</span>
    </a>
</template>

<script>
export default {
    props: {
        href: {
            type: String,
            required: true,
            default: 'https://example.com',
            validator: (string) => {
                return (
                    string.startsWith('http://') ||
                    string.startsWith('https://') ||
                    string.startsWith('mailto:')
                );
            }
        }
    },
    data: () => ({ prefersReducedMotion: false }),
    computed: {
        linkText() {
            return this.$slots.default[0].text.trim();
        }
    },
    mounted() {
        this.prefersReducedMotion = this.$prefersReducedMotion();
    },
    methods: {
        timelineFactory(props) {
            return this.$gsap.timeline({
                defaults: { stagger: 0.05, duration: 0.2 },
                ...props
            });
        },
        showHoverText() {
            if (this.prefersReducedMotion) return;
            if (this.prevTl) this.prevTl.kill();

            const tl = this.timelineFactory();

            tl.to(this.$refs.idleChars, { yPercent: -100 });
            tl.to(this.$refs.hoverChars, { yPercent: -100 }, '<');

            this.prevTl = tl;
        },
        hideHoverText() {
            if (this.prefersReducedMotion) return;
            if (this.prevTl) this.prevTl.kill();

            const tl = this.timelineFactory();

            tl.to(this.$refs.idleChars, { yPercent: 0 });
            tl.to(this.$refs.hoverChars, { yPercent: 0 }, '<');

            this.prevTl = tl;
        }
    }
};
</script>

<style lang="scss">
.social-link {
    display: inline-block;
    cursor: pointer;
    margin: 0;

    &__wrapper {
        position: relative;
        overflow: hidden;
        line-height: 1;
    }

    &__line {
        letter-spacing: 0.25px;
        white-space: nowrap;
        cursor: pointer;
        padding: 0;
        margin: 0;

        &:nth-child(1) {
            font-size: calc(var(--step-0) - 0.125rem);
            transform: translateY(100%);

            @media (prefers-reduced-motion: reduce) {
                display: none;
            }
        }

        &:nth-child(2) {
            font-size: calc(var(--step--1) - 0.0125rem);
            position: absolute;
            right: 0;
            top: 0;

            @media screen and (max-width: 600px) {
                font-size: calc(var(--step--1) - 0.05rem);
                transform: translateX(50%);
                right: 50%;
            }

            @media (prefers-reduced-motion: reduce) {
                display: none;
            }
        }
    }

    @media (prefers-reduced-motion: reduce) {
        cursor: pointer !important;

        .sr-only {
            font-size: var(--step--1);
            position: static;
            height: auto;
            width: auto;

            &:is(:focus, :hover) {
                text-decoration: underline;
                color: #ffe6ed;
            }
        }
    }

    span {
        display: inline-block;
    }
}
</style>
