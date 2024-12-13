/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_walletWasmHash: string;
    readonly PUBLIC_nativeContractId: string;
    readonly PUBLIC_networkPassphrase: string;
    readonly PUBLIC_rpcUrl: string;
    readonly PUBLIC_launchtubeUrl: string;
    readonly PUBLIC_mercuryProjectName: string;
    readonly PUBLIC_mercuryUrl: string;
    
    readonly PRIVATE_launchtubeJwt: string
    readonly PRIVATE_mercuryJwt: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}