<script>
    import { onMount, onDestroy } from "svelte";
    import Refresh from "./Refresh.svelte";

    export let store;
    export let dataset;
    export let interval = 20; // minutes

    let _loadedPath;
    async function updateData() {
        if (dataPath != _loadedPath) {
            let resp = await fetch(dataPath);
            store.set(await resp.json());
            _loadedPath = dataPath;
        }
    }

    let dataPath;
    let mounted = false;
    $: {
        dataPath = `/data/${dataset}.json`;
        if (mounted) {
            updateData();
        }
    }

    onMount(() => {
        mounted = true;
        updateData();
    });

    onDestroy(() => mounted = false);
</script>

<Refresh callback={updateData} interval={interval * 60 * 1000} />
