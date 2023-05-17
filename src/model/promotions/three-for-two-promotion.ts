import { Promotion } from "./promotion.model";
import { Cart } from "../cart.model";
import { Item } from "../item.model";

export class ThreeForTwoPromotion implements Promotion {
  constructor(private itemToDiscount: Item) {}

  isApplicable(cart: Cart): boolean {
    return cart.items.some(
      (item: Item) => item.sku === this.itemToDiscount.sku && item.quantity >= 3
    );
  }

  applyPromotion(cart: Cart): void {
    const existingItem: Item | undefined = cart.items.find(
      (item: Item) => item.sku === this.itemToDiscount.sku
    );

    if (existingItem) {
      const quantityToPayFor: number =
        Math.floor(existingItem.quantity / 3) * 2;
      const individualPrice: number =
        (existingItem.price * quantityToPayFor) / existingItem.quantity;

      const newDiscountedItem: Item = {
        ...existingItem,
        quantity: existingItem.quantity,
        price: individualPrice,
        note: "3 for 2 Promotion Applied!!",
      };

      cart.remove(this.itemToDiscount.sku);
      cart.add(newDiscountedItem);
    }
  }
}
