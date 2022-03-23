import LocomotiveScroll from 'locomotive-scroll';

const LOCOMOTIVE_SCROLL_BREAK_POINT = 1024;
const SCROLL_TO_DURATION_IN_SECONDS = 1.5;

export default ({ $gsap, $ScrollTrigger }, inject) => {
    inject('smoothScrollBreakPoint', LOCOMOTIVE_SCROLL_BREAK_POINT);

    const locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector('.scroller'),
        smooth: true
    });

    locomotiveScroll.on('scroll', $ScrollTrigger.update);
    $ScrollTrigger.scrollerProxy(locomotiveScroll.el, {
        pinType: locomotiveScroll.el.style.transform ? 'transform' : 'fixed',
        scrollTop(value) {
            return arguments.length
                ? locomotiveScroll.scrollTo(value, 0, 0)
                : locomotiveScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });

    if (window.innerWidth >= LOCOMOTIVE_SCROLL_BREAK_POINT) {
        $ScrollTrigger.defaults({ scroller: locomotiveScroll.el });
    }

    let scrollY = 0;
    locomotiveScroll.on('scroll', ({ scroll }) => {
        scrollY = scroll.y;
    });

    inject('locomotiveScroll', locomotiveScroll);
    inject('scrollY', () =>
        window.innerWidth < LOCOMOTIVE_SCROLL_BREAK_POINT
            ? window.scrollY
            : scrollY
    );

    inject('disableScrollY', () => {
        if (window.innerWidth < LOCOMOTIVE_SCROLL_BREAK_POINT)
            $gsap.set(document.body, { overflowY: 'hidden' });
        else locomotiveScroll.stop();
    });

    inject('enableScrollY', () => {
        if (window.innerWidth < LOCOMOTIVE_SCROLL_BREAK_POINT)
            $gsap.set(document.body, { overflowY: 'auto' });
        else locomotiveScroll.start();
    });

    inject('scrollTo', (selector) => {
        if (window.innerWidth < LOCOMOTIVE_SCROLL_BREAK_POINT) {
            $gsap.to(window, {
                scrollTo: { y: selector, autoKill: true },
                duration: SCROLL_TO_DURATION_IN_SECONDS,
                ease: 'power3.inOut'
            });
        } else {
            locomotiveScroll.scrollTo(selector, {
                duration: SCROLL_TO_DURATION_IN_SECONDS * 1000,
                easing: [0.645, 0.045, 0.355, 1.0]
            });
        }
    });
};
