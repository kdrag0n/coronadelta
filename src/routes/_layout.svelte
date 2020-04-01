<script>
    import TailwindBase from "../components/tailwind/TailwindBase.svelte";
    import Nav from "../components/Nav.svelte";

    export let segment;
</script>

<style>
    main {
        position: relative;
        box-sizing: border-box;
        @apply p-6;
    }
</style>

<TailwindBase />

<Nav {segment}/>

<main>
    <slot></slot>
</main>
