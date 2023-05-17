import { Item, ITEM_LIST } from "../model";
import { FailureDetails } from "../model/response/failure-details.model";
import { FailureMessage } from "../model/response/failure-message.enum";
import { Cart } from "../model/cart.model";

export class StockService {
  private items: Item[];

  constructor() {
    this.items = ITEM_LIST();
  }

  getItems(): Item[] {
    return this.items;
  }

  checkStock(purchasedItems: Item[]): FailureDetails[] {
    return purchasedItems.flatMap((item: Item) => {
      const stockItem: Item | undefined = this.items.find(
        (stockItem: Item) => stockItem.sku === item.sku
      );
      const exisQuantity: number = stockItem?.quantity ?? 0;

      if (!stockItem) {
        return [
          {
            message: FailureMessage.NO_ITEM,
            sku: item.sku,
            name: item.name,
            reqQuantity: item.quantity,
            exisQuantity,
          },
        ];
      }

      if (item.quantity > exisQuantity) {
        return [
          {
            message: FailureMessage.NO_STOCK,
            sku: item.sku,
            name: item.name,
            reqQuantity: item.quantity,
            exisQuantity,
          },
        ];
      }

      return [];
    });
  }

  getItemQuantity(newItem: Item | undefined): number | undefined {
    if (newItem) {
      const quantity: number = this.findItemBySku(newItem.sku)?.quantity;
      if (quantity) {
        return quantity;
      }
    }
  }

  removeItemsFromStock(cart: Cart): void {
    cart.items.forEach((cartItem: Item) => {
      const itemToUpdate: Item = this.findItemBySku(cartItem.sku);
      if (itemToUpdate) {
        itemToUpdate.quantity -= cartItem.quantity;
      }
    });
  }

  findItemBySku(sku: string): Item {
    const item: Item | undefined = this.items.find(
      (item: Item) => item.sku === sku
    );
    return item || ({} as Item);
  }
}
