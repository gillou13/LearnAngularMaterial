import { Pipe, PipeTransform } from '@angular/core';
import { FilterType } from '../enum/filter-type';

/**
 * Renvoi l'icon correspondant au type de filtre indiqué.
 */
@Pipe({
  name: 'iconToFilterType',
  standalone: true,
})
export class IconToFilterTypePipe implements PipeTransform {
  transform(filterType: FilterType, text: boolean = false): string {
    // la flem de faire un 2ème pipe. (pour le text)
    if (!text) {
      switch (filterType) {
        case FilterType.numberEqual:
        case FilterType.stringContains:
          return 'search';
        case FilterType.numberMoreThan:
          return 'chevron_left';
        case FilterType.numberLessThan:
          return 'chevron_right';
        case FilterType.numberLessOrEqualThan:
          return 'keyboard_double_arrow_right';
        case FilterType.numberMoreOrEqualThan:
          return 'keyboard_double_arrow_left';
        default:
          return '';
      }
    } else {
      switch (filterType) {
        case FilterType.numberEqual:
        case FilterType.stringContains:
          return '=';
        case FilterType.numberMoreThan:
          return '<';
        case FilterType.numberLessThan:
          return '>';
        case FilterType.numberLessOrEqualThan:
          return '=>';
        case FilterType.numberMoreOrEqualThan:
          return '=<';
        default:
          return '';
      }
    }
  }
}
