import { writable } from 'svelte/store';

export const user = writable(null);

export function storageStore(fileName: string) {
    const isClient = typeof window !== "undefined";

    const storedValue = isClient ? localStorage.getItem("workspace") : null;
    const initialValueToUse = storedValue ? JSON.parse(storedValue) : {
        settings: {
            botName: "My Bot",
            botDescription: "My Bot Description",
            updatedAt: new Date().toISOString(),
        }
    };

    if (fileName && fileName.split(".").length > 1) {
        initialValueToUse[fileName] = initialValueToUse[fileName] || {};
    }
    else{
        initialValueToUse[fileName] = initialValueToUse[fileName] || "";
    }

    const stored = writable(initialValueToUse);

    stored.subscribe(($stored) => {
        if (isClient) {
            const filesChanged = Object.keys($stored).some((key) => {
                if (key === "settings") {
                  return false;
                }
              
                const storedValue = localStorage.getItem("workspace");
                const stored = storedValue ? JSON.parse(storedValue) : {};
                
                // Compare stringified versions of the objects
                const storedString = JSON.stringify(stored[key]);
                const currentString = JSON.stringify($stored[key]);
                
                return storedString !== currentString;
              });
              
            if (filesChanged) {
                $stored.settings.updatedAt = new Date().toISOString();
                localStorage.setItem("workspace", JSON.stringify($stored));
              }
        }
    });

    return stored;
}
