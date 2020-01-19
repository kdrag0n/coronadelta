<script>
    import Tailwindcss from '../components/Tailwindcss.svelte';
    import Nav from '../components/Nav.svelte';

    export let segment;
</script>

<style>
    main {
        position: relative;
        max-width: 56em;
        padding: 2em;
        box-sizing: border-box;
    }
</style>

<Tailwindcss />

<Nav {segment}/>

<main>
    <slot></slot>
</main>
