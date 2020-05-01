<PageMeta title="Coronavirus map"
          description="An interactive map to visualize the spread and impact of the COVID-19 coronavirus pandemic across the globe." />

<script context="module">
    export async function preload({ params, query }) {
        let resp = await this.fetch("data/map_relative_cases_country.json");
        return { initData: await resp.json() };
    }
</script>

<script>
    import { writable } from "svelte/store";
    import PageMeta from "../components/PageMeta.svelte";
    import Map from "../components/Map.svelte";
    import DataLoader from "../components/DataLoader.svelte";
    import Card from "../components/Card.svelte";

    export let initData;
    let data = writable(initData);

    const metricTitles = {
        "cases": "Case",
        "deaths": "Death"
    };

    let metric = "cases";
    let relation = "relative";
    let locations = "country";
</script>

<DataLoader dataset="map_{relation}_{metric}_{locations}" store={data} />

<div class="mb-6">
    <Card>
        <div class="flex justify-between">
            <div>
                <div class="select"><select bind:value={metric}>
                    <option selected value="cases">Confirmed cases</option>
                    <option value="deaths">Deaths</option>
                </select></div>
            </div>

            <div>
                <div class="select"><select bind:value={locations}>
                    <option selected value="country">Countries</option>
                    <option value="state">US states</option>
                    <option value="county">US counties</option>
                </select></div>
            </div>

            <div>
                <div class="select"><select bind:value={relation}>
                    <option selected value="absolute">Total {metric}</option>
                    <option value="relative">New {metric}</option>
                    <option value="growth">{metricTitles[metric]} growth factor</option>
                </select></div>
            </div>
        </div>
    </Card>
</div>

<Map map={locations} data={$data} />
