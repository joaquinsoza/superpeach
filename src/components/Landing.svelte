<script lang="ts">
  export let onCreate: () => void;
  export let onConnect: () => void;
</script>

<div class="flex flex-col md:flex-row min-h-screen bg-[var(--color-bg)]">
  <div class="flex flex-col justify-center items-center flex-1 px-8 py-12">
    <h1 class="text-4xl font-bold mb-2" style="color: var(--color-peach);">SuperPeach Wallet</h1>
    <p class="text-lg mb-8 text-[var(--color-blue-light)]">A beautiful, secure Stellar wallet powered by passkeys</p>
    <div class="flex flex-col gap-4 w-full max-w-xs">
      <button class="button-minimal w-full" on:click={onCreate}>
        + Create New Wallet
      </button>
      <button class="button-minimal w-full" on:click={onConnect}>
        + Connect Existing Wallet
      </button>
    </div>
    <footer class="mt-12 text-xs text-[var(--color-glow2)] opacity-80">Powered by Stellar + Passkeys</footer>
  </div>
  <div class="hidden md:flex flex-1 items-center justify-center bg-cover bg-center" style="background-image: url('/meta.webp'); min-height: 400px;">
    <!-- The image is set as a background for better cover/contain -->
  </div>
</div> 