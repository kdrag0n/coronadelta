<svelte:head>
	<title>COVID-19 Growth</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import Chart from 'svelte-frappe-charts';

	let cases = 5;
	let factor = 1.2;
	let absData = undefined;
	let grwData = undefined;

	onMount(async () => {
		let resp = await fetch("/ecdc.json");
		let data = await resp.json();

		let startDate = new Date(data.dates.start);
		let nDays = data.dates.count;
		let labels = [];
		for (let offset = 1; offset <= nDays; offset++) {
			let date = new Date(startDate);
			date.setDate(startDate.getDate() + offset);
			labels.push(date.toLocaleDateString());
		}

		let totalCases = data.cases.absolute.Total;
		absData = {
			labels: labels,
			datasets: [
				{ name: "Total", values: data.cases.absolute.Total },
				{ name: "China", values: data.cases.absolute.China },
				{ name: "Italy", values: data.cases.absolute.Italy },
				{ name: "Iran", values: data.cases.absolute.Iran },
				{ name: "United States", values: data.cases.absolute["United States"] },
			]
		};
		grwData = {
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
		};

		cases = totalCases[totalCases.length - 1];
		factor = data.cases.growth.Total[data.cases.growth.Total.length - 1];
	});
</script>

<h1>At a glance</h1>

<p>There are <strong>{cases}</strong> cases worldwide.</p>

{#if absData !== undefined}
<Chart
	data={absData}
	type="line"
	colors={["black", "orange", "green", "red", "blue"]}
	axisOptions={{xAxisMode: "tick", xIsSeries: 1}}
	height=360 />
{/if}

<p>Case numbers are currently growing at a factor of <strong>{factor.toFixed(2)}</strong>.</p>

{#if grwData !== undefined}
<Chart
	data={grwData}
	type="line"
	colors={["black", "orange", "red", "blue"]}
	axisOptions={{xAxisMode: "tick", xIsSeries: 1}}
	height=360 />
{/if}
