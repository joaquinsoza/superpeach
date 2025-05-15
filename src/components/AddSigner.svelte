<script lang="ts">
    import { contractId } from "../store/contractId";
    import { keyId } from "../store/keyId";
    import { onMount } from "svelte";
    import base64url from "base64url";
    import { connect, fund, getContractId, create, send } from "../lib/passkey";
    import { account } from "../lib/common-client";
    import Loader from "./Loader.svelte";
    import { SignerStore } from "passkey-kit";
    import type { AssembledTransaction } from "@stellar/stellar-sdk/minimal/contract";

    let url: URL;
    let params: URLSearchParams;
    let origin: string;
    let signerLimits: string | null;
    let publicKey: string;
    let signerKey: string;
    let signerKeyId: Buffer;
    let signerPublicKey: Buffer;
    let loaders = new Map();
    let added = false;

    keyId.subscribe(async (kid) => {
        try {
            if (kid && !account.keyId) {
                const { contractId: cid } = await account.connectWallet({
                    keyId: kid,
                    getContractId,
                });
                contractId.set(cid);
            }
        } catch (err: any) {
            alert(err.message);
        }
    });

    onMount(async () => {
        url = new URL(window.location.href);
        params = new URLSearchParams(url.search);

        if (params.size) {
            origin = decodeURIComponent(params.get("from")!);
            publicKey = params.get("publicKey")!;
            signerLimits = params.get("signerLimits");
            try {
                signerKey = params.get("keyId")!;
                signerKeyId = base64url.toBuffer(signerKey);
                signerPublicKey = base64url.toBuffer(publicKey);
            } catch {}
        }
    });

    async function onCreate() {
        loaders.set("create", true);
        loaders = loaders;

        try {
            await create();
            await fund($contractId);
        } finally {
            loaders.delete("create");
            loaders = loaders;
        }
    }
    async function onConnect() {
        loaders.set("connect", true);
        loaders = loaders;

        try {
            await connect();
        } finally {
            loaders.delete("connect");
            loaders = loaders;
        }
    }
    async function addSigner() {
        loaders.set("add", true);
        loaders = loaders;

        try {
            let at: AssembledTransaction<null>;

            try {
                at = await account.addSecp256r1(
                    signerKeyId,
                    signerPublicKey,
                    undefined,
                    SignerStore.Temporary,
                );
            } catch {
                at = await account.addEd25519(
                    publicKey,
                    signerLimits
                        ? new Map([[signerLimits, undefined]])
                        : undefined,
                    SignerStore.Temporary,
                );
            }

            await account.sign(at, { keyId: $keyId });
            const res = await send(at.built!.toXDR());

            console.log(res);

            window.opener?.postMessage(
                { name: "superpeach", message: "OK" },
                origin,
            );

            added = true;
        } catch (err: any) {
            alert(err.message);

            window.opener?.postMessage(
                { name: "superpeach", message: "ERROR" },
                origin,
            );

            added = false;
        } finally {
            loaders.delete("add");
            loaders = loaders;
        }
    }
    async function logout() {
        localStorage.removeItem("sp:keyId");
        window.location.reload();
    }
</script>

<header class="flex items-center justify-between px-8 py-4 bg-transparent w-full border-b border-[var(--color-peach)]">
  <div class="flex items-center gap-4 min-w-0">
    <img src="/favicon_2.webp" alt="SuperPeach Logo" style="width: 36px; height: 36px; border-radius: 50%;" />
    <span class="text-2xl font-bold whitespace-nowrap" style="color: var(--color-peach);">SuperPeach Wallet</span>
  </div>
  <button class="button-minimal ml-4" on:click={logout}>Logout</button>
</header>

<main class="flex flex-col items-center justify-center min-h-screen p-4">
    <div class="card w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-[var(--color-peach)]">Add Signer</h2>
        <table class="table-fixed w-full mb-4">
            <tbody>
                {#if $contractId}
                    <tr class="[&>td]:px-2">
                        <td class="bg-black/10">Contract:</td>
                        <td
                            >{$contractId.substring(0, 6)}...{$contractId.substring(
                                $contractId.length - 6,
                            )}</td
                        >
                    </tr>

                    {#if publicKey}
                        {#if signerKey && signerKeyId.length}
                            <tr class="[&>td]:px-2">
                                <td class="bg-black/10">Key:</td>
                                <td
                                    >{signerKey.substring(
                                        0,
                                        6,
                                    )}...{signerKey.substring(
                                        signerKey.length - 6,
                                    )}</td
                                >
                            </tr>
                        {:else}
                            <tr class="[&>td]:px-2">
                                <td class="bg-black/10">Key:</td>
                                <td
                                    >{publicKey.substring(
                                        0,
                                        6,
                                    )}...{publicKey.substring(
                                        publicKey.length - 6,
                                    )}</td
                                >
                            </tr>
                        {/if}

                        {#if signerLimits}
                            <tr class="[&>td]:px-2">
                                <td class="bg-black/10">Limits:</td>
                                <td
                                    >{signerLimits.substring(
                                        0,
                                        6,
                                    )}...{signerLimits.substring(
                                        signerLimits.length - 6,
                                    )}</td
                                >
                            </tr>
                        {/if}

                        <tr>
                            <td colspan="2">
                                {#if added}
                                    <span
                                        class="flex items-center justify-center bg-green-500 text-white px-2 py-1 uppercase text-sm w-full"
                                    >
                                        Signer added ✔︎
                                    </span>
                                {:else}
                                    <button
                                        class="button-minimal flex items-center justify-center px-2 py-1 uppercase text-sm w-full"
                                        style="background: var(--color-peach); color: var(--color-bg);"
                                        on:click={addSigner}
                                        >+ Add signer {#if loaders.get("add")}<Loader
                                                class="ml-2"
                                            />{/if}</button
                                    >
                                {/if}
                            </td>
                        </tr>
                    {/if}
                {:else}
                    <tr>
                        <td>
                            <button
                                class="flex items-center justify-center bg-black text-white px-2 py-1 uppercase text-sm w-full"
                                on:click={onCreate}
                                >+ Create new wallet {#if loaders.get("create")}<Loader
                                        class="ml-2"
                                    />{/if}</button
                            >
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button
                                class="flex items-center justify-center text-black px-2 py-1 uppercase text-sm w-full"
                                on:click={onConnect}
                                >+ Connect existing wallet {#if loaders.get("connect")}<Loader
                                        class="ml-2"
                                    />{/if}</button
                            >
                        </td>
                    </tr>
                {/if}
            </tbody>
        </table>
    </div>
</main>

<style>
    table,
    th,
    td {
        border: 1px solid black;
        border-collapse: collapse;
    }
</style>
