<script>
    import { tooltipShown } from "../stores.js";

    export let model;
    export let x;
    export let y;

    $: if (model.opacity && !$tooltipShown) {
        $tooltipShown = true;
        if (window.sa_event !== undefined) {
            window.sa_event("tooltip");
        }
    }
</script>

<style>
    .tooltip {
        opacity: 1;
        position: absolute;
        background: rgba(26, 32, 44, .9);
        color: white;
        border-radius: 6px;
        pointer-events: none;
        font-size: 12px;
        padding: 10px;
        line-height: 1.2rem;
        user-select: none;
    }

    .tt-header {
        padding-bottom: 0.25rem;
    }

    .color-strip {
        border-width: 2px;
    }
</style>

{#if model.opacity}
    <div class="tooltip" style="left: {x}px; top: {y}px">
        {#if model.body}
            <table>
                <thead>
                    {#each (model.title || []) as line}
                        <tr><th class="tt-header">
                            {line}
                        </th></tr>
                    {/each}
                </thead>

                <tbody>
                    {#each model.body as item, i}
                        <tr><td>
                            <span class="color-strip"
                                  style="background-color: {model.labelColors[i].backgroundColor};
                                         border-color: {model.labelColors[i].borderColor}">
                                &nbsp;
                            </span>
                            {item.lines}
                        </td></tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
{/if}
