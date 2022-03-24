<template>
    <div>
        <div role="presentation" class="scroller">
            <Nuxt />
        </div>
        <V-Pointer />
        <V-Loader />
    </div>
</template>

<script>
export default {
    name: 'DefaultLayout',
    mounted() {
        this.clear();
        this.logGreeting();
        this.setViewHeight();
        window.addEventListener('resize', this.setViewHeight);
    },
    methods: {
        setViewHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        },
        logGreeting() {
            console.log(
                "Looking for source code? Why not check the repository itself! Don't forget to leave a ⭐!\nRepository: https://github.com/fxrysh/portfolio"
            );
        },
        clear() {
            console.clear();
        }
    }
};
</script>

<style></style>
