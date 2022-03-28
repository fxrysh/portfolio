<template>
    <nav
        ref="nav"
        class="nav container"
        role="navigation"
        aria-label="main navigation"
        data-scroll-sticky
    >
        <button
            ref="navTitle"
            class="nav__title serif"
            tabindex="0"
            aria-label="to top"
            @click="$scrollTo(0), $nuxt.$emit('toggle-menu', false)"
        >
            <span aria-hidden="true">FI</span>
        </button>

        <div ref="navSections" class="nav__sections">
            <div
                ref="navSectionsCircle"
                :class="{
                    nav__sections__circle: true,
                    'nav__sections__circle--hidden': !isShowingCurrentSection
                }"
            />
            <ul
                ref="navSectionsList"
                class="nav__sections__list"
                :style="{ '--sections-length': sections.length }"
            >
                <li
                    v-for="(section, key) in sections"
                    :key="key"
                    ref="navSectionsListSections"
                    role="button"
                    tabindex="0"
                    :class="{
                        nav__sections__list__section: true,
                        'nav__sections__list__section--active':
                            key === currentSection,
                        'nav__sections__list__section--non-active':
                            key !== currentSection && isShowingCurrentSection
                    }"
                    @click="$scrollTo(section.scrollTo)"
                    @keypress.enter.space.prevent="$scrollTo(section.scrollTo)"
                >
                    {{ section.label }}
                </li>
            </ul>
        </div>

        <button
            ref="navMenuButton"
            tabindex="0"
            aria-label="menu button"
            class="nav__menu-button"
            @click="toggleMenu"
            @keypress.space.enter="toggleMenu"
            @pointerenter="hoverAnimation"
            @pointerleave="idleAnimation"
        >
            <MenuIconSVG ref="navMenuButtonSVG" aria-hidden="true" />
        </button>
    </nav>
</template>

<script>
import MenuIconSVG from '~/images/menu-icon.svg?inline';

const SVG_SIZE = 20;
const SVG_LINES_PADDING = 5;

export default {
    components: { MenuIconSVG },
    props: { currentSection: { type: Number, required: true, default: 0 } },
    data: () => ({
        prefersReducedMotion: false,
        isMenuActive: false,
        isShowingCurrentSection: false,
        sections: [
            { label: 'Home', scrollTo: 0 },
            { label: 'Work', scrollTo: '.works' },
            { label: 'About', scrollTo: '.about' },
            { label: 'Contact', scrollTo: '.contact' }
        ]
    }),
    watch: {
        currentSection(val) {
            if (this.prefersReducedMotion) return;

            const { navSections, navSectionsListSections, navSectionsCircle } =
                this.$refs;

            const sectionsHeight = navSections.clientHeight || 94;
            const oneHeight =
                1.5 + sectionsHeight / navSectionsListSections.length;

            this.$gsap.to(navSectionsCircle, {
                '--top-offset': val * oneHeight,
                ease: 'back.out',
                duration: 0.3
            });
        },
        isMenuActive(val) {
            if (val) this.closeAnimation();
            else this.idleAnimation();
        }
    },
    mounted() {
        this.prefersReducedMotion = this.$prefersReducedMotion();

        const { nav, navTitle } = this.$refs;
        const gsap = this.$gsap;
        const ScrollTrigger = this.$ScrollTrigger;

        gsap.fromTo(
            navTitle,
            { autoAlpha: 0 },
            {
                autoAlpha: 1,
                scrollTrigger: {
                    trigger: '.header',
                    start: `60% top+=60px`,
                    end: `bottom top+=60px`,
                    scrub: true
                }
            }
        );

        ScrollTrigger.create({
            trigger: 'header',
            start: 'top+=35% top+=80px',
            end: 'top+=35% top+=80px',
            onEnter: () => (this.isShowingCurrentSection = true),
            onLeaveBack: () => (this.isShowingCurrentSection = false)
        });

        let prevScrollPosition = 0;
        this.$locomotiveScroll.on('scroll', ({ scroll }) => {
            if (scroll.y < window.innerHeight - window.innerHeight / 2) {
                return gsap.to(nav, { autoAlpha: 1 });
            }

            const scrollingDown = scroll.y - prevScrollPosition > 0;
            prevScrollPosition = scroll.y;

            if (scrollingDown) {
                gsap.to(nav, { autoAlpha: 0 });
            } else {
                gsap.to(nav, { autoAlpha: 1, duration: 0.25 });
            }
        });

        this.$nuxt.$on('toggle-menu', (bool) => {
            if (typeof bool === 'boolean') this.isMenuActive = bool;
            else this.isMenuActive = !this.isMenuActive;
        });
    },
    methods: {
        toggleMenu() {
            this.$nuxt.$emit('toggle-menu');
        },
        closeAnimation() {
            const lines = this.$refs.navMenuButtonSVG.children;
            const tl = this.$gsap.timeline({ defaults: { ease: 'back.out' } });
            const { navMenuButton } = this.$refs;
            const line0Attrs = {
                x1: SVG_SIZE - SVG_LINES_PADDING,
                y1: SVG_LINES_PADDING,
                x2: SVG_LINES_PADDING,
                y2: SVG_SIZE - SVG_LINES_PADDING
            };

            const line1Attrs = {
                x1: SVG_LINES_PADDING,
                y1: SVG_LINES_PADDING,
                x2: SVG_SIZE - SVG_LINES_PADDING,
                y2: SVG_SIZE - SVG_LINES_PADDING
            };

            if (this.prefersReducedMotion) {
                tl.to(lines, { opacity: 0 });
                tl.set(lines[0], { attr: line0Attrs });
                tl.set(lines[1], { attr: line1Attrs });
                tl.set(lines, { color: '#030303' });
                tl.set(navMenuButton, { '--bg-scale': '1' }, 0);
                tl.to(lines, { opacity: 1 });
            } else {
                tl.to(lines, { color: '#030303' });
                tl.to(lines[0], { attr: line0Attrs }, 0);
                tl.to(lines[1], { attr: line1Attrs }, '<');
                tl.to(navMenuButton, { '--bg-scale': '1' }, '0.135');
            }
        },
        idleAnimation() {
            if (this.isMenuActive) {
                return;
            }

            const lines = this.$refs.navMenuButtonSVG.children;
            const { navMenuButton } = this.$refs;
            const tl = this.$gsap.timeline({ defaults: { ease: 'back.out' } });
            const line0Attrs = { x1: 0.25, y1: 7.75, x2: 19.75, y2: 7.75 };
            const line1Attrs = { x1: 5.25, y1: 11.75, x2: 19.75, y2: 11.75 };

            if (this.prefersReducedMotion) {
                tl.to(lines, { opacity: 0 });
                tl.set(lines[0], { attr: line0Attrs });
                tl.set(lines[1], { attr: line1Attrs });
                tl.set(lines, { color: '#bababa' });
                tl.set(navMenuButton, { '--bg-scale': '0' });
                tl.to(lines, { opacity: 1 });
            } else {
                tl.to(lines, { color: '#bababa' });
                tl.to(
                    navMenuButton,
                    { '--bg-scale': '0', ease: 'power2.out' },
                    0
                );
                tl.to(lines[0], { attr: line0Attrs }, 0);
                tl.to(lines[1], { attr: line1Attrs }, '<');
            }
        },
        hoverAnimation() {
            if (this.isMenuActive || this.prefersReducedMotion) return;

            const lines = this.$refs.navMenuButtonSVG.children;
            this.$gsap.to(lines, {
                attr: { x1: SVG_LINES_PADDING },
                ease: 'back.out'
            });
        }
    }
};
</script>

