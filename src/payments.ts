import type { PayMethod } from "./site";

// Payment details sent ONLY in the order-confirmation email — never shown on the website.
// Fill these in before launch (README → "Before launch"). Lines in [brackets] are placeholders.
export const PAY_DETAILS: Record<PayMethod, { lines: string[] }> = {
  btc: { lines: ["Bitcoin (BTC) wallet: [BTC address]", "Network: Bitcoin mainnet", "We reply with the exact BTC amount at the current rate before you send."] },
  eth: { lines: ["Ethereum (ETH) wallet: [ETH address]", "Network: Ethereum mainnet (ERC-20)", "We reply with the exact ETH amount at the current rate before you send."] },
  usdt: { lines: ["USDT on TRC-20 (Tron): [TRC-20 address]", "USDT on ERC-20 (Ethereum): [ERC-20 address]", "Send the exact dollar total in USDT on one of these networks only."] },
  usdc: { lines: ["USDC on ERC-20 (Ethereum): [USDC address]", "Send the exact dollar total in USDC on Ethereum only."] },
  wire: { lines: ["Bank: [Bank name]", "Account name: [Account holder]", "Account number: [Account number]", "Routing (ABA) for ACH / domestic wire: [Routing number]", "SWIFT/BIC for international wires (Canada): [SWIFT code]", "Bank address: [Bank address]"] },
};
