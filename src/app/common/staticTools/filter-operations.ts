import { _isNumberValue } from '@angular/cdk/coercion';
import { FilterType } from '../enum/filter-type';
import { filter } from 'rxjs';

export abstract class FilterOperations {
  /**
   * Si template est contenu dans target renvoie true. n'est pas sensible à la case.
   * @param value string testé.
   * @param template utilisé pour la constrution du regex
   */
  public static stringContains(value: string, template: string): boolean {
    return new RegExp(template, 'i').test(value);
  }

  /**
   * Si template est équale au target renvoie true.
   * @param value number testé.
   * @param template number de référence.
   */
  public static numberEqual(value: number, template: number): boolean {
    return value === template;
  }

  /**
   * Si template est strictement supérieur au target renvoie true.
   * @param value number testé.
   * @param template number de référence.
   */
  public static numberMoreThan(value: number, template: number): boolean {
    return template > value;
  }

  /**
   * Si template est supérieur ou égal au target renvoie true.
   * @param value number testé.
   * @param template number de référence.
   */
  public static numberMoreOrEqualThan(
    value: number,
    template: number
  ): boolean {
    return template >= value;
  }

  /**
   * Si template est strictemen inférieur au target renvoie true.
   * @param value number testé.
   * @param template number de référence.
   */
  public static numberLessThan(value: number, template: number): boolean {
    return template < value;
  }

  /**
   * Si template est inférieur ou égal au target renvoie true.
   * @param value number testé.
   * @param template number de référence.
   */
  public static numberLessOrEqualThan(
    value: number,
    template: number
  ): boolean {
    return template <= value;
  }

  /**
   * Permet le choix de la fonction de test pour le fitre actif.
   * @param value valeur à tester.
   * @param template valeur de référence.
   * @param filterType Type d'opération à effectuer.
   * @returns boolean selon le type d'opération indiqué.
   */
  public static applyOperator(
    value: any,
    template: any,
    filterType: FilterType
  ): boolean {
    // si pas de template on ne fait pas de test.
    if (!template) {
      return true;
    }

    // pour les string :
    if (filterType === FilterType.stringContains) {
      return this.stringContains(value, template);
    }

    // pour les numériques :
    if (_isNumberValue(value) && _isNumberValue(template)) {
      const templateNumber = Number(template);
      switch (filterType) {
        case FilterType.numberEqual:
          return this.numberEqual(value, templateNumber);

        case FilterType.numberMoreThan:
          return this.numberMoreThan(value, templateNumber);

        case FilterType.numberMoreOrEqualThan:
          return this.numberMoreOrEqualThan(value, templateNumber);

        case FilterType.numberLessThan:
          return this.numberLessThan(value, templateNumber);

        case FilterType.numberLessOrEqualThan:
          return this.numberLessOrEqualThan(value, templateNumber);
        default:
          return false;
      }
    }

    // Valeur par défaut si aucune conbinaison n'est trouvé.
    return false;
  }
}
