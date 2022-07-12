import {InventoryType, UserType} from '../context/app-context/types';

export type dbType = {
  users: UserType[];
  inventories: InventoryType[];
};
