export type UserType = {
  email: string;
  password: string;
  accessToken?: string;
  userId?: string;
};

export type InventoryType = {
  name: string;
  totalStock: number;
  price: number;
  description: string;
  userId?: string;
  itemId?: string;
};

export interface AppContextType {
  readonly inventories: [] | InventoryType[];
  readonly addProductToInventory: (item: InventoryType) => void;
  readonly updateInventoryProduct: (
    itemId: string,
    item: InventoryType,
  ) => void;
  readonly deleteInventoryProduct: (itemId: string) => void;
  readonly createOrLoginUser: (userDetail: UserType) => void;
  readonly currentUser: null | UserType;
  readonly getAllInventory: () => void;
  readonly errorMessage: string;
  readonly success: string;
  readonly loading: boolean;
}
