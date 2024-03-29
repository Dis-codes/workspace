import { writable as internal, type Writable } from "svelte/store";

declare type Updater<T> = (value: T) => T;
declare type StoreDict<T> = { [key: string]: Writable<T> };

interface Stores {
	local: StoreDict<any>;
	session: StoreDict<any>;
}

const stores: Stores = {
	local: {},
	session: {}
};

interface Serializer<T> {
	parse(text: string): T;
	stringify(object: T): string;
}

type StorageType = "local" | "session";

interface Options<T> {
	serializer?: Serializer<T>;
	storage?: StorageType;
}

function getStorage(type: StorageType) {
	return type === "local" ? localStorage : sessionStorage;
}
export function persisted<T>(key: string, options?: Options<T>): Writable<T> {
	const initialValue = {
		"index.dsc": {},
		settings: {
			botName: "My Bot",
			botDescription: "My Bot Description",
			updatedAt: new Date().toISOString(),
			secrets: {}
		},
		notes: ""
	};
	const serializer = options?.serializer ?? JSON;
	const storageType = options?.storage ?? "local";
	const browser = typeof window !== "undefined" && typeof document !== "undefined";
	const storage = browser ? getStorage(storageType) : null;
	if (!storage?.getItem(key)) {
		storage?.setItem(key, serializer.stringify(initialValue));
	}
	function updateStorage(key: string, value: T) {
		storage?.setItem(key, serializer.stringify(value));
	}

	if (!stores[storageType][key]) {
		const store = internal(initialValue, (set) => {
			const json = storage?.getItem(key);

			if (json) {
				set(<T>serializer.parse(json));
			}

			if (browser && storageType == "local") {
				const handleStorage = (event: StorageEvent) => {
					if (event.key === key) set(event.newValue ? serializer.parse(event.newValue) : null);
				};

				window.addEventListener("storage", handleStorage);

				return () => window.removeEventListener("storage", handleStorage);
			}
		});

		const { subscribe, set } = store;

		stores[storageType][key] = {
			set(value: T) {
				updateStorage(key, value);
				set(value);
			},
			update(callback: Updater<T>) {
				return store.update((last) => {
					const value = callback(last);

					updateStorage(key, value);

					return value;
				});
			},
			subscribe
		};
	}

	return stores[storageType][key];
}
