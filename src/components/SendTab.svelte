<script lang="ts">
  export let balances: { code: string, issuer?: string, balance: string }[] = [];
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let recipient = '';
  let amount = '';
  let asset = balances[0]?.code || 'XLM';

  function handleSend() {
    dispatch('send', { recipient, amount, asset });
    recipient = '';
    amount = '';
    asset = balances[0]?.code || 'XLM';
    dispatch('close');
  }
</script>

<div class="flex items-center justify-center">
  <div class="card w-full max-w-md relative">
    <h2 class="text-2xl font-bold mb-4 text-[var(--color-peach)]">Send Asset</h2>
    <label class="block mb-2">Recipient Address</label>
    <input type="text" bind:value={recipient} placeholder="G..." class="w-full mb-4" />
    <label class="block mb-2">Amount</label>
    <input type="number" min="0" step="any" bind:value={amount} class="w-full mb-4" />
    <label class="block mb-2">Asset</label>
    <select bind:value={asset} class="w-full mb-6">
      {#each balances as a}
        <option value={a.code}>{a.code}</option>
      {/each}
    </select>
    <button class="button-minimal w-full" on:click={handleSend}>Send</button>
  </div>
</div>