import { ModuleType, type ModuleInterface, WalletNetwork } from "./types";
import { PasskeyKit } from "passkey-kit";
import { getContractId } from "../../site/src/lib/passkey";

export const SUPERPEACH_ID = 'superpeach';

export class SuperPeachModule implements ModuleInterface {
  moduleType: ModuleType;
  productId: string;
  productName: string;
  productUrl: string;
  productIcon: string;
  private popup: Window | null = null;
  private account: PasskeyKit;

  constructor() {
    this.moduleType = ModuleType.HOT_WALLET;
    this.productId = SUPERPEACH_ID;
    this.productName = 'SuperPeach';
    this.productUrl = 'http://localhost:4321';
    this.productIcon = 'https://superpeach.xyz/favicon_2.webp';
    window.addEventListener("message", this.messenger.bind(this));
    this.account = new PasskeyKit({
      rpcUrl: import.meta.env.PUBLIC_rpcUrl,
      networkPassphrase: import.meta.env.PUBLIC_networkPassphrase,
      walletWasmHash: import.meta.env.PUBLIC_walletWasmHash,
    });
  }

  async isAvailable() {
    return true;
  }

  async getAddress(params?: { path?: string }) {
    const address = localStorage.getItem('superpeach_address');
    if (!address) {
      await this.connect();
    }
    return { address: localStorage.getItem('superpeach_address') || '' };
  }

  async signTransaction(xdr: string, opts?: { networkPassphrase?: string; address?: string; path?: string; submit?: boolean; submitUrl?: string }) {
    // Implement signing logic here
    return { signedTxXdr: xdr };
  }

  async signAuthEntry(authEntry: string, opts?: { networkPassphrase?: string; address?: string; path?: string }) {
    // Implement signing logic here
    return { signedAuthEntry: authEntry };
  }

  async signMessage(message: string, opts?: { networkPassphrase?: string; address?: string; path?: string }) {
    // Implement signing logic here
    return { signedMessage: message };
  }

  async getNetwork() {
    return { network: 'mainnet', networkPassphrase: WalletNetwork.PUBLIC };
  }

  private async connect() {
    try {
      const keyId = localStorage.getItem("sp:keyId");
      if (keyId) {
        const wallet = await this.account.connectWallet({
          keyId,
          getContractId,
        });
        localStorage.setItem('superpeach_address', wallet.contractId);
        console.log(wallet.contractId);
      } else {
        const wallet = await this.account.createKey("Super Peach", "SuperPeach");
        const kid = wallet.keyId;
        const kidIdBase64 = wallet.keyIdBase64;

        const w = 400;
        const h = 500;
        const left = window.screenX + (window.outerWidth - w) / 2;
        const top = window.screenY + (window.outerHeight - h) / 2;

        const windowFeatures = `width=${w},height=${h},left=${left},top=${top},resizable=no,scrollbars=no,menubar=no,toolbar=no,location=no,status=no`;

        this.popup = window.open(
          `${this.productUrl}/add-signer?from=${encodeURIComponent(location.origin)}&keyId=${this.base64url(kid)}&publicKey=${this.base64url(wallet.publicKey)}`,
          "Super Peach",
          windowFeatures,
        );

        if (!this.popup) {
          alert("Popup was blocked by the browser.");
        } else {
          this.popup.focus();
        }

        localStorage.setItem("sp:keyId", kidIdBase64);
        console.log(kidIdBase64);
      }
    } catch(err: any) {
      return alert(err.message);
    }
  }

  private async messenger(event: MessageEvent<any>) {
    try {
      if (
        event.data.name === "superpeach" 
        && event.data.message === 'OK'
        && event.origin === this.productUrl
      ) {
        this.popup?.close();
        
        console.log(event);

        const wallet = await this.account.connectWallet({
          keyId: localStorage.getItem("sp:keyId") || '',
          getContractId
        });

        localStorage.setItem('superpeach_address', wallet.contractId);
        console.log(wallet.contractId);
      }
    } catch (err: any) {
      alert(err.message);
    }
  }

  private base64url(buffer: Buffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
} 