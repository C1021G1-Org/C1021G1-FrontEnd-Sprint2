import {Province} from './province';

export interface District {
  id: number;
  name: string;
  prefix: string;
  province: Province;
}
