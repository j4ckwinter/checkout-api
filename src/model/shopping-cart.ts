import { Item } from "./item.model";
import { Cart } from "./cart.model";
import { StockService } from "../service";

export class ShoppingCart implements Cart {
  items: Item[];

  constructor(private stockService: StockService) {
    this.items = [];
  }

  add(item: Item): void {
    const existingStockAmount: number | undefined =
      this.stockService.getItemQuantity(item);

    if (existingStockAmount) {
      if (item.quantity <= existingStockAmount) {
        this.items.push(item);
      } else {
        this.items.push({
          ...item,
          quantity: existingStockAmount,
        });
      }
    }
  }

  remove(sku: string): void {
    const index: number = this.items.findIndex(
      (item: Item) => item.sku === sku
    );
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
