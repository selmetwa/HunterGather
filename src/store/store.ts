import { writable } from 'svelte/store';

// store user for auth purposes
export const userSession = writable(null);