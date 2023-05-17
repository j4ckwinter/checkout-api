import { Item } from "./item.model";

export interface Cart {
  items: Item[];
  add: (item: Item) => void;
  remove(sku: String): void;
}
