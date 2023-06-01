import { writable } from "svelte/store";

export const propertyDetails = writable(localStorage.getItem('property_index'));
export let propertyListingsDatabase = writable(JSON.parse(localStorage.getItem('property_listings')));