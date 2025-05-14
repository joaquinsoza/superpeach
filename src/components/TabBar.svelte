<script lang="ts">
  export let activeTab: string = 'balances';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const tabs = [
    { key: 'balances', label: 'Balances' },
    { key: 'send', label: 'Send' },
    { key: 'receive', label: 'Receive' },
    { key: 'swap', label: 'Swap' },
    { key: 'signers', label: 'Signers' },
    { key: 'apps', label: 'Apps' },
  ];
</script>

<nav class="flex md:justify-center md:gap-2 md:mb-6 md:flex-row flex-col md:static fixed bottom-0 left-0 right-0 bg-white md:bg-transparent z-40 border-t md:border-0">
  {#each tabs as tab}
    <button
      class="button-minimal flex-1 md:flex-none md:w-auto py-3 md:py-2 md:px-4 rounded-none md:rounded-full font-semibold text-sm border-0 md:border"
      class:border-b-2={activeTab === tab.key}
      class:border-[var(--color-peach)]={activeTab === tab.key}
      style="background: {activeTab === tab.key ? 'rgba(255,184,107,0.08)' : 'transparent'}; color: {activeTab === tab.key ? 'var(--color-peach)' : 'var(--color-black)'}; border-color: {activeTab === tab.key ? 'var(--color-peach)' : 'transparent'};"
      on:click={() => dispatch('change', tab.key)}
    >
      {tab.label}
    </button>
  {/each}
</nav> 