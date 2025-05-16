<script lang="ts">
  export let signers: { key: string, kind?: string, expired?: boolean }[] = [];
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let newSigner = '';

  function handleAdd() {
    if (newSigner.trim()) {
      dispatch('add', newSigner.trim());
      newSigner = '';
    }
  }
</script>

<div>
  <h2 class="text-xl font-bold mb-4 text-[var(--color-peach)]">Signers</h2>
  <ul class="mb-4">
    {#each signers as signer}
      <li class="flex items-center justify-between py-2 border-b border-[var(--color-blue-light)] last:border-b-0">
        <div class="flex flex-col">
          <span class="font-semibold">{signer.key.slice(0, 6)}...{signer.key.slice(-6)}</span>
          {#if signer.kind}
            <span class="text-xs text-[var(--color-blue-light)]">{signer.kind}</span>
          {/if}
          {#if signer.expired}
            <span class="text-xs text-[var(--color-pink)]">Expired</span>
          {/if}
        </div>
        <button class="button-minimal px-3 py-1 text-xs" on:click={() => dispatch('remove', signer.key)}>Remove</button>
      </li>
    {/each}
  </ul>
  <div class="flex gap-2 items-center">
    <input class="flex-1" type="text" placeholder="Add signer key..." bind:value={newSigner} />
    <button class="button-minimal px-4 py-2 text-sm" on:click={handleAdd}>Add</button>
  </div>
</div> 