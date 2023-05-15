import { writable } from 'svelte/store';

export const modalStore = writable(false);  
export const collectionIds = writable([]);
export const myBlocks = writable([]);
export const collectingModal = writable(false);
export const objectToCollect = writable({});

export const previewPanel = writable(false);
export const previewPanelObject = writable({ type: '', object: {} });

// destroy objects
export const isDeleteModalOpen = writable(false);
export const deleteModalObject = writable({ type: '', object: {} });