// ==========================================
// File: utils/currency.ts
// ==========================================

export function getCurrency(country: string): string {
  if (country === "Kenya") return "KES";
  if (country === "Uganda") return "UGX";
  if (country === "Tanzania") return "TZS";
  if (country === "United States") return "USD";
  if (country === "Canada") return "CAD";
  if (country === "United Kingdom") return "GBP";
  if (
    country === "Germany" ||
    country === "France" ||
    country === "Italy" ||
    country === "Spain"
  ) {
    return "EUR";
  }
  if (country === "Australia") return "AUD";
  return "USD";
}

export function getMembershipPrice(country: string): number {
  if (country === "Kenya") return 180;
  if (country === "Uganda") return 5000;
  if (country === "Tanzania") return 3500;
  if (country === "Canada" || country === "Australia") return 3;
  return 2; // Default for USD, GBP, EUR
}
