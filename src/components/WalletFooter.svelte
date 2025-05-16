<script lang="ts">
  import { ArrowDown, ArrowsRightLeft, ArrowUp, CurrencyDollar, Icon, Key, Square2Stack } from "svelte-hero-icons";


  export let activeTab: string = 'balances';
  export let onTabChange: (tab: string) => void = () => {};

  const tabs = [
    { key: 'balances', label: 'Balance', icon: CurrencyDollar },
    { key: 'send', label: 'Send', icon: ArrowUp },
    { key: 'receive', label: 'Receive', icon: ArrowDown },
    { key: 'swap', label: 'Trade', icon: ArrowsRightLeft },
    { key: 'signers', label: 'Signers', icon: Key },
    { key: 'apps', label: 'Apps', icon: Square2Stack }
  ];
</script>

<footer class="fixed bottom-0 left-0 right-0 bg-[var(--color-bg)] border-t border-[var(--color-peach)]">
  <nav class="container mx-auto px-4 py-2 flex justify-between">
    {#each tabs as tab}
      <button
        class="flex flex-col items-center justify-center px-4 py-2 text-sm"
        class:text-[var(--color-peach)]={activeTab === tab.key}
        class:text-[var(--color-blue-light)]={activeTab !== tab.key}
        on:click={() => onTabChange(tab.key)}
      >
        <Icon src="{tab.icon}" size="20" />
        <span>{tab.label}</span>
      </button>
    {/each}
  </nav>
</footer>
