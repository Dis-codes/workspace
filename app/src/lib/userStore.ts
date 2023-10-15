import { writable } from 'svelte/store';

export const user = writable(null);

export function storageStore(fileName: string) {
    const isClient = typeof window !== "undefined";

    const storedValue = isClient ? localStorage.getItem("workspace") : null;
    const initialValueToUse = storedValue ? JSON.parse(storedValue) : {};

    if (fileName && fileName.split(".").length > 1) {
        initialValueToUse[fileName] = initialValueToUse[fileName] || {};
    }
    else{
        initialValueToUse[fileName] = initialValueToUse[fileName] || "";
    }

    const stored = writable(initialValueToUse);

    stored.subscribe(($stored) => {
        if (isClient) {
            localStorage.setItem("workspace", JSON.stringify($stored));
        }
    });

    return stored;
}
