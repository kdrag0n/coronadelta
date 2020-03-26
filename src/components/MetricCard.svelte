<script>
    import Card from './Card.svelte';
    import MetricNumber from './MetricNumber.svelte';
    import Chart from './Chart.svelte';

    // Passthrough
    export let data;
    export let dateLabels;
    // Meta
    export let textClass;
    export let label;
    export let topN = 6;
    // Specific
    export let metric;
    export let format;
    export let sortFormat = format;
    $: totalN = data === undefined ? 0 : data[metric][format].Total[data[metric][format].Total.length - 1];

	function selectDataset(sortCountries, returnCountries, topN) {
		// Construct (country, last value) array
		let countryVals = [];
		Object.entries(sortCountries).forEach(pair => {
			const [k, v] = pair;
			countryVals.push([k, v[v.length - 1]]);
		});

		// Sort by descending values
		countryVals.sort((pairA, pairB) => {
			let a = pairA[1];
			let b = pairB[1];

			if (a > b) {
				return -1;
			} else if (a < b) {
				return 1;
			}
			return 0;
		})

		// Select the first topN in C3 column format
		let selected = [];
		for (let i = 0; i < topN; i++) {
			let key = countryVals[i][0];
			selected.push([key, ...returnCountries[key]]);
		}

		// Return results in C3 format
		return {
			x: "x",
			columns: [
				["x", ...dateLabels],
				...selected
			]
		};
	}
</script>

<Card>
    <MetricNumber n={totalN} class={textClass} label={label} />
    {#if data !== undefined}
        <Chart data={selectDataset(data[metric][sortFormat], data[metric][format], topN)} />
    {/if}
</Card>
