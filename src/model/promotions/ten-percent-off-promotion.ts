import { Promotion } from "./promotion.model";
import { Cart } from "../cart.model";
import { Item } from "../item.model";

export class TenPercentOffPromotion implements Promotion {
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
      const discountPercentage: number = 0.1;
      const newPrice: number = existingItem.price * (1 - discountPercentage);
      const newDiscountedItem: Item = {
        ...existingItem,
        price: newPrice,
        note: "10% Off Promotion Applied!!",
      };

      cart.remove(this.itemToDiscount.sku);
      cart.add(newDiscountedItem);
    }
  }
}
