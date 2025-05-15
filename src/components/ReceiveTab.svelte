<script lang="ts">
  import { contractId } from "../store/contractId";
  import { get } from "svelte/store";
  import QRCode from 'qrcode';
  let qr_code: string = '';
  let copied = false;

  const walletAddress = get(contractId);

  async function genQrCode(data: string) {
    qr_code = await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'L',
      margin: 0,
    });
  }

  $: if (walletAddress) {
    genQrCode(walletAddress);
  }

  function copyAddress() {
    navigator.clipboard.writeText(walletAddress);
    copied = true;
    setTimeout(() => copied = false, 1200);
  }
</script>

<div class="flex flex-col items-center justify-center">
  <div class="card w-full max-w-md relative flex flex-col items-center">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-peach)]">Receive</h2>
    {#if walletAddress && qr_code}
      <img src={qr_code} alt="QR Code" class="mb-6" style="width:180px; height:180px;" />
      <div class="flex flex-col items-center w-full">
        <span class="font-mono text-lg break-all text-center mb-2">{walletAddress}</span>
        <button class="button-minimal w-full mb-2" on:click={copyAddress}>
          {#if copied}
            Copied!
          {:else}
            Copy Address
          {/if}
        </button>
      </div>
    {:else}
      <span class="text-[var(--color-pink)]">No address available</span>
    {/if}
  </div>
</div>