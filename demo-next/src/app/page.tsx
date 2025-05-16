"use client";

import { useState } from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  ISupportedWallet,
  allowAllModules,
} from "@creit.tech/stellar-wallets-kit";
import { Address, Keypair, nativeToScVal, Networks, scValToNative, xdr } from "@stellar/stellar-sdk";
import { AssembledTransaction } from "@stellar/stellar-sdk/minimal/contract";
import { PasskeyKit } from "passkey-kit";
import { SUPERPEACH_ID, SuperPeachModule } from "../module/superpeach.module";

export default function Home() {
  const [kit] = useState(
    () =>
      new StellarWalletsKit({
        network: WalletNetwork.TESTNET,
        selectedWalletId: SUPERPEACH_ID,
        modules: [...allowAllModules(),new SuperPeachModule()],
      })
  );
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    try {
      await kit.openModal({
        onWalletSelected: async (option: ISupportedWallet) => {
          console.log("Wallet selected:", option);
          kit.setWallet(option.id);
          const { address } = await kit.getAddress();
          setWalletAddress(address);
        },
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleDisconnect = () => {
    kit.disconnect();
    setWalletAddress(null);
  };

  // const server = new rpc.Server("https://soroban-testnet.stellar.org");

  async function performSwap() {
    try {
      const keypair = Keypair.fromPublicKey("GA537CK4DMVPXLPLEDWIONVKF6ASMGZU53U4GIIKUBP2D6OJJYX2GE4Y");
      // const account = await server.getAccount(keypair.publicKey());
      // First get the access token
      const swapRequest = {
        assetIn: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
        assetOut: "CACOCATSZBZCQAHFGYMRCCMS3O6QAZ5NRZAFKSDTECXUH6UYPX24PJGY",
        amount: "10000000",
      };

      // const contract = new Contract("CACIQ6HWPBEMPQYKRRAZSM6ZQORTBTS7DNXCRTI6NQYMUP2BHOXTBUVD")

      const path = [
        swapRequest.assetIn,
        swapRequest.assetOut,
      ]

      // const operation = contract.call("swap_exact_tokens_for_tokens", ...[
      //   nativeToScVal(swapRequest.amount, {type: "i128"}),
      //   nativeToScVal(0, {type: "i128"}),
      //   nativeToScVal(path.map((pathAddress) => new Address(pathAddress))),
      //   nativeToScVal(walletAddress, {type: "address"}),
      //   nativeToScVal(Math.floor(Date.now() / 1000) + 3600, { type: 'u64' })
      // ])

      // const txBuilder = new TransactionBuilder(account, {
      //   fee: BASE_FEE,
      //   timebounds: { minTime: 0, maxTime: 0 },
      //   networkPassphrase: Networks.TESTNET
      // })

      // txBuilder.addOperation(operation)

      // const tx = txBuilder.build();

      // const simulationResponse = await server.simulateTransaction(tx);

      // const assembledTransaction = rpc.assembleTransaction(
      //   tx,
      //   simulationResponse
      // );
      const account = new PasskeyKit({
        rpcUrl: 'https://soroban-testnet.stellar.org',
        networkPassphrase: Networks.PUBLIC,
        walletWasmHash: 'ecd990f0b45ca6817149b6175f79b32efb442f35731985a084131e8265c4cd90',
      });


      // const prepped_tx = assembledTransaction.build();

      const assembledTx = await AssembledTransaction.build({
        method: 'swap_exact_tokens_for_tokens',
        args: [
          nativeToScVal(swapRequest.amount, {type: "i128"}),
          nativeToScVal(0, {type: "i128"}),
          nativeToScVal(path.map((pathAddress) => new Address(pathAddress))),
          nativeToScVal(walletAddress, {type: "address"}),
          nativeToScVal(Math.floor(Date.now() / 1000) + 3600, { type: 'u64' })
        ],
        contractId: 'CACIQ6HWPBEMPQYKRRAZSM6ZQORTBTS7DNXCRTI6NQYMUP2BHOXTBUVD',
        networkPassphrase: Networks.TESTNET,
        rpcUrl: 'https://soroban-testnet.stellar.org',
        publicKey: keypair.publicKey(),
        parseResultXdr: (result: xdr.ScVal) =>
          scValToNative(result),
      })

      const signedtx = await account.sign(assembledTx, {
        keyId: localStorage.getItem('sp:keyId')!,
      })





      console.log("🚀 | performSwap | signedtx:", signedtx)


      
      // const tx = await passkeyServer.send(assembledTx)
      // console.log("🚀 | performSwap | tx:", tx)

      // const signedTxRaw = await kit.signTransaction(assembledTx, {
      //   address: walletAddress!,
      //   networkPassphrase: WalletNetwork.TESTNET,
      // });
      // console.log("🚀 | signedTxRaw | signedTxRaw:", signedTxRaw);

      // const response = await server.sendTransaction(prepped_tx);
      // const status = response.status;

      // let txResponse;
      // while (status === "PENDING") {
      //     await new Promise((resolve) => setTimeout(resolve, 2000));
      //     console.log("waiting for tx...");
      //     txResponse = await server.getTransaction(tx_hash);

      //     if (txResponse.status === "SUCCESS") {
      //     console.log("Transaction successful");
      //     break;
      //     }
      // }
      // return txResponse;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">

      {!walletAddress ? (
        <button
          onClick={handleConnectWallet}
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-base h-12 px-5"
        >
          Connect Stellar Wallet
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="bg-black/[.05] dark:bg-white/[.06] px-4 py-2 rounded-lg font-mono">
            {walletAddress}
          </div>
          <button
            onClick={handleDisconnect}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-base h-12 px-5"
          >
            Disconnect
          </button>
      <button onClick={performSwap}>Swap</button>

        </div>
      )}
    </div>
  );
}
