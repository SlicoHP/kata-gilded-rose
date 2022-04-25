export type Items = Item[];

export interface Item {
  name: string;
  sellIn: number;
  quality: number;
}

interface ItemAdjuster {
  item: Item;
  setItem: (item: Item) => void;
  decreaseQuality: () => void;
  increaseQuality: () => void;
  increaseQualityNearSellIn: () => void;
  getItemQualityRatio: () => number;
  sellInPassed: () => boolean;
  fixItemQuality: () => void;
}

const checkItem = (item: Item) => {
  itemAdjuster.setItem(item);
  itemAdjuster.fixItemQuality()
}

const itemAdjuster: ItemAdjuster = {
  item: {} as Item,
  setItem(item) {
    this.item = item;
  },
  decreaseQuality() {
    this.item.quality = Math.max(this.item.quality - this.getItemQualityRatio(), 0)
  },
  increaseQuality() {
    this.item.quality = Math.min(this.item.quality + this.getItemQualityRatio(), 50)
  },
  increaseQualityNearSellIn() {
    this.increaseQuality()
    if (this.item.sellIn < 10) this.increaseQuality()
    if (this.item.sellIn < 5) this.increaseQuality()
    if (this.sellInPassed()) this.item.quality = 0

    this.item.quality = Math.min(this.item.quality, 50)
  },
  getItemQualityRatio() {
    const quality = {
      ["Conjured Mana Cake"]: 2,
    }[this.item.name] || 1

    return this.sellInPassed() ? quality * 2 : quality
  },
  sellInPassed() {
    return this.item.sellIn < 0
  },
  fixItemQuality() {
    const items: any = {
      ["Aged Brie"]: () => {
        this.increaseQuality();
      },
      ["Backstage passes to a TAFKAL80ETC concert"]: () => {
        this.increaseQualityNearSellIn();
      },
      ["default"]: () => {
        this.decreaseQuality();
      }
    }
    return (items[this.item.name] || items['default'])();
  }
}

interface GildedRose {
  adjustQuality: (items: Items) => Items;
}

const adjustQuality = (items: Items): Items => {
  return items.map((item: Item) => {
    if (item.name == "Sulfuras, Hand of Ragnaros") return item;

    item.sellIn = item.sellIn - 1;

    checkItem(item)

    return item;
  });
};

const gildedRose: GildedRose = { adjustQuality };
export default gildedRose;
