export const CheckoutStateType = {
  NotSent: "NotSent",
  Sending: "Sending",
  OrderReceived: "OrderReceived",
  OrderFailed: "OrderFailed",
} as const;

export type CheckoutStateType = typeof CheckoutStateType[keyof typeof CheckoutStateType];
