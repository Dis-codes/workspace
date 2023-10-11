import { writable } from 'svelte/store';

export const user = writable(null);

export function storageStore(key: any) {
    if (typeof window === "undefined") {
        return writable({});
    }
    const storedValue = localStorage.getItem(key);
    const initialValueToUse = storedValue ? JSON.parse(storedValue) : {};

    const stored = writable(initialValueToUse);

    stored.subscribe(($stored) => {
        localStorage.setItem(key, JSON.stringify($stored));
    });

    return stored;
}