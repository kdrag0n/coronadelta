<script>
    import TailwindBase from "../components/tailwind/TailwindBase.svelte";
    import Nav from "../components/Nav.svelte";

    export let segment;
</script>

<style>
    main {
        position: relative;
        padding: 1.5rem; /* gap-6 */
        box-sizing: border-box;
    }
</style>

<TailwindBase />

<Nav {segment}/>

<main>
    <slot></slot>
</main>
