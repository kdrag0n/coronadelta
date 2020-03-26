<svelte:head>
    <title>COVID-19 Growth</title>
</svelte:head>

<script>
    import { onMount } from 'svelte';
	import MetricCard from '../components/MetricCard.svelte';

	let data;
	let dateLabels = [];

    function formatDate(date) {
        return date.toLocaleDateString(undefined, { month: "numeric", day: "numeric" });
    }

    onMount(async () => {
        let resp = await fetch("/ecdc.json");
        let _data = await resp.json();

        let startDate = new Date(_data.dates.start);
        let nDays = _data.dates.count;
        for (let offset = 0; offset < nDays; offset++) {
            let date = new Date(startDate);
            date.setDate(startDate.getDate() + offset);
            dateLabels.push(formatDate(date));
		}

		data = _data;
    });
</script>

<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
	<MetricCard {data} {dateLabels}
		textClass="text-orange-600" label="cases"
		metric="cases" format="absolute" />

	<MetricCard {data} {dateLabels}
		textClass="text-orange-600" label="new cases"
		metric="cases" format="relative" />

	<MetricCard {data} {dateLabels}
		textClass="text-orange-600" label="case growth factor"
		metric="cases" sortFormat="relative" format="growth" />

	<MetricCard {data} {dateLabels}
		textClass="text-red-600" label="deaths"
		metric="deaths" format="absolute" />

	<MetricCard {data} {dateLabels}
		textClass="text-red-600" label="new deaths"
		metric="deaths" format="relative" />

	<MetricCard {data} {dateLabels}
		textClass="text-red-600" label="death growth factor"
		metric="deaths" sortFormat="relative" format="growth" />
</div>
