<script lang="ts">
    import Landing from './Landing.svelte';
    import WalletDashboard from './WalletDashboard.svelte';
    import '../styles/theme.css';
    import { contractId } from "../store/contractId";
    import { keyId } from "../store/keyId";
    import {
        connect,
        fund,
        create,
        send,
        getContractId,
        getSigners,
    } from "../lib/passkey";
    import { account, native } from "../lib/common-client";
    import Loader from "./Loader.svelte";
    import { SignerKey } from "passkey-kit";
    import type { AssembledTransaction } from "@stellar/stellar-sdk/minimal/contract";
    import { StrKey } from "@stellar/stellar-sdk/minimal";

    let loaders = new Map();
    let balance: string = "0";
    let signers: {
		kind: string;
		key: string;
		val: string;
		limits: string;
		expired?: boolean;
	}[] = [];
    let balances = [
      { code: 'XLM', balance: '0' }
    ];
    let demoApps = [
      { name: 'minipeach-a.pages.dev', url: 'https://minipeach-a.pages.dev/' },
      { name: 'minipeach-b.pages.dev', url: 'https://minipeach-b.pages.dev/' }
    ];

    keyId.subscribe(async (kid) => {
        try {
            if (kid && !account.keyId) {
                const { contractId: cid } = await account.connectWallet({
                    keyId: kid,
                    getContractId,
                });
                contractId.set(cid);
                await onGetBalance();
                await onGetSigners();
            }
        } catch (err: any) {
            alert(err.message);
        }
    });

    async function onCreate() {
        loaders.set("create", true);
        loaders = loaders;
        try {
            await create();
            await fund($contractId);
            await onGetBalance();
            await onGetSigners();
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
            await onGetBalance();
            await onGetSigners();
        } finally {
            loaders.delete("connect");
            loaders = loaders;
        }
    }
    async function onFund() {
        loaders.set("fund", true);
        loaders = loaders;
        try {
            await fund($contractId);
            await onGetBalance();
        } finally {
            loaders.delete("fund");
            loaders = loaders;
        }
    }
    async function onGetBalance() {
        loaders.set("balance", true);
        loaders = loaders;
        try {
            const { result } = await native.balance({ id: $contractId });
            balance = result.toString();
            balances = [
              { code: 'XLM', balance: (Number(balance) / 10_000_000).toFixed(7) }
            ];
            console.log(balance);
        } finally {
            loaders.delete("balance");
            loaders = loaders;
        }
    }
    async function onGetSigners() {
        loaders.set("signers", true);
        loaders = loaders;
        try {
            signers = await getSigners($contractId);
            console.log(signers);
        } finally {
            loaders.delete("signers");
            loaders = loaders;
        }
    }
    async function onRemoveSigner(e: CustomEvent<string>) {
        const signer = e.detail;
        loaders.set(signer, true);
        loaders = loaders;
        try {
            let at: AssembledTransaction<null>;
            if (StrKey.isValidEd25519PublicKey(signer)) {
                at = await account.remove(SignerKey.Ed25519(signer)) 
            } else {
                at = await account.remove(SignerKey.Secp256r1(signer)) 
            }
            await account.sign(at, { keyId: $keyId });
            const res = await send(at.built!.toXDR());
            console.log(res);
            await onGetSigners();
        } catch (err: any) {
            alert(err.message);
        } finally {
            loaders.delete(signer);
            loaders = loaders;
        }
    }
    async function onAddSigner(e: CustomEvent<string>) {
        // Implement add signer logic here
        alert('Add signer: ' + e.detail);
    }
    async function onSend(e: CustomEvent<{ recipient: string, amount: string, asset: string }>) {
        // Implement send logic here
        alert('Send: ' + JSON.stringify(e.detail));
    }
    async function onSwap(e: CustomEvent<{ recipient: string, amount: string, asset: string }>) {
        // Implement swap logic here
        alert('Swap: ' + JSON.stringify(e.detail));
    }
    function logout() {
        localStorage.removeItem("sp:keyId");
        window.location.reload();
    }
</script>

{#if !$contractId || !$keyId}
  <Landing onCreate={onCreate} onConnect={onConnect} />
{:else}
  <WalletDashboard
    {balances}
    {signers}
    {demoApps}
    on:send={onSend}
    on:swap={onSwap}
    on:addSigner={onAddSigner}
    on:removeSigner={onRemoveSigner}
    onLogout={logout}
  />
{/if}

<style>
    table,
    th,
    td {
        border: 1px solid black;
        border-collapse: collapse;
    }
</style>
