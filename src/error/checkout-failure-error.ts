import { CheckoutFailure } from "../model/response/checkout-failure.model";

export class CheckoutFailureError extends Error {
  response: CheckoutFailure;

  constructor(response: CheckoutFailure) {
    super("Checkout failed");
    this.name = "Checkout Failure Error";
    this.response = response;
  }
}
