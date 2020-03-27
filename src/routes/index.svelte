<PageMeta title="Coronavirus at a glance" description="Live insights into fresh statistics for the COVID-19 coronavirus pandemic, complete with interactive charts." slug="" />

<script>
	import { onMount } from 'svelte';
	import { data, useLog } from '../stores.js';
	import Card from '../components/Card.svelte';
	import Switch from '../components/Switch.svelte';
	import MetricCard from '../components/MetricCard.svelte';
	import PageMeta from '../components/PageMeta.svelte';

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

		$data = _data;
    });
</script>

<style>
	.metacard {
		margin-bottom: 1.5rem; /* gap-6 */
	}
</style>

<div class="metacard">
	<Card>
		<div class="flex justify-between">
			<div>
				Updated at
			</div>

			<div>
				<Switch label="Logarithmic scale" bind:checked={$useLog} />
			</div>
		</div>
	</Card>
</div>

<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
	<MetricCard {dateLabels} log={$useLog}
		textClass="text-orange-600" label="confirmed cases"
		metric="cases" format="absolute" />

	<MetricCard {dateLabels} log={$useLog}
		textClass="text-orange-600" label="new cases"
		metric="cases" format="relative" />

	<MetricCard {dateLabels}
		textClass="text-orange-600" label="case growth factor" topN=2 growthThreshold=true
		metric="cases" sortFormat="relative" format="growth" />

	<MetricCard {dateLabels} log={$useLog}
		textClass="text-red-600" label="deaths"
		metric="deaths" format="absolute" />

	<MetricCard {dateLabels} log={$useLog}
		textClass="text-red-600" label="new deaths"
		metric="deaths" format="relative" />

	<MetricCard {dateLabels}
		textClass="text-red-600" label="death growth factor" topN=2 growthThreshold=true
		metric="deaths" sortFormat="relative" format="growth" />
</div>
