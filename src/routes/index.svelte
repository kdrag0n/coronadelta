<svelte:head>
    <title>COVID-19 Growth</title>
	<link rel="stylesheet" href="/lib/raster/raster.grid.css">
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import Chart from '../components/Chart.svelte';

	let cases = 5;
	let deaths;
	let newCases;
    let factor = 1.2;
    let absData;
    let grwData;
	let deaData;
	let relData;
    let nCountries;
    let dateLabels = [];

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
        deaData = {
            x: "x",
            columns: [
                ["x", ...dateLabels],
                ["Total", ...data.deaths.absolute.Total],
                ["China", ...data.deaths.absolute.China],
                ["Iran", ...data.deaths.absolute.Iran],
                ["Italy", ...data.deaths.absolute.Italy],
                ["United States", ...data.deaths.absolute["United States"]],
            ]
        };
        relData = {
            x: "x",
            columns: [
                ["x", ...dateLabels],
                ["Total", ...data.cases.relative.Total],
                ["China", ...data.cases.relative.China],
                ["Iran", ...data.cases.relative.Iran],
                ["Italy", ...data.cases.relative.Italy],
                ["United States", ...data.cases.relative["United States"]],
            ]
        };

        newCases = data.cases.relative.Total[data.cases.relative.Total.length - 1];
        deaths = data.deaths.absolute.Total[data.deaths.absolute.Total.length - 1];
        cases = totalCases[totalCases.length - 1];
        factor = data.cases.growth.Total[data.cases.growth.Total.length - 1];
    });
</script>

<r-grid columns=2>
	<r-cell>
		<center><h1>{cases}</h1> confirmed cases</center>
		{#if absData !== undefined}
			<Chart data={absData} />
		{/if}
		<center>in <h3>{nCountries}</h3> countries</center>
	</r-cell>

	<r-cell>
		<center><h1>{deaths}</h1> deaths</center>
		{#if deaData !== undefined}
			<Chart data={deaData} />
		{/if}
	</r-cell>

	<r-cell>
		<center><h1>{newCases}</h1> new cases <b>today</b></center>
		{#if relData !== undefined}
			<Chart data={relData} />
		{/if}
		<center>in <h3>{nCountries}</h3> countries</center>
	</r-cell>

	<r-cell>
		<center><h1>{factor.toFixed(2)}</h1> growth factor</center>
		{#if grwData !== undefined}
		<Chart data={grwData}
			regions={[{
				axis: "y",
				start: 0,
				end: 1,
			}]} />
		{/if}
	</r-cell>
</r-grid>
