<svelte:head>
	<title>COVID-19 Growth</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import C3Chart from '../components/C3Chart.svelte';

	let cases = 5;
	let factor = 1.2;
	let absData;
	let grwData;
	let nCountries;
	let dateLabels = [];

	function valuesToEntries(values) {
		let entries = [];

		for (let i = 0; i < values.length; i++) {
			entries.push({
				date: dateLabels[i],
				value: values[i]
			});
		}

		return entries;
	}

	onMount(async () => {
		let resp = await fetch("/ecdc.json");
		let data = await resp.json();

		nCountries = data.cases.absolute.length;
		let startDate = new Date("2019-12-31T10:00:00+01:00");
		let nDays = data.dates.count;
		for (let offset = 0; offset < nDays; offset++) {
			let date = new Date(startDate);
			date.setDate(startDate.getDate() + offset);
			dateLabels.push(date.toLocaleDateString());
		}

		let totalCases = data.cases.absolute.Total;
		absData = {
			x: "x",
			xFormat: "%m/%d/%Y",
			columns: [
				["x", ...dateLabels],
				["Total", ...data.cases.absolute.Total],
				["China", ...data.cases.absolute.China],
				["Iran", ...data.cases.absolute.Iran],
				["Italy", ...data.cases.absolute.Italy],
				["United States", ...data.cases.absolute["United States"]],
			]
		};
		/*grwData = {
			labels: labels,
			datasets: [
				{ name: "Total", values: data.cases.growth.Total },
				{ name: "China", values: data.cases.growth.China },
				{ name: "Iran", values: data.cases.growth.Iran },
				{ name: "United States", values: data.cases.growth["United States"] },
			],
			yMarkers: [
				{ label: "", value: 1 }
			]
		};*/

		cases = totalCases[totalCases.length - 1];
		factor = data.cases.growth.Total[data.cases.growth.Total.length - 1];
	});
</script>

<h1>At a glance</h1>

<p>There have been <strong>{cases}</strong> confirmed cases worldwide across <strong>{nCountries}</strong> countries.</p>

{#if absData !== undefined}
<C3Chart
	data={absData} />
{/if}

<p>Case numbers are currently growing at a factor of <strong>{factor.toFixed(2)}</strong>.</p>

<!--
{#if grwData !== undefined}
<LineChart
	data={grwData} />
{/if}
-->
