import {Item, Status} from "./types.d";

/*
* filterItems removes items from a list according to state conditions
*/
export const filterItems = (items: Item[], status: Status): Item[] => {
  const filteredItems = items?.filter(item => {
    // includeIn condition has the highest priority
    if (item.includeIn) {
      return status[item.includeIn];
    }
    // excludeFrom condition has less priority
    if (item.excludeFrom) {
      return !status[item.excludeFrom];
    }
    // default
    return true;
  });

  return filteredItems;
};


export const highlightActiveItem = (items: Item[], path: string): Item[] => {
  return items.map(item => {
    return {...item,
      isHighlighted: item.href === path };
  });
};
