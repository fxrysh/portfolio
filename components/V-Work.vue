<template>
    <section
        ref="works"
        class="works"
        aria-label="works section"
        data-scroll-section
    >
        <V-H2 aria-label="work section heading">Work</V-H2>
        <ul class="works__list" aria-label="works list">
            <V-Work-Item
                v-for="(work, key) in works"
                :key="key"
                ref="worksListItems"
                :work="work"
                :i="key"
                :aria-label="work.title"
                class="works__list__item"
            />
        </ul>
    </section>
</template>

<script>
export default {
    data: () => ({ works: [] }),
    async fetch() {
        this.works = await this.$content('works')
            .sortBy('createdAt', 'desc')
            .fetch();
    }
};
</script>

<style lang="scss">
.works {
    padding: 4rem clamp(1rem, 7vw, 5rem) 1rem;
    background-color: var(--black-color);
    pointer-events: all;
    margin-top: -1px;
    color: white;

    &__list {
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        padding-inline-start: 0;
        justify-items: center;
        list-style-type: none;
        align-items: start;
        gap: var(--step-3);
        max-width: 1100px;
        display: grid;
        margin: 0 auto;

        @media screen and(min-width: 798px) {
            &__item:nth-child(even) {
                margin-block-start: 35%;
            }
        }
    }
}
</style>
