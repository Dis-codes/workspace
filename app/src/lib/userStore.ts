import { browser } from '$app/environment';
import { writable } from 'svelte/store';
export const user = writable(null);

let generatorStorage = browser ? JSON.parse(window.localStorage.getItem('generator') ?? "{}") : {};
export const generator = writable(generatorStorage);
generator.subscribe(value => {
    if (browser) {
        window.localStorage.setItem('generator', JSON.stringify(value));
    }
});