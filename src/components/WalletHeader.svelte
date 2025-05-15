<script lang="ts">
  export let activeTab: string = 'balances';
  export let onTabChange: (tab: string) => void = () => {};
  export let onLogout: () => void = () => {};

  const tabs = [
    { key: 'balances', label: 'Balances' },
    { key: 'send', label: 'Send' },
    { key: 'receive', label: 'Receive' },
    { key: 'swap', label: 'Swap' },
    { key: 'signers', label: 'Signers' },
    { key: 'apps', label: 'Apps' },
  ];
</script>

<header class="flex items-center justify-between px-8 py-4 bg-transparent w-full border-b border-[var(--color-peach)]">
  <div class="flex items-center gap-4 min-w-0">
    <img src="/favicon_2.webp" alt="SuperPeach Logo" style="width: 36px; height: 36px; border-radius: 50%;" />
    <span class="text-2xl font-bold whitespace-nowrap" style="color: var(--color-peach);">SuperPeach Wallet</span>
    <nav class="flex gap-1 ml-6">
      {#each tabs as tab}
        <button
          class="button-minimal px-4 py-2 text-base font-medium border-0 rounded-full"
          class:bg-[var(--color-peach)]={activeTab === tab.key}
          class:text-white={activeTab === tab.key}
          style="background: {activeTab === tab.key ? 'var(--color-peach)' : 'transparent'}; color: {activeTab === tab.key ? 'var(--color-bg)' : 'var(--color-peach)'};"
          on:click={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      {/each}
    </nav>
  </div>
  <button class="button-minimal ml-4" on:click={onLogout}>Logout</button>
</header> 