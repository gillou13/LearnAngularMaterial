import { FilterType } from '../../common/enum/filter-type';

export interface PeriodicElementFilter {
  name: string;
  nameFilterType: FilterType;
  position: number;
  positionFilterType: FilterType;
  weight: number;
  weightFilterType: FilterType;
  symbol: string;
  symbolFilterType: FilterType;
  description: string;
  descriptionFilterType: FilterType;
}
