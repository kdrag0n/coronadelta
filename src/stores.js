import { writable as writableMem } from 'svelte/store';
import { writable as writableLocal } from 'svelte-persistent-store';

export const data = writableMem(undefined);
export const useLog = writableLocal(true);
