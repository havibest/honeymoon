// ==========================================
// File: services/referral.service.ts
// ==========================================

export function generateReferralCode(): string {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();
}

export function generateReferralLink(code: string): string {
  return `https://honeymoon.co.ke{code}`;
}

export async function copyReferralLink(link: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(link);
    alert("Referral link copied to clipboard!");
  } catch (error) {
    console.error("Could not copy link:", error);
  }
}
