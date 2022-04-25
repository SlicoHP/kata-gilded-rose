import GildedRose from "../src/gilded_rose";

describe("Gilded Rose", () => {
  let name: string;

  describe("Normal Item", () => {
    beforeEach(() => {
      name = "Normal Item";
    });

    it("updates when before sell date", () => {
      const sellIn = 5;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality - 1);
    });

    it("updates when on sell date", () => {
      const sellIn = 0;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality - 2);
    });

    it("updates when after sell date", () => {
      const sellIn = -10;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality - 2);
    });

    it("updates when of zero quality", () => {
      const sellIn = 5;
      const quality = 0;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(0);
    });
  });

  describe("Aged Brie", () => {
    beforeEach(() => {
      name = "Aged Brie";
    });

    it("updates when before sell date", () => {
      const sellIn = 5;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality + 1);
    });

    it("updates when before sell date with max quality", () => {
      const sellIn = 5;
      const quality = 50;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality);
    });

    it("updates when on sell date", () => {
      const sellIn = 0;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality + 2);
    });

    it("updates when on sell date near max quality", () => {
      const sellIn = 0;
      const quality = 49;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(50);
    });

    it("updates when on sell date with max quality", () => {
      const sellIn = 0;
      const quality = 50;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality);
    });

    it("updates when after sell date", () => {
      const sellIn = -10;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality + 2);
    });

    it("updates when after sell date", () => {
      const sellIn = -10;
      const quality = 50;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality);
    });
  });

  describe("Sulfuras", () => {
    beforeEach(() => {
      name = "Sulfuras, Hand of Ragnaros";
    });

    it("updates when before sell date", () => {
      const sellIn = 5;
      const quality = 80;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn);
      expect(item.quality).toBe(quality);
    });

    it("updates when on sell date", () => {
      const sellIn = 0;
      const quality = 80;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn);
      expect(item.quality).toBe(quality);
    });

    it("updates when after sell date", () => {
      const sellIn = -10;
      const quality = 80;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn);
      expect(item.quality).toBe(quality);
    });

    it("updates when of zero quality", () => {
      const sellIn = 5;
      const quality = 80;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn);
      expect(item.quality).toBe(quality);
    });
  });

  describe("Backstage Pass", () => {
    beforeEach(() => {
      name = "Backstage passes to a TAFKAL80ETC concert";
    });

    it("updates when long before sell date", () => {
      const sellIn = 11;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality + 1);
    });

    it("updates when long before sell date at max quality", () => {
      const sellIn = 11;
      const quality = 50;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
    });

    it("updates when medium close to sell date (upper bound)", () => {
      const sellIn = 10;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality + 2);
    });

    it("updates when medium close to sell date (upper bound) at max quality", () => {
      const sellIn = 10;
      const quality = 50;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality);
    });

    it("updates when medium close to sell date (lower bound)", () => {
      const sellIn = 6;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality + 2);
    });

    it("updates when medium close to sell date (lower bound) at max quality", () => {
      const sellIn = 6;
      const quality = 50;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality);
    });

    it("updates when very close to sell date (upper bound)", () => {
      const sellIn = 5;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality + 3);
    });

    it("updates when very close to sell date (upper bound) at max quality", () => {
      const sellIn = 5;
      const quality = 50;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality);
    });

    it("updates when very close to sell date (lower bound)", () => {
      const sellIn = 1;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality + 3);
    });

    it("updates when very close to sell date (lower bound) at max quality", () => {
      const sellIn = 1;
      const quality = 50;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality);
    });

    it("updates when on sell date", () => {
      const sellIn = 0;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(0);
    });

    it("updates when after sell date", () => {
      const sellIn = -10;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(0);
    });
  });

  describe("Conjured Item", () => {
    beforeEach(() => {
      name = "Conjured Mana Cake";
    });

    it("updates when before sell date", () => {
      const sellIn = 5;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality - 2);
    });

    it("updates when before sell date at zero quality", () => {
      const sellIn = 5;
      const quality = 0;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality);
    });

    it("updates when on sell date", () => {
      const sellIn = 0;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality - 4);
    });

    it("updates when on sell date at zero quality", () => {
      const sellIn = 0;
      const quality = 0;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality);
    });

    it("updates when after sell date", () => {
      const sellIn = -10;
      const quality = 10;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality - 4);
    });

    it("updates when after sell date at zero quality", () => {
      const sellIn = -10;
      const quality = 0;
      const [item] = GildedRose.adjustQuality([{ name, sellIn, quality }]);
      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(quality);
    });
  });

  describe("Multiple Items", () => {
    it("updates multiple items", () => {
      const [item1, item2] = GildedRose.adjustQuality([
        { name: "Normal Item", sellIn: 5, quality: 10 },
        { name: "Aged Brie", sellIn: 3, quality: 10 },
      ]);
      expect(item1.sellIn).toBe(4);
      expect(item1.quality).toBe(9);
      expect(item2.sellIn).toBe(2);
      expect(item2.quality).toBe(11);
    });
  });
});
