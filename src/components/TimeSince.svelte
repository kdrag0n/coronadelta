<script>
    import Refresh from "./Refresh.svelte";
    import { formatDistanceToNow } from "date-fns";

    export let since;
    export let updateFreq = 60;

    let formatted;
    function format(since) {
        formatted = formatDistanceToNow(since, { addSuffix: true });
    }

    $: format(since);
</script>

<Refresh callback={format} interval={updateFreq * 1000} />

{formatted}
