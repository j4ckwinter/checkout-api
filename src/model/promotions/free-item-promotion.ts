import { Item } from "../item.model";
import { Promotion } from "./promotion.model";
import { Cart } from "../cart.model";

export class FreeItemPromotion implements Promotion {
  constructor(private itemToProvide: Item, private freeItem: Item) {}

  isApplicable(cart: Cart): boolean {
    return cart.items.some(
      (item: Item) => item.sku === this.itemToProvide.sku && item.quantity > 0
    );
  }

  applyPromotion(cart: Cart): void {
    const itemToProvide: Item | undefined = cart.items.find(
      (item: Item) => item.sku === this.itemToProvide.sku
    );
    const freeItem: Item | undefined = cart.items.find(
      (item: Item) => item.sku === this.freeItem.sku
    );

    if (itemToProvide) {
      if (freeItem && itemToProvide.quantity >= freeItem.quantity) {
        // If the quantity of itemToProvide is the same or more than the quantity of freeItem
        cart.remove(freeItem.sku); // Remove the existing freeItem from the cart

        const newDiscountedItem: Item = {
          ...this.freeItem,
          price: 0,
          quantity: itemToProvide.quantity,
          note: `Buy one ${this.itemToProvide.name}, get one ${this.freeItem.name} for free promotion applied!`,
        };

        cart.add(newDiscountedItem); // Add the new free item with the same quantity as itemToProvide
      } else if (freeItem && itemToProvide.quantity < freeItem.quantity) {
        // If the quantity of itemToProvide is less than the quantity of freeItem
        cart.remove(freeItem.sku); // Remove the existing freeItem from the cart
        const newDiscountedItem: Item = {
          ...this.freeItem,
          price: (freeItem.quantity - itemToProvide.quantity) * freeItem.price,
          quantity: freeItem.quantity,
          note: `Buy one ${this.itemToProvide.name}, get one ${this.freeItem.name} for free promotion applied!`,
        };

        cart.add(newDiscountedItem); // Add the new free item with adjusted price and the original quantity
      } else if (!freeItem) {
        const newDiscountedItem: Item = {
          ...this.freeItem,
          price: 0,
          quantity: itemToProvide.quantity,
          note: `Buy one ${this.itemToProvide.name}, get one ${this.freeItem.name} for free promotion applied!`,
        };

        cart.add(newDiscountedItem);
      }
    }
  }
}
