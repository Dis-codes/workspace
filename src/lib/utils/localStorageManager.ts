export default class LocalStorage {
	get(key: string): string | null {
		return localStorage.getItem(key);
	}
}
