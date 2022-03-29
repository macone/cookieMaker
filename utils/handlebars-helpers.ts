import {Entries} from "../types/types";


export const handlebarsHelpers = {
  upper: function (str: string) {
      return str.toUpperCase();
  },
  lower: (str: string) => {
      return str.toLowerCase();
  },
  findPrice : (entries: Entries, selectedItem:string): number => {
      const found = entries.find(el => {
        return el[0] === selectedItem;
      });
      if (!found) {
        throw new Error(`Nie można znaleźć ceny dla ${selectedItem},`)
      }
      const [, price] = found;
      return price;
  },
  pricify: (price:number): string => price.toFixed(2),
  isNotOnArray: (array: any[], element: any): boolean => !array.includes(element),
    isInArray: <T>(array: T[], element: T):boolean => array.includes(element),
};