import { Networks } from "@stellar/stellar-sdk";
import { SACClient } from "passkey-kit";

export const sac = new SACClient({
    rpcUrl: "https://soroban-testnet.stellar.org",
    networkPassphrase: Networks.TESTNET,
});

export const getContractSac = (contractId: string) => {
    sac.getSACClient(contractId)
} 