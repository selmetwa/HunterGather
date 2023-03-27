import { writable } from 'svelte/store';


export const modalStore = writable(false);

export const collectionIds = writable([]);

export const myBlocks = writable([]);