import { writable as writableMem, readable as readableMem } from 'svelte/store';
import { writable as writableLocal } from 'svelte-persistent-store';

export const scale = writableLocal("log");
export const tooltipShown = writableMem(false);

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
