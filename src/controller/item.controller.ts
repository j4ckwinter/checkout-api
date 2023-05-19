import { Item } from "../model";
import { ItemService } from "../service";
import { CheckoutSuccess } from "../model/response/checkout-success.model";
import { CheckoutFailureError } from "../error/checkout-failure-error";
import { CheckoutFailure } from "../model/response/checkout-failure.model";
import { CheckoutRequest } from "../model/request/checkout-request.model";

export class ItemController {
  private itemService: ItemService;
  constructor() {
    this.itemService = new ItemService();
  }

  getItems(): Item[] {
    return this.itemService.getItems();
  }

  checkout({ purchasedItems }: CheckoutRequest): CheckoutSuccess {
    const response: CheckoutSuccess | CheckoutFailure =
      this.itemService.checkout(purchasedItems);
    if (!response.success) {
      throw new CheckoutFailureError(response);
    }
    return response;
  }
}
