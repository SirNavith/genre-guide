import { writable, Writable } from "svelte/store";

// https://higsch.me/2019/06/22/2019-06-21-svelte-local-storage/
export default <Item>(key: string, initial: Item): Writable<Item> => {
	// eslint-disable-next-line consistent-return
	const { set: setStore, ...readableStore } = writable<Item>(initial, () => {
		// Fill it up with the current value when we get a subscriber
		// @ts-ignore -- doesn't exist until @rollup/plugin-replace makes it
		if (process.browser) {
			// eslint-disable-next-line no-use-before-define
			getAndSetFromLocalStorage();
		}

		const updateFromStorageEvents = ({ key: eventKey }: StorageEvent): void => {
			// eslint-disable-next-line no-use-before-define
			if (eventKey === key) getAndSetFromLocalStorage();
		};

		// @ts-ignore -- doesn't exist until @rollup/plugin-replace makes it
		if (process.browser) {
			window.addEventListener("storage", updateFromStorageEvents);
			return () => window.removeEventListener("storage", updateFromStorageEvents);
		}
	});

	// Set both the localStorage and this Svelte store
	const set = (value: Item): void => {
		setStore(value);
		localStorage.setItem(key, JSON.stringify(value));
	};

	// Synchronize the Svelte store and local storage
	const getAndSetFromLocalStorage = (): void => {
		const localValue = localStorage.getItem(key);

		if (localValue === null) set(initial);
		else {
			try {
				setStore(JSON.parse(localValue));
			} catch {
				set(initial);
			}
		}
	};

	return { ...readableStore, set };
};
