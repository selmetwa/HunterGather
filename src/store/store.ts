import { writable } from 'svelte/store';

export const modalStore = writable(false);

// collecting
export const collectingModal = writable(false);
export const objectToCollect = writable({});

// preview
export const previewPanel = writable(false);
export const previewPanelObject = writable({ type: '', object: {} });

// destroy objects
export const isDeleteModalOpen = writable(false);
export const deleteModalObject = writable({ type: '', object: {} });

// layout style
export const objectView = writable('card');

// auth modal
export const authModal = writable(false);

// has reached limit
export const hasReachedLimit = writable(false);

export const paywallModal = writable(false);
