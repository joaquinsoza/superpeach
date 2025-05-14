<script lang="ts">
  export let open: boolean = false;
  export let balances: { code: string, issuer?: string, balance: string }[] = [];
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let fromAsset = balances[0]?.code || 'XLM';
  let toAsset = balances[1]?.code || 'XLM';
  let amount = '';

  function handleSwap() {
    dispatch('swap', { fromAsset, toAsset, amount });
    fromAsset = balances[0]?.code || 'XLM';
    toAsset = balances[1]?.code || 'XLM';
    amount = '';
    dispatch('close');
  }
</script>

{#if open}
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div class="card w-full max-w-md relative">
      <button class="absolute top-2 right-2 text-xl text-[var(--color-blue-light)]" on:click={() => dispatch('close')}>×</button>
      <h2 class="text-2xl font-bold mb-4 text-[var(--color-peach)]">Swap Assets</h2>
      <label class="block mb-2">From</label>
      <select bind:value={fromAsset} class="w-full mb-4">
        {#each balances as a}
          <option value={a.code}>{a.code}</option>
        {/each}
      </select>
      <label class="block mb-2">To</label>
      <select bind:value={toAsset} class="w-full mb-4">
        {#each balances as a}
          <option value={a.code}>{a.code}</option>
        {/each}
      </select>
      <label class="block mb-2">Amount</label>
      <input type="number" min="0" step="any" bind:value={amount} class="w-full mb-6" />
      <button class="button-glow w-full" on:click={handleSwap}>Swap</button>
    </div>
  </div>
{/if} 