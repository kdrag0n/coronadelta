import { writable as writableMem, readable as readableMem } from 'svelte/store';
import { writable as writableLocal } from 'svelte-persistent-store';
import initData from '../static/timeseries_data.json';

export const data = writableMem(initData);
export const useLog = writableLocal(true);

const dataPath = "/timeseries_data.json";
export async function updateData() {
    let resp = await fetch(dataPath);
    $data = await resp.json();
}

let _chartRenders = [];
export const chartRenders = readableMem(_chartRenders);
let renderScheduled = false;
export function scheduleChartRender() {
    if (_chartRenders.length > 0 && !renderScheduled) {
        let job = _chartRenders.pop();
        renderScheduled = true;

        window.requestAnimationFrame(ts => {
            setTimeout(() => {
                job();
                renderScheduled = false;
                scheduleChartRender();
            }, 0);
        });
    }
}
