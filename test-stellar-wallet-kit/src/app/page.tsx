'use client';

import Image from "next/image";
import { SUPERPEACH_ID, SuperPeachModule } from "../../../external/stellar-wallet-kit-module/superpeach.module";
import {
  StellarWalletsKit,
  WalletNetwork,
  ISupportedWallet
} from '@creit.tech/stellar-wallets-kit';

const kit: StellarWalletsKit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: SUPERPEACH_ID,
  modules: [
    new SuperPeachModule(),
  ],
});

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <button onClick={async () => {
          await kit.openModal({
            onWalletSelected: async (option: ISupportedWallet) => {
              kit.setWallet(option.id);
              const { address } = await kit.getAddress();
              console.log('Selected wallet address:', address);
              // Do something else
            }
          });
        }}>Connect</button>
        </main>
    </div>
  );
}
