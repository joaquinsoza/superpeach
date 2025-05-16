<script lang="ts">
  export let onLogout: () => void = () => {};
</script>

<header class="flex items-center justify-between px-8 py-4 bg-transparent w-full border-b border-[var(--color-peach)]">
  <div class="flex items-center gap-4 min-w-0">
    <img src="/favicon_2.webp" alt="SuperPeach Logo" style="width: 36px; height: 36px; border-radius: 50%;" />
    <span class="text-2xl font-bold whitespace-nowrap" style="color: var(--color-peach);">Super Peach</span>
  </div>
  <button class="button-minimal ml-4" on:click={onLogout}>Logout</button>
</header> 