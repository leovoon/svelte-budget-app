import { writable } from "svelte/store";

export const budgets = writable([
    { name: "Food", amount: 400 },
    { name: "Clothes", amount: 20 },
    { name: "Entertainment", amount: 20 },
    { name: "Transportation", amount: 100 },
    { name: "Health", amount: 0 },
]);
export const expenses = writable([
    { name: "eat", amount: 10 , budget: "Food" , timestamp: "2020-01-01" },
    { name: "uniqlo", amount: 60 , budget: "Clothes" , timestamp: "2020-01-01" },
    { name: "movie", amount: 20 , budget: "Entertainment" , timestamp: "2020-01-01" },
]);