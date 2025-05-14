<script lang="ts">
  export let demoApps: { name: string, url: string }[] = [];
</script>

<div>
  <h2 class="text-xl font-bold mb-4 text-[var(--color-peach)]">Demo Apps</h2>
  <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
    {#each demoApps as app}
      <a href={app.url} target="_blank" rel="noopener noreferrer" class="card glow flex flex-col items-center justify-center text-center transition-transform hover:scale-105">
        <span class="text-lg font-semibold mb-2 text-[var(--color-blue)]">{app.name}</span>
        <span class="text-xs text-[var(--color-blue-light)]">{app.url}</span>
      </a>
    {/each}
  </div>
</div> 