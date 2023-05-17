import { Item } from "./item.model";

export const ITEM_LIST: () => Item[] = (): Item[] => {
  return require("../config/items.json");
};
