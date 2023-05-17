import { ResponseItem } from "./response-item.model";

export interface CheckoutSuccess {
  success: true;
  items: ResponseItem[];
  cost: number;
}
