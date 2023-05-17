import { Cart } from "../cart.model";

export interface Promotion {
  isApplicable: (cart: Cart) => boolean;
  applyPromotion: (cart: Cart) => void;
}
