<script>
    export let checked = true;
    export let label;
</script>

<style>
    @supports (appearance: none) {
        input[type="checkbox"] {
            --active: #275EFE;
            --active-inner: #fff;
            --focus: 2px rgba(39, 94, 254, .3);
            --border: #BBC1E1;
            --border-hover: #275EFE;
            --background: #fff;
            appearance: none;
            height: 21px;
            outline: none;
            display: inline-block;
            vertical-align: top;
            position: relative;
            margin: 0;
            cursor: pointer;
            border: 1px solid var(--bc, var(--border));
            background: var(--b, var(--background));
            transition: background .3s, border-color .3s, box-shadow .2s;
        }
        input[type="checkbox"]:after {
            content: "";
            display: block;
            left: 0;
            top: 0;
            position: absolute;
            transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
        }
        input[type="checkbox"]:checked {
            --b: var(--active);
            --bc: var(--active);
            --d-o: .2s;
            --d-t: .4s;
            --d-t-e: cubic-bezier(.2, .85, .32, 1);
        }
        input[type="checkbox"]:hover:not(:checked):not(:disabled) {
            --bc: var(--border-hover);
        }
        input[type="checkbox"]:not(.switch) {
            width: 21px;
        }
        input[type="checkbox"]:not(.switch):after {
            opacity: var(--o, 0);
        }
        input[type="checkbox"]:not(.switch):checked {
            --o: 1;
        }
        input[type="checkbox"] + label {
            font-size: 14px;
            line-height: 21px;
            display: inline-block;
            vertical-align: top;
            cursor: pointer;
            margin-left: 4px;
        }
        input[type="checkbox"].switch {
            width: 38px;
            border-radius: 11px;
        }
        input[type="checkbox"].switch:after {
            left: 2px;
            top: 2px;
            border-radius: 50%;
            width: 15px;
            height: 15px;
            background: var(--ab, var(--border));
            transform: translateX(var(--x, 0));
        }
        input[type="checkbox"].switch:checked {
            --ab: var(--active-inner);
            --x: 17px;
        }
    }
</style>

<label>
    <input type="checkbox" class="switch" bind:checked={checked}>
    {label}
</label>
