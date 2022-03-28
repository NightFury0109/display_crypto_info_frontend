import { readable, writable } from 'svelte/store';

export const apiURL = readable("http://127.0.0.1:8000");

export const firstUrlData = writable({});
export const secondUrlData = writable({});
export const thirdUrlData = writable({});

export const error = writable("");