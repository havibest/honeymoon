// ==========================================
// File: constants/payment-methods.ts
// ==========================================

export const PAYMENT_METHODS = {
  KENYA: {
    name: "NestLink M-Pesa",
    type: "mpesa",
  },
  REST_OF_WORLD: {
    name: "IntaSend Card",
    type: "card",
  },
};

export function getPaymentMethod(country: string) {
  if (country === "Kenya") {
    return PAYMENT_METHODS.KENYA;
  }
  return PAYMENT_METHODS.REST_OF_WORLD;
}
