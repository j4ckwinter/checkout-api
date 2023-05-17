import { Item } from "../model";
import { PromotionService } from "./promotion.service";
import { StockService } from "./stock.service";
import { ITEM_LIST } from "../model";
import { CheckoutSuccess } from "../model/response/checkout-success.model";
import { CheckoutFailure } from "../model/response/checkout-failure.model";
import { FailureDetails } from "../model/response/failure-details.model";
import { Cart } from "../model/cart.model";
import { ResponseItem } from "../model/response/response-item.model";

export class ItemService {
  private items: Item[];
  private itemPromotionService: PromotionService;
  private stockService: StockService;

  constructor() {
    this.items = ITEM_LIST();
    this.itemPromotionService = new PromotionService();
    this.stockService = new StockService();
  }

  checkout(purchasedItems: Item[]): CheckoutSuccess | CheckoutFailure {
    const noStockDetails: FailureDetails[] =
      this.stockService.checkStock(purchasedItems);
    if (noStockDetails.length) {
      return {
        details: noStockDetails,
        success: false,
      };
    } else {
      const cart: Cart =
        this.itemPromotionService.applyPromotions(purchasedItems);
      const cost: number = Number(
        cart.items
          .reduce(
            (total: number, item: Item) => total + item.price * item.quantity,
            0
          )
          .toFixed(2)
      );
      this.stockService.removeItemsFromStock(cart);
      return {
        items: cart.items.map((item: ResponseItem) => ({
          sku: item.sku,
          name: item.name,
          quantity: item.quantity,
          note: item.note,
        })),
        cost,
        success: true,
      };
    }
  }

  getItems(): Item[] {
    return this.stockService.getItems();
  }
}
