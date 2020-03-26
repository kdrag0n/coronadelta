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
</script>

<span class="text-2xl font-number font-bold">{n.toLocaleString()}</span>
