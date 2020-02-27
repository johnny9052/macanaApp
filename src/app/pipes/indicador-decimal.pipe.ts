import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indicadorDecimal'
})
export class IndicadorDecimalPipe implements PipeTransform {

  public transform(value: any) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
}

}
