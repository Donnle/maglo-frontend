import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumbers',
  standalone: true
})
export class CardNumbersPipe implements PipeTransform {
  transform(
    value: string | number,
    hideFrom: number = -1,
    hideTo: number = -1
  ): string {
    const cardNumbers: string = value.toString().split(' ').join('');

    if (cardNumbers.length !== 16) {
      console.error('Card numbers length must be equal 16!');
      return cardNumbers;
    }

    if (hideFrom !== -1 && hideTo !== -1) {
      const hiddenNumbers: string = this.hideNumbers(
        cardNumbers,
        hideFrom,
        hideTo
      );

      return this.formatCardNumbers(hiddenNumbers);
    }

    return this.formatCardNumbers(cardNumbers);
  }

  private hideNumbers(
    cardNumbers: string,
    hideFrom: number,
    hideTo: number
  ): string {
    return cardNumbers
      .split('')
      .reduce((acc: string, cardNumber: string, currentIndex: number) => {
        if (currentIndex >= hideFrom && hideTo > currentIndex) {
          return acc + '*';
        }

        return acc + cardNumber;
      }, '');
  }

  private formatCardNumbers(cardNumbers: string): string {
    return (
      cardNumbers.slice(0, 4) +
      ' ' +
      cardNumbers.slice(4, 8) +
      ' ' +
      cardNumbers.slice(8, 12) +
      ' ' +
      cardNumbers.slice(12)
    );
  }
}
