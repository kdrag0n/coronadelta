import { writable as writableMem } from 'svelte/store';
import { writable as writableLocal } from 'svelte-persistent-store';
import initData from '../static/timeseries_data.json';

export const data = writableMem(initData);
export const useLog = writableLocal(true);

const dataPath = "/timeseries_data.json";
export async function updateData() {
    let resp = await fetch(dataPath);
    $data = await resp.json();
}
