<script lang="ts">
  import "carbon-components-svelte/css/all.css"
  import { Dropdown, Tag, Button, TextInput, NumberInput, FluidForm, RadioButtonGroup, RadioButton, ExpandableTile } from "carbon-components-svelte"
  import Add from "carbon-icons-svelte/lib/Add.svelte"
  import { budgets, expenses } from "./stores"
  let theme: "white" | "g10" | "g80" | "g90" | "g100" = "white"
  // declare theme array with property id and text value
  let themeArray = [
    { id: "white", text: "White" },
    { id: "g10", text: "Gray 10" },
    { id: "g80", text: "Gray 80" },
    { id: "g90", text: "Gray 90" },
    { id: "g100", text: "Gray 100" },
  ]
  $: document.documentElement.setAttribute("theme", theme)

  let radioSelected = "expense"
  let textInputExpense: string
  let textInputBudget: string
  let listOfBudgets = $budgets.map((budget) => ({ id: budget.name, text: budget.name }))
  let selectedBudget = listOfBudgets[0].id

  $: textInput = radioSelected === "expense" ? textInputExpense : textInputBudget
  $: textInputLabel = radioSelected === "expense" ? "what expense" : "which budget"
</script>

<main>
  <h1>Svelte Budget</h1>
  <Dropdown titleText="Select theme" bind:selectedId={theme} items={themeArray} />
  <br />
  <div style:display="grid" style:gap="1rem">
    <RadioButtonGroup name="radio-button-group" bind:selected={radioSelected}>
      <RadioButton id="radio-1" value="budget" labelText="New Budget" />
      <RadioButton id="radio-2" value="expense" labelText="New Expense" />
    </RadioButtonGroup>
    <TextInput labelText={textInputLabel} bind:value={textInput} placeholder="Enter name..." />

    <NumberInput min={1} value={1} label="how many" invalidText="Number must be greater than 0" />
    <Dropdown direction="top" titleText="choose budget" inline bind:selectedId={selectedBudget} items={listOfBudgets} />
  </div>

  <div style:margin-top="2rem" style:display="grid" style:gap="1rem">
    <h4>History</h4>

    {#each $budgets as { name: budgetName, amount }}
      <ExpandableTile tileMaxHeight={10} tileCollapsedIconText="Interact to expand budget" tileExpandedIconText="Interact to collapse budget">
        <div slot="above" style:height="3rem">
          <div style:display="flex" style:align-items="center" style:gap="10px">
            <h5>{budgetName}</h5>
            <Tag type="cyan" size="sm">RM {amount}</Tag>
          </div>
        </div>

        <div slot="below" style:height="10rem">
          <h5>Expenses</h5>
          <div style:height="10rem">
            {#each $expenses as { name, budget, amount, timestamp }}
              {#if budgetName === budget}
                <div style:height="10rem">
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

<footer>Made with Svelte by <a href="https://github.com/leovoon/svelte-budget-app">leovoon</a></footer>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    padding: 1em;
    margin: 0 auto;
  }
</style>
