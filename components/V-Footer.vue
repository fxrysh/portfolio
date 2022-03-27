<template>
    <footer ref="footer" class="footer">
        <div ref="footerWrapper" class="footer__wrapper" data-scroll-sticky>
            <div ref="footerContent" class="footer__content">
                <p ref="footerContentTitle" class="footer__content__title">
                    Farish <br />
                    <span class="serif">Irfan</span>
                </p>
                <ul class="footer__content__social">
                    <li
                        v-for="(link, key) in socialLinks"
                        :key="key"
                        class="footer__content__social__link"
                    >
                        <V-Footer-Social-Link
                            ref="footerContentSocialLinks"
                            v-hoverable
                            target="_blank"
                            :href="link.href"
                            :aria-label="`link to ${link.label}`"
                        >
                            {{ link.label }}
                        </V-Footer-Social-Link>
                    </li>
                </ul>

                <p class="footer__content__copyright">
                    Copyright ©{{ getCurrentYear() }} FI
                </p>
                <p class="footer__content__note">Made with ❤ from Malaysia!</p>
            </div>
            <div
                class="footer__arrow__wrapper"
                role="button"
                aria-label="scroll to top"
                tabindex="0"
                @click="$scrollTo(0)"
            >
                <ArrowUpSVG aria-label="up arrow" class="footer__arrow" />
            </div>
        </div>
    </footer>
</template>

<script>
import ArrowUpSVG from '~/images/arrow/up.svg?inline';

export default {
    components: { ArrowUpSVG },
    data: () => ({
        socialLinks: [
            {
                label: 'linktree',
                href: 'https://linktr.ee/fxrysh'
            },
            {
                label: 'github',
                href: 'https://github.com/fxrysh'
            },
            {
                label: 'twitter',
                href: 'https://twitter.com/fxrysh'
            },
            {
                label: 'email',
                href: 'mailto:hello@farish.is-a.dev'
            }
        ]
    }),
    mounted() {
        const prefersReducedMotion = this.$prefersReducedMotion();
        const { footer, footerWrapper, footerContentTitle } = this.$refs;
        const gsap = this.$gsap;

        const resizeObserver = new ResizeObserver(
            this.setFooterWrapperHeightVar
        );

        resizeObserver.observe(footerWrapper);
        this.setFooterWrapperHeightVar();

        if (!prefersReducedMotion) {
            gsap.fromTo(
                footerContentTitle,
                { '--x-offset': '0%' },
                {
                    '--x-offset': '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: footer,
                        start: `bottom-=${footerContentTitle.offsetHeight} bottom`,
                        end: `bottom bottom`,
                        scrub: true
                    }
                }
            );
        }
    },
    methods: {
        setFooterWrapperHeightVar() {
            this.$gsap.set(this.$refs.footer, {
                '--wrapper-height': `${this.$refs.footerWrapper.offsetHeight}px`,
                onEnd: () => this.$locomotiveScroll.update()
            });
        },
        getCurrentYear() {
            return new Date().getFullYear();
        }
    }
};
</script>

<style lang="scss">
@use 'sass:color';

@mixin visible-after {
    position: absolute;
    content: '';
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;

    @media (prefers-reduced-motion: reduce) {
        content: none;
    }
}

.footer {
    height: var(--wrapper-height);
    overflow: hidden;

    &__wrapper {
        justify-content: flex-start;
        align-items: stretch;
        pointer-events: all;
        flex-wrap: wrap;
        position: fixed;
        display: flex;
        z-index: -1;
        bottom: 0;
        right: 0;
        left: 0;
    }

    &__content {
        --secondary-color: #{color.adjust($color: #fff, $lightness: -25%)};
        grid-template-columns: repeat(2, 1fr);
        padding: 2rem clamp(1rem, 4vw, 5rem) 3rem;
        background: var(--black-color);
        align-items: center;
        position: relative;
        color: whitesmoke;
        flex-basis: 80%;
        display: grid;
        flex-grow: 1;
        gap: 1.5rem;
        width: 100%;

        & > *:nth-child(even) {
            justify-self: end;
            text-align: right;
        }

        &__title {
            font-size: var(--step-4);
            display: inline-block;
            width: min-content;
            position: relative;
            --x-offset: 0px;
            overflow: hidden;
            margin: 0;

            .serif {
                margin-inline-start: calc(var(--step-5) / 2);
                display: inline-block;
                position: relative;

                &::after {
                    @include visible-after;

                    background-color: rgba($color: #030303, $alpha: 0.75);
                    transform: translateX(var(--x-offset));
                }
            }

            &::after {
                @include visible-after;

                background-color: rgba($color: #030303, $alpha: 0.65);
                transform: translateX(var(--x-offset));
                bottom: calc(50% - 5px);
            }
        }

        &__social {
            padding-inline-start: 0;
            list-style-type: none;
            margin: 0;

            &__link {
                margin: 1rem 0;

                a {
                    font-size: calc(var(--step--2) + 0.1rem);
                    text-transform: uppercase;
                    text-decoration: none;
                    color: whitesmoke;
                }
            }
        }

        &__copyright {
            color: var(--secondary-color);
            margin: 0;
        }

        &__note {
            color: var(--secondary-color);
            margin: 0;

            img {
                transform: translateY(20%);
                width: var(--step--1);
                height: auto;

                &:last-of-type {
                    width: calc(var(--step--1) + 0.15rem);
                }
            }
        }

        &::after {
            background-color: rgba($color: white, $alpha: 0.125);
            position: absolute;
            content: '';
            width: 1px;
            bottom: 0;
            right: 0;
            top: 0;
        }

        @media screen and (max-width: 600px) {
            grid-template-rows: repeat(4, fit-content);
            grid-template-columns: 1fr;

            & > * {
                justify-self: center !important;
                text-align: center !important;
            }
        }
    }

    &__arrow {
        transition: transform 300ms, opacity 300ms;
        color: darken($color: white, $amount: 40);
        max-width: min(15vw, 130px);
        height: auto;
        width: 40%;

        &__wrapper {
            background: var(--black-color);
            justify-content: center;
            align-items: center;
            min-width: 115px;
            cursor: pointer;
            flex-basis: 20%;
            display: flex;
            flex-grow: 1;

            &:is(:focus, :hover) {
                svg {
                    transform: scale(0.9) translateY(-15px);
                    opacity: 0.75;
                }
            }
        }

        @media screen and (max-width: 575px) {
            min-height: 30vw;
            color: whitesmoke;
        }
    }
}
</style>
