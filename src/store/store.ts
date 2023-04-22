import { writable } from 'svelte/store';

export const modalStore = writable(false);  
export const collectionIds = writable([]);
export const myBlocks = writable([]);
export const collectingModal = writable(false);
export const objectToCollect = writable({});

// export const blockPreviewObject = writable({});
// export const blockPreviewPanel = writable(false);

// export const collectionPreviewObject = writable('');
// export const collectionPreviewPanel = writable(false);

export const previewPanel = writable(false);
export const previewPanelObject = writable({ type: '', object: {} });