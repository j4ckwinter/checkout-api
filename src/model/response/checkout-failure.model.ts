import { FailureDetails } from "./failure-details.model";

export interface CheckoutFailure {
  success: false;
  details: FailureDetails[];
}
