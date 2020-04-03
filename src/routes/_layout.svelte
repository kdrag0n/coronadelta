<script>
    import TailwindBase from "../components/tailwind/TailwindBase.svelte";
    import Nav from "../components/Nav.svelte";
    import Analytics from "../components/Analytics.svelte";

    const dev = process.env.NODE_ENV === "development";

    export let segment;
</script>

<style>
    main {
        position: relative;
        box-sizing: border-box;
        margin: 0 auto;
        @apply max-w-3xl;
    }
</style>

<TailwindBase />

<Nav {segment}/>

<main>
    <slot></slot>
</main>

{#if !dev}
    <Analytics />
{/if}
