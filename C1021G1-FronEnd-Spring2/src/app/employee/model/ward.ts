import {District} from './district';

export interface Ward {
  id: number;
  name: string;
  prefix: string;
  district: District;
}