<style lang="scss">
.nav {
    color: darken($color: white, $amount: 27);
    justify-content: space-between;
    padding: 1rem var(--x-padding);
    transition: color 200ms ease;
    pointer-events: none;
    align-items: stretch;
    position: fixed;
    display: flex;
    z-index: 2;
    top: 1rem;
    left: 0;
    width: 100%;

    &__title {
        background-color: transparent;
        font-size: var(--step-2);
        color: currentColor;
        pointer-events: all;
        cursor: pointer;
        border: none;
        padding: 0;
        margin: 0;
    }

    &__sections {
        pointer-events: all;
        position: relative;

        &__list {
            grid-template-rows: repeat(var(--sections-length), 1fr);
            list-style-type: none;
            display: grid;
            gap: 0.25rem;
            padding: 0;
            margin: 0;

            &__section {
                transition: color 100ms var(--ease-back);
                font-size: var(--step--2);
                pointer-events: all;
                position: relative;
                text-align: right;
                cursor: pointer;

                &::before {
                    --size: calc(var(--step--2) - 0.6rem);

                    transform: translate(-50%, -50%);
                    transition: opacity 100ms ease;
                    background-color: #ffe6ed;
                    height: var(--size);
                    width: var(--size);
                    position: absolute;
                    border-radius: 50%;
                    content: none;
                    opacity: 0.75;
                    right: 105%;
                    opacity: 0;
                    top: 50%;

                    @media (prefers-reduced-motion: reduce) {
                        content: '';
                    }
                }

                &--non-active {
                    color: darken($color: white, $amount: 60);
                    transition: color 400ms var(--ease-back);
                }

                &--active::before {
                    transition: opacity 400ms ease;
                    opacity: 1;
                }

                &:is(:hover, :focus) {
                    color: white;
                    transition: none;
                }
            }
        }

        &__circle {
            --size: calc(var(--step--2) - 0.6rem);
            --top-offset: 1px;

            transition: right 300ms var(--ease-back), opacity 300ms;
            transform: translate(-50%, 50%);
            background-color: #ffe6ed;
            top: var(--top-offset);
            height: var(--size);
            width: var(--size);
            position: absolute;
            border-radius: 50%;
            opacity: 0.75;
            right: 105%;

            &--hidden {
                right: 110%;
                opacity: 0;
            }

            @media (prefers-reduced-motion: reduce) {
                display: none;
            }
        }

        @media screen and (max-width: 768px) {
            display: none;
        }
    }

    &__menu-button {
        --bg-scale: 0;

        transition: transform 300ms var(--ease-back);
        width: max(var(--step-5), 4rem);
        transform-origin: right center;
        background: transparent;
        pointer-events: all;
        color: currentColor;
        position: relative;
        cursor: pointer;
        border: none;
        height: auto;
        z-index: 1;
        padding: 0;
        margin: 0;

        &:active {
            transform: scale(0.9);
        }

        @media screen and (min-width: 768px) {
            display: none;
        }

        @media (prefers-reduced-motion: reduce) {
            &:active {
                transform: none;
            }
        }

        &::after {
            --size: 120%;

            transform: translate(-50%, -51.5%) scale(var(--bg-scale));
            // transition: transform 400ms;

            background-color: #ffe6ed;
            height: var(--size);
            width: var(--size);
            position: absolute;
            border-radius: 50%;
            content: '';
            z-index: -1;
            left: 50%;
            top: 50%;

            @supports (aspect-ratio: 1/1) {
                aspect-ratio: 1/1;
                height: unset;
            }
        }
    }
}
</style>
