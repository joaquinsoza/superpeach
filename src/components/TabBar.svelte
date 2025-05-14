<script lang="ts">
  export let activeTab: string = 'balances';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const tabs = [
    { key: 'balances', label: 'Balances' },
    { key: 'send', label: 'Send' },
    { key: 'swap', label: 'Swap' },
    { key: 'signers', label: 'Signers' },
    { key: 'demo', label: 'Demo Apps' },
  ];
</script>

<nav class="flex justify-center gap-2 mb-6">
  {#each tabs as tab}
    <button
      class="px-4 py-2 rounded-full font-semibold transition-all duration-150 text-sm"
      class:button-glow={activeTab === tab.key}
      style="background: {activeTab === tab.key ? 'linear-gradient(90deg, var(--color-peach), var(--color-blue))' : 'rgba(24,24,40,0.7)'}; color: {activeTab === tab.key ? 'var(--color-white)' : 'var(--color-blue-light)'};"
      on:click={() => dispatch('change', tab.key)}
    >
      {tab.label}
    </button>
  {/each}
</nav> 