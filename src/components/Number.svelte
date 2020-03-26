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
    export let label;

    let extraClass;
    export { extraClass as class };
</script>

<p class="text-center mb-2"><span class="text-2xl font-number font-bold {extraClass}">{n.toLocaleString()}&nbsp;</span>{label}</p>
