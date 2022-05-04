<script lang="ts">
  import "carbon-components-svelte/css/all.css"
  import { Dropdown, ProgressBar, Form, Tag, Button, TextInput, NumberInput, RadioButtonGroup, RadioButton, ExpandableTile, InlineNotification } from "carbon-components-svelte"
  import Add from "carbon-icons-svelte/lib/Add.svelte"
  import ChevronDown from "carbon-icons-svelte/lib/ChevronDown.svelte"
  import ChevronUp from "carbon-icons-svelte/lib/ChevronUp.svelte"

  import { budgets, expenses, addBudget, addExpense } from "./stores"
  import { v4 as uuidv4 } from "uuid"

  let theme: "white" | "g10" | "g80" | "g90" | "g100" = "white"
  let themeArray = [
    { id: "white", text: "White" },
    { id: "g10", text: "Gray 10" },
    { id: "g80", text: "Gray 80" },
    { id: "g90", text: "Gray 90" },
    { id: "g100", text: "Gray 100" },
  ]
  let radioSelected = "expense"
  let textInputExpense: string
  let textInputBudget: string
  let numberInputBudget: number = 1
  let numberInputExpense: number = 1
  let selectedBudget = $budgets[0].id
  let expanded = false

  $: document.documentElement.setAttribute("theme", theme)
  $: textInput = radioSelected === "expense" ? textInputExpense : textInputBudget
  $: numberInput = radioSelected === "expense" ? numberInputExpense : numberInputBudget
  $: textInputLabel = radioSelected === "expense" ? "what expense" : "what budget"
  $: listOfBudgets = $budgets.map(({ id, name }) => ({ id, text: name }))
  $: totalBudget = $budgets.reduce((acc, { amount }) => acc + amount, 0)
  $: totalExpense = $expenses.reduce((acc, { amount }) => acc + amount, 0)
  $: budgetLeft = totalBudget - totalExpense
  $: toggleChevron = expanded ? ChevronUp : ChevronDown
  $: toggleChevronIconDescription = expanded ? "Collapse budgets" : "Expand all budgets"

  $: totalExpensesByBudget = (id) => {
    return $expenses.reduce((acc, { amount, budgetId }) => {
      if (budgetId === id) {
        return acc + amount
      }
      return acc
    }, 0)
  }
  $: budgetLeftByBudget = (id) => {
    return $budgets.find((budget) => budget.id === id)?.amount - totalExpensesByBudget(id)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (textInput.trim() === "" || textInput === undefined) {
      alert("Empty name no good")
      return
    }
    if (radioSelected === "expense") {
      addExpense({
        amount: numberInput,
        name: textInput,
        budgetId: selectedBudget,
        timestamp: new Date(Date.now()).toISOString().split("T")[0],
      })
      alert("Added expenses")
    } else {
      if ($budgets.find(({ name }) => name === textInput)) {
        alert("Budget already exists")
        return
      }
      addBudget({
        name: textInput,
        amount: numberInput,
        id: uuidv4(),
      })
      alert("Added budget")
    }
  }
</script>

<main>
  <h1>Svelte Budget</h1>
  <Dropdown titleText="Select theme" bind:selectedId={theme} items={themeArray} />
  <br />
  <Form on:submit={handleSubmit}>
    <div style:display="grid" style:gap="1rem">
      <RadioButtonGroup name="radio-button-group" bind:selected={radioSelected}>
        <RadioButton id="radio-1" value="budget" labelText="New Budget" />
        <RadioButton id="radio-2" value="expense" labelText="New Expense" />
      </RadioButtonGroup>
      <TextInput labelText={textInputLabel} bind:value={textInput} placeholder="Enter name..." />

      <NumberInput min={1} bind:value={numberInput} label="how many (RM)" invalidText="Amount must be greater than 0" />
      {#if radioSelected === "expense"}
        <Dropdown direction="top" titleText="which budget" inline bind:selectedId={selectedBudget} items={listOfBudgets} />
      {/if}
      <Button type="submit" style="place-self: flex-end;" expressive kind="secondary" iconDescription="Add" tooltipPosition="left" icon={Add} />
    </div>
  </Form>

  <div style:margin-top="2rem" style:display="grid" style:gap="1rem">
    <div class="flex-space-between">
      <div class="flex-center">
        <h4>History</h4>
        <Button icon={toggleChevron} on:click={() => (expanded = !expanded)} size="field" kind="ghost" iconDescription={toggleChevronIconDescription} tooltipPosition="right" />
      </div>
      <div>
        <Tag type="purple">RM {totalBudget}</Tag>
      </div>
    </div>
    <ProgressBar bind:value={totalExpense} bind:max={totalBudget} labelText={`${budgetLeft} available ${totalExpense} used`} />

    {#each $budgets as { id, name, amount }}
      <ExpandableTile {expanded} tileMaxHeight={10} tileCollapsedIconText="Interact to expand budget" tileExpandedIconText="Interact to collapse budget">
        <div slot="above" style:height="3rem">
          <div class="flex-center" style:gap="10px">
            <h5>{name}</h5>
            <Tag type="cyan" size="sm">RM {amount}</Tag>
          </div>
        </div>

        <div slot="below" style:overflow-y="auto" style:height="10rem">
          <h5>Expenses</h5>
          <ProgressBar value={totalExpensesByBudget(id)} max={amount} labelText={`${budgetLeftByBudget(id)} available ${totalExpensesByBudget(id)} used`} />

          <div class="expenses">
            {#each $expenses as { name, budgetId, amount, timestamp }}
              {#if id === budgetId}
                <div style:display="block">
                  {name}
                  <Tag type="magenta">RM {amount}</Tag>
                  <Tag type="cool-gray">{timestamp}</Tag>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      </ExpandableTile>
    {/each}
  </div>
</main>

<footer>Made with Svelte and <a href="https://carbondesignsystem.com/">Carbon</a>. Prototype by <a href="https://github.com/leovoon/svelte-budget-app">leovoon</a></footer>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    padding: 1em;
    margin: 0 auto;
  }

  .expenses {
    margin-block: 1rem;
  }

  .flex-center {
    display: flex;
    align-items: center;
  }

  .flex-space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  footer {
    text-align: center;
    padding: 1em;
  }
</style>
