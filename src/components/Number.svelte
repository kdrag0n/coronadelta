<style global>
    @font-face {
        font-family: 'Metropolis';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url("/Metropolis-Bold.otf");
    }
</style>

<script>
    export let n;
    let extraClass;
    export { extraClass as class };
</script>

<span class="text-2xl font-number font-bold {extraClass}">{n.toLocaleString()}</span>
