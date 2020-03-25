<svelte:head>
	<title>COVID-19 Growth</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import Chart from '../components/Chart.svelte';

	let cases = 5;
	let factor = 1.2;
	let absData;
	let grwData;
	let nCountries;
	let dateLabels = [];

	function formatDate(date) {
		let options = { month: "numeric", day: "numeric" };
		let now = new Date();
		if (date.getFullYear() != now.getFullYear()) {
			options.year = "numeric";
		}

		return date.toLocaleDateString(undefined, options);
	}

	onMount(async () => {
		let resp = await fetch("/ecdc.json");
		let data = await resp.json();

		nCountries = data.cases.absolute.length;
		let startDate = new Date(data.dates.start);
		let nDays = data.dates.count;
		for (let offset = 0; offset < nDays; offset++) {
			let date = new Date(startDate);
			date.setDate(startDate.getDate() + offset);
			dateLabels.push(date);
		}

		let totalCases = data.cases.absolute.Total;
		absData = {
			x: "x",
			columns: [
				["x", ...dateLabels],
				["Total", ...data.cases.absolute.Total],
				["China", ...data.cases.absolute.China],
				["Iran", ...data.cases.absolute.Iran],
				["Italy", ...data.cases.absolute.Italy],
				["United States", ...data.cases.absolute["United States"]],
			]
		};
		grwData = {
			x: "x",
			columns: [
				["x", ...dateLabels],
				["Total", ...data.cases.growth.Total],
				["China", ...data.cases.growth.China],
				["Iran", ...data.cases.growth.Iran],
				["Italy", ...data.cases.growth.Italy],
				["United States", ...data.cases.growth["United States"]],
			]
		};

		cases = totalCases[totalCases.length - 1];
		factor = data.cases.growth.Total[data.cases.growth.Total.length - 1];
	});
</script>

<h1>At a glance</h1>

<p>There have been <strong>{cases}</strong> confirmed cases worldwide across <strong>{nCountries}</strong> countries.</p>

{#if absData !== undefined}
<Chart data={absData}
	axis={{
        x: {
			label: "Date",
            type: "timeseries",
			tick: {
				format: formatDate
			}
        },
		y: {
			label: "Cases"
		}
    }} />
{/if}

<p>Case numbers are currently growing at a factor of <strong>{factor.toFixed(2)}</strong>.</p>

{#if grwData !== undefined}
<Chart data={grwData}
	axis={{
        x: {
			label: "Date",
            type: "timeseries",
			tick: {
				format: formatDate
			}
        },
		y: {
			label: "Growth Factor"
		}
    }}
	regions={[{
		axis: "y",
		start: 0,
		end: 1,
	}]} />
{/if}
