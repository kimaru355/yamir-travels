import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
  standalone: true,
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(price: number): string {
    let price_to_format: string[] = price.toString().split('').reverse();
    let formated_price: string = '';

    while (price_to_format.length >= 3) {
      formated_price = `${price_to_format.splice(0, 3).reverse().join('')}${
        formated_price ? ',' + formated_price : ''
      }`;
    }
    formated_price = `${
      price_to_format.length > 0
        ? price_to_format.join('') + ',' + formated_price
        : formated_price
    }`;
    return formated_price;
  }
}
