# Super Peach x Stellar Wallets Kit Integration

## 🚀 Overview

This project enhances **Super Peach**, a passkey-based smart wallet for the Stellar blockchain, by integrating it into the **Stellar Wallets Kit** — a modular wallet connection system similar to RainbowKit on Ethereum.

Our goal is to enable **any Stellar dApp** to onboard users with:
- 🔐 **Passkeys & Biometrics** (no extensions or seed phrases)
- 🔁 **Consistent Wallet Address** across dApps
- 🧾 **Gasless Transactions** via LaunchTube
- ⚡ Plug-and-play dev experience using **stellar-react**

## 🛠️ Getting Started

### Running the Super Peach Wallet

```bash
# Clone the repository
git clone https://github.com/joaquinsoza/superpeach.git
cd superpeach

# Install dependencies
cp .env.example .env
pnpm i

# Start the development server
pnpm run dev
```

### Running the Test dApp (Next.js with Stellar Wallets Kit)

```bash
# Navigate to the demo directory
cd demo-next

# Install dependencies
pnpm i

# Start the development server
pnpm run dev
```

## 🧠 The Problem

- Passkeys create a new wallet per origin by default, causing fragmentation.
- Traditional wallets require installing extensions and managing secret keys.
- Stellar dApps lack a smooth onboarding flow for non-crypto-native users.

## ✅ The Solution

### 🔧 What We Built

- A **modern frontend** for Super Peach to manage accounts and sign transactions.
- A **Wallets Kit module** that adds Super Peach as a provider.
- Integration with **stellar-react**, our TypeScript SDK for Stellar smart contracts.
- Initial support for **gasless txs** via LaunchTube.

With this, dApps using Wallets Kit can now offer Super Peach as a connect option — giving users a seamless, Web2-like login experience using just biometrics.

## 🧪 Technical Highlights

- Uses `WebAuthn` (passkeys) + `SEP-30` to abstract key management.
- Maintains a **persistent wallet address** across origins.
- Fully extensionless: no browser plugins or seed phrases required.
- Compatible with `stellar-react` → send contract calls from passkey wallets.
- LaunchTube integration allows **meta-transactions** (gasless UX).

## 📍 Next Steps

- Finalize transaction signing flow
- Submit official PR to Stellar Wallets Kit repo
- Expand LaunchTube support in `stellar-react`
- Work with dApps to adopt passkey login as a standard onboarding flow

## 🤝 Credits

- Built on top of [Super Peach](https://github.com/kalepail/super-peach) by [@kalepail](https://github.com/kalepail)
- Developed by Joaquín Soza (@joacosoza) – PaltaLabs / Soroswap / DeFindex

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
