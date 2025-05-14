<script lang="ts">
  export let balances: { code: string, issuer?: string, balance: string }[] = [];
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div>
  <h2 class="text-xl font-bold mb-4 text-[var(--color-peach)]">Balances</h2>
  <ul class="mb-4">
    {#each balances as asset}
      <li class="flex items-center justify-between py-2 border-b border-[var(--color-blue-light)] last:border-b-0">
        <div class="flex flex-col">
          <span class="font-semibold">{asset.code}</span>
          {#if asset.issuer}
            <span class="text-xs text-[var(--color-blue-light)]">{asset.issuer.slice(0, 6)}...{asset.issuer.slice(-6)}</span>
          {/if}
        </div>
        <span class="text-lg">{asset.balance}</span>
      </li>
    {/each}
  </ul>
  <div class="flex gap-4">
    <button class="button-glow flex-1" on:click={() => dispatch('send')}>Send</button>
    <button class="button-glow flex-1" style="background: linear-gradient(90deg, var(--color-blue), var(--color-purple));" on:click={() => dispatch('swap')}>Swap</button>
  </div>
</div> 