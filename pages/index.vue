<template>
    <div role="presentation">
        <V-Navbar :current-section="currentSection" />
        <V-Header aria-label="content header" />
        <main aria-label="main content">
            <V-Work />
            <V-About />
            <V-Contact />
        </main>
        <V-Footer />
        <V-Menu :current-section="currentSection" />
    </div>
</template>

<script>
export default {
    name: 'IndexPage',
    data: () => ({ currentSection: 0 }),
    mounted() {
        const gsap = this.$gsap;
        const ScrollTrigger = this.$ScrollTrigger;

        gsap.utils.toArray('header, section').forEach((item, i) => {
            ScrollTrigger.create({
                trigger: item,
                start: 'top 45%',
                end: 'bottom 45%',
                onEnter: () => (this.currentSection = i),
                onEnterBack: () => (this.currentSection = i)
            });
        });
    }
};
</script>

<style></style>
