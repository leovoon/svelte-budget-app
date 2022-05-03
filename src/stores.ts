import { writable } from "svelte/store";


export const budgets = writable([
    { id: 0, name: "Food", amount: 400 },
    { id: 1, name: "Clothes", amount: 20 },
    { id: 2, name: "Entertainment", amount: 20 },
    { id: 3, name: "Transportation", amount: 100 },
    { id: 4, name: "Health", amount: 0 },
]);

export function addBudget(budget){
    budgets.update(budgets => [...budgets, budget]);
}

export const expenses = writable([
    { name: "eat", amount: 10 , budgetId: 0 , timestamp: "2020-01-01" },
    { name: "uniqlo", amount: 60 , budgetId: 1 , timestamp: "2020-01-01" },
    { name: "movie", amount: 20 , budgetId: 2 , timestamp: "2020-01-01" },
]);

export function addExpense(expense){
    expenses.update(expenses => [...expenses, expense]);
}