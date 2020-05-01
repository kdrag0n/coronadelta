<PageMeta title="Coronavirus at a glance"
          description="Live insights into fresh statistics for the COVID-19 coronavirus pandemic, complete with interactive charts and infographics." />

<script context="module">
    export async function preload({ params, query }) {
        let resp = await this.fetch("data/chart_country.json");
        return { initData: await resp.json() };
    }
</script>

<script>
    import { onMount, onDestroy } from "svelte";
    import { scale } from "../stores.js";
    import { writable } from "svelte/store";
    import Card from "../components/Card.svelte";
    import Switch from "../components/Switch.svelte";
    import MetricCard from "../components/MetricCard.svelte";
    import PageMeta from "../components/PageMeta.svelte";
    import TimeSince from "../components/TimeSince.svelte";
    import DataLoader from "../components/DataLoader.svelte";

    export let initData;
    let data = writable(initData);
    let dateLabels;

    $: {
        let nDays = $data.dates.count;
        let startDate = new Date($data.dates.start);
        dateLabels = new Array(nDays);
        for (let offset = 0; offset < nDays; offset++) {
            let date = new Date(startDate);
            date.setDate(startDate.getDate() + offset);
            dateLabels[offset] = date.toLocaleDateString(undefined, {
                month: "numeric",
                day: "numeric"
            });
        }
    }

    let dataset = "country";
    let _useLog = true;
    $: $scale = _useLog ? "log" : "linear";
</script>

<DataLoader dataset="chart_{dataset}" store={data} />

<div class="mb-6">
    <Card>
        <div class="flex justify-between">
            <div>
                Updated <TimeSince since={new Date($data.dates.end)} />
            </div>

            <div>
                <div class="select"><select bind:value={dataset}>
                    <option selected value="country">Countries</option>
                    <option value="state">US states</option>
                    <option value="county">US counties</option>
                </select></div>
            </div>

            <div>
                <Switch label="Logarithmic scale" bind:checked={_useLog} />
            </div>
        </div>
    </Card>
</div>

<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <MetricCard {dateLabels} data={$data} scale={$scale}
        textClass="text-orange-600" label="confirmed cases"
        metric="cases" format="absolute" />

    <MetricCard {dateLabels} data={$data} scale={$scale}
        textClass="text-orange-600" label="new cases"
        metric="cases" format="relative" />

    <MetricCard {dateLabels} data={$data}
        textClass="text-orange-600" label="case growth factor"
        topN=2 growthThreshold=true
        metric="cases" sortFormat="relative" format="growth" />

    <MetricCard {dateLabels} data={$data} scale={$scale}
        textClass="text-red-600" label="deaths"
        metric="deaths" format="absolute" />

    <MetricCard {dateLabels} data={$data} scale={$scale}
        textClass="text-red-600" label="new deaths"
        metric="deaths" format="relative" />

    <MetricCard {dateLabels} data={$data}
        textClass="text-red-600" label="death growth factor"
        topN=2 growthThreshold=true
        metric="deaths" sortFormat="relative" format="growth" />
</div>

<p class="text-gray-600">Data sources: <a href="https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases">ECDC</a> for historical data, <a href="https://thevirustracker.com/">TheVirusTracker</a> (ultimately sourced from <a href="https://www.worldometers.info/coronavirus/">Worldometer</a>) for live updates, <a href="https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html">New York Times</a> for US states and counties. Automatically updates every 20 minutes.</p>
