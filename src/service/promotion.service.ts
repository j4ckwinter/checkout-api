import { Promotion } from "../model";
import { Item } from "../model";
import { StockService } from "./stock.service";
import { ShoppingCart } from "../model/shopping-cart";
import { ThreeForTwoPromotion } from "../model/promotions/three-for-two-promotion";
import { FreeItemPromotion } from "../model/promotions/free-item-promotion";
import { TenPercentOffPromotion } from "../model/promotions/ten-percent-off-promotion";
import { Cart } from "../model/cart.model";

export class PromotionService {
  private promotions: Promotion[] = [];
  private stockService: StockService;

  constructor() {
    this.stockService = new StockService();
  }

  applyPromotions(items: Item[]): Cart {
    const cart: ShoppingCart = new ShoppingCart(this.stockService);
    items.forEach((item: Item) => cart.add(item));
    this.initialisePromotionRules();
    this.promotions.forEach((promotion: Promotion) => {
      if (promotion.isApplicable(cart)) {
        promotion.applyPromotion(cart);
      }
    });
    return cart;
  }

  private initialisePromotionRules(): void {
    this.promotions = [
      new FreeItemPromotion(
        this.stockService.findItemBySku("43N23P"),
        this.stockService.findItemBySku("234234")
      ),
      new ThreeForTwoPromotion(this.stockService.findItemBySku("120P90")),
      new TenPercentOffPromotion(this.stockService.findItemBySku("A304SD")),
    ];
  }
}
