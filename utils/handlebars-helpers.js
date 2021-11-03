const handlebarsHelpers = {
  upper(str) {
    return str.toUpperCase();
  },
  lower: (str) => str.toLowerCase(),
  findPrice: (entries, selectedItem) => {
    const found = entries.find((el) => el[0] === selectedItem);
    if (!found) {
      throw new Error(`Nie można znaleźć ceny dla ${selectedItem},`);
    }
    const [, price] = found;
    return price;
  },
  pricify: (price) => price.toFixed(2),
  isNotOnArray: (array, element) => !array.includes(element),
};

module.exports = {
  handlebarsHelpers,
};
