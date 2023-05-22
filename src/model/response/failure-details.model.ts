import { FailureMessage } from "./failure-message.enum";

export interface FailureDetails {
  message: FailureMessage;
  sku: string;
  name: string;
  reqQuantity: number;
  existQuantity: number;
}
