<script lang="ts">
  import WalletHeader from './WalletHeader.svelte';
  import AssetList from './AssetList.svelte';
  import SendModal from './SendModal.svelte';
  import SwapModal from './SwapModal.svelte';
  import SignersTab from './SignersTab.svelte';
  import DemoAppsTab from './DemoAppsTab.svelte';
  import TabBar from './TabBar.svelte';
  import { onMount } from 'svelte';

  export let balances: { code: string, issuer?: string, balance: string }[] = [];
  export let signers: { key: string, kind?: string, expired?: boolean }[] = [];
  export let demoApps: { name: string, url: string }[] = [];
  export let onSend: (e: CustomEvent<any>) => void = () => {};
  export let onSwap: (e: CustomEvent<any>) => void = () => {};
  export let onAddSigner: (e: CustomEvent<any>) => void = () => {};
  export let onRemoveSigner: (e: CustomEvent<any>) => void = () => {};
  export let onLogout: () => void = () => {};

  let activeTab = 'balances';
  let showSend = false;
  let showSwap = false;
</script>

<div class="min-h-screen bg-[var(--color-bg)] flex flex-col">
  <WalletHeader {onLogout} />
  <TabBar {activeTab} on:change={e => activeTab = e.detail} />
  <main class="flex-1 flex flex-col items-center px-2 py-6">
    {#if activeTab === 'balances'}
      <div class="card w-full max-w-lg">
        <AssetList {balances} on:send={() => showSend = true} on:swap={() => showSwap = true} />
      </div>
    {/if}
    {#if activeTab === 'send'}
      <SendModal open={showSend} balances={balances} on:close={() => showSend = false} on:send={onSend} />
    {/if}
    {#if activeTab === 'swap'}
      <SwapModal open={showSwap} balances={balances} on:close={() => showSwap = false} on:swap={onSwap} />
    {/if}
    {#if activeTab === 'signers'}
      <SignersTab {signers} on:add={onAddSigner} on:remove={onRemoveSigner} />
    {/if}
    {#if activeTab === 'apps'}
      <DemoAppsTab {demoApps} />
    {/if}
  </main>
</div> 