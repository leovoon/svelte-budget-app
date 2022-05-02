import { writable } from "svelte/store";

export const budgets = writable([
    { name: "Food", amount: 0 },
    { name: "Clothes", amount: 0 },
    { name: "Entertainment", amount: 0 },
    { name: "Transportation", amount: 0 },
    { name: "Health", amount: 0 },
]);
export const expenses = writable([
    { name: "eat", amount: 0 , budget: "Food" , timestamp: "2020-01-01" },
    { name: "uniqlo", amount: 0 , budget: "Clothes" , timestamp: "2020-01-01" },
    { name: "movie", amount: 0 , budget: "Entertainment" , timestamp: "2020-01-01" },
]);