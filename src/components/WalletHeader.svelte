<script lang="ts">
  export let onLogout: () => void = () => {};
</script>

<header class="flex items-center justify-between px-8 py-6 bg-transparent w-full">
  <div class="flex items-center gap-3">
    <img src="/favicon_2.webp" alt="SuperPeach Logo" style="width: 36px; height: 36px; border-radius: 50%;" />
    <span class="text-2xl font-bold" style="color: var(--color-peach);">SuperPeach Wallet</span>
  </div>
  <button class="button-minimal" on:click={onLogout}>Logout</button>
</header> 