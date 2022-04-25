# Gilded Rose

This is the Gilded Rose kata in JavaScript with Jest

## Getting started

Install dependencies

```sh
npm install
```

## Running tests

To run all tests

```sh
npm test
```

To run all tests in watch mode

```sh
npm run test:watch
```

To generate test coverage report

```sh
npm run test:coverage
```

## My solution

I started combining all redudant conditions.

After all, just realized how the Gilded rose should be and realized that:

- Sulfuras Item shouldn't be sell in any case.
- All items except Sulfuras and Aged Brie decrease the quality when sellIn is decreasing.
- Conjured Mana Cake reduces quality twice as fast as the other items.
- Aged Brie increases quality while sellIn decreases.
- When sellIn is below 0, items change their quality (even if they increase or decrease) twice as fast (except for the concert tickets).
- Concert tickets increase quality double when sellIn is below 10 and triple when sellIn is below 5. After sellIn is 0, the quality becomes 0.

## To improve

- Concert increase quality has a different method than the other items. It would be great to have the same method. So having the logic of the quality ratio in `getItemQualityRatio()` method I think it would be ideal.
- Removing the below code from the `adjustQuality` I think it would be great also.
```
if (item.name == "Sulfuras, Hand of Ragnaros") return item;

    item.sellIn = item.sellIn - 1;
```


