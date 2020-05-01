<script>
    import Card from "./Card.svelte";
    import MetricNumber from "./MetricNumber.svelte";
    import Chart from "./Chart.svelte";
    import tailwindTheme from "tailwindcss/defaultTheme";
    const colors = tailwindTheme.colors;

    let chartColors = [];
    const colorNames = ["red", "yellow", "purple", "blue", "green", "gray", "orange", "pink", "indigo", "teal"];
    colorNames.forEach(colorName => chartColors.push(colors[colorName]["600"]))

    // Passthrough
    export let dateLabels;
    export let data;
    // Meta
    export let textClass;
    export let label;
    export let topN = 6;
    export let growthThreshold = false;
    export let scale = "linear";
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
			selected.push({
                label: key,
                data: returnCountries[key],
                borderColor: chartColors[i % chartColors.length],
                backgroundColor: chartColors[i % chartColors.length]
            });
		}

        // Inject exponential threshold
        if (growthThreshold) {
            let thresData = [];
            thresData.length = dateLabels.length;
            thresData.fill(1);
            selected.push({
                label: "Exponential threshold",
                data: thresData,
                borderColor: chartColors[3], // purple
                backgroundColor: chartColors[3],
                borderWidth: 2,
                borderDash: [8]
            });
        }

		// Return results in C3 format
		return {
            labels: dateLabels,
            datasets: selected
		};
	}
</script>

<Card>
    <MetricNumber n={totalN} class={textClass} label={label} />
    {#if data !== undefined}
        <Chart data={selectDataset(data[metric][sortFormat], data[metric][format], topN)} {scale} />
    {/if}
</Card>
