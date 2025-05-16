import { PasskeyKit } from 'passkey-kit';
import { ModuleType, type ModuleInterface } from '@creit.tech/stellar-wallets-kit';
import { getContractId } from './templib/passkey';
import base64url from 'base64url';
import { Networks, xdr } from '@stellar/stellar-sdk';

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
    this.productName = 'Super Peach';
    this.productUrl = 'http://localhost:4321';
    this.productIcon = 'https://superpeach.xyz/favicon_2.webp';
    this.account = new PasskeyKit({
      rpcUrl: 'https://soroban-testnet.stellar.org',
      networkPassphrase: Networks.PUBLIC,
      walletWasmHash: 'ecd990f0b45ca6817149b6175f79b32efb442f35731985a084131e8265c4cd90',
    });
  }

  async isAvailable() {
    return true;
  }

  async getAddress() {
    const address = localStorage.getItem('superpeach_address');
    if (!address) {
      await this.connect();
    }
    return { address: localStorage.getItem('superpeach_address') || '' };
  }

  async signTransaction(
    xdr: string,
  ) {
    const keyId = localStorage.getItem('sp:keyId');

    if (!keyId) {
      throw new Error('Key ID is required');
    }

    console.log('🚀 | signTransaction | keyId:', keyId);
    console.log('XDR', xdr);


    const signedTx = await this.account.sign(xdr, {
      keyId: keyId,
    });
    
    console.log('🚀 | signTransaction | signedTx:', signedTx);

    return { signedTxXdr: 'signedTx.built!.toXDR()' };
  }

  async signAuthEntry(authEntry: string) {
    const keyId = localStorage.getItem('sp:keyId');

    if (!keyId) {
      throw new Error('Key ID is required');
    }

    const signedAuthEntry = await this.account.signAuthEntry(authEntry as unknown as xdr.SorobanAuthorizationEntry, { keyId: keyId });

    return { signedAuthEntry: signedAuthEntry as unknown as string };
  }

  async signMessage(): Promise<{ signedMessage: string; signerAddress?: string }> {
    throw {
      code: -3,
      message: 'Super Peach does not support the "signMessage" function',
    };
  }

  async getNetwork(): Promise<{ network: string; networkPassphrase: string }> {
    throw {
      code: -3,
      message: 'Super Peach does not support the "getNetwork" function',
    };
  }

  private async connect() {
    try {
      // const wallet = await this.account.connectWallet({
      //   getContractId
      // });
      // console.log("🚀 | connect | wallet:", wallet)
      // localStorage.setItem('superpeach_address', wallet.contractId);

      const keyId = localStorage.getItem('sp:keyId');
      if (keyId) {
        const wallet = await this.account.connectWallet({
          getContractId,
        });
        localStorage.setItem('superpeach_address', wallet.contractId);
      } else {
        const wallet = await this.account.createKey('Super Peach', 'SuperPeach');
        const kid = wallet.keyId;
        const kidIdBase64 = wallet.keyIdBase64;

        const w = 400;
        const h = 500;
        const left = window.screenX + (window.outerWidth - w) / 2;
        const top = window.screenY + (window.outerHeight - h) / 2;

        const windowFeatures = `width=${w},height=${h},left=${left},top=${top},resizable=no,scrollbars=no,menubar=no,toolbar=no,location=no,status=no`;

        this.popup = window.open(
          `${this.productUrl}/add-signer?from=${encodeURIComponent(location.origin)}&keyId=${base64url(kid)}&publicKey=${base64url(wallet.publicKey)}`,
          'Super Peach',
          windowFeatures
        );

        if (!this.popup) {
          alert('Popup was blocked by the browser.');
        } else {
          this.popup.focus();
        }

        localStorage.setItem('sp:keyId', kidIdBase64);

        // this.popup?.close();
        const connectedWallet = await this.account.connectWallet({
          keyId: localStorage.getItem('sp:keyId') || '',
          getContractId,
        });
        localStorage.setItem('superpeach_address', connectedWallet.contractId);
      }
    } catch (err) {
      return alert((err as Error).message);
    }
  }
}
