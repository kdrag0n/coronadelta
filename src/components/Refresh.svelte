<script>
    import { onMount, onDestroy } from "svelte";

    export let callback;
    export let interval;

    let _interval;
    let lastUpdate = +new Date();

    function _callback() {
        callback();
        lastUpdate = +new Date();
    }

    function startRefresh() {
        _interval = setInterval(_callback, interval);
    }

    function stopRefresh() {
        clearInterval(_interval);
        _interval = null;
    }

    onMount(startRefresh);
    onDestroy(stopRefresh);

    function handleVisibilityChange() {
        if (document.hidden) {
            stopRefresh();
        } else {
            let now = +new Date();
            if (now - lastUpdate >= interval) {
                callback();
            }

            startRefresh();
        }
    }
</script>

<svelte:window on:visibilitychange={handleVisibilityChange}/>
