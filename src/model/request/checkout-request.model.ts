import { Item } from "../item.model";

export interface CheckoutRequest {
  purchasedItems: Item[];
}
