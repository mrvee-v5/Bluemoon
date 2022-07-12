import AsyncStorage from '@react-native-community/async-storage';
import {InventoryType, UserType} from '../context/app-context/types';
import uuid from 'react-native-uuid';

import {dbType} from './types';
const InitialDb = {
  users: [],
  inventories: [],
};

export const BLUEMOONDB = 'BLUEMOONDB';

export const initializeDb = async () => {
  try {
    const isDb = await AsyncStorage.getItem(BLUEMOONDB);
    if (!isDb) {
      await AsyncStorage.setItem(BLUEMOONDB, JSON.stringify(InitialDb));
    }
  } catch (err) {
    console.log('DB ERROR ==', err);
  }
};

export const createUserFromDb = async (
  userDetails: UserType,
): Promise<UserType | null> => {
  try {
    const initialDb = await AsyncStorage.getItem(BLUEMOONDB);
    if (initialDb) {
      const deSerializeInitialInventory = JSON.parse(initialDb) as dbType;

      let value = {
        ...userDetails,
        userId: uuid.v4().toString(),
      };

      const existingUser = deSerializeInitialInventory.users.filter(
        (user: UserType) => user.email === userDetails.email,
      )[0];
      if (existingUser) {
        return existingUser;
      } else {
        deSerializeInitialInventory.users.push(value);
        await AsyncStorage.setItem(
          BLUEMOONDB,
          JSON.stringify(deSerializeInitialInventory),
        );
        return value;
      }
    } else {
      return null;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getInventoriesFromDB = async (
  userId: string,
): Promise<InventoryType[]> => {
  try {
    const initialDb = await AsyncStorage.getItem(BLUEMOONDB);
    if (initialDb) {
      const result = JSON.parse(initialDb) as dbType;
      const currentUserInventories = result.inventories.filter(
        (inventory: InventoryType) => inventory.userId === userId,
      );
      return currentUserInventories;
    } else {
      return [];
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createInventoryFromDb = async (
  item: InventoryType,
  userId: string,
): Promise<InventoryType[] | null> => {
  try {
    const initialDb = await AsyncStorage.getItem(BLUEMOONDB);
    if (initialDb) {
      const deSerializeInitialInventory = JSON.parse(initialDb) as dbType;
      let value = {
        ...item,
        itemId: uuid.v4().toString(),
        userId,
      };
      deSerializeInitialInventory.inventories.push(value);
      await AsyncStorage.setItem(
        BLUEMOONDB,
        JSON.stringify(deSerializeInitialInventory),
      );
      return deSerializeInitialInventory.inventories;
    }
    return null;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateInventoryFromDb = async (
  itemId: string,
  item: InventoryType,
): Promise<InventoryType[] | null> => {
  try {
    const initialDb = await AsyncStorage.getItem(BLUEMOONDB);
    if (initialDb) {
      const deSerializeInitialInventory = JSON.parse(initialDb) as dbType;
      const currentInventoryIndex =
        deSerializeInitialInventory.inventories.findIndex(
          (inventory: InventoryType) => inventory.itemId === itemId,
        );

      const value = {
        ...deSerializeInitialInventory.inventories[currentInventoryIndex],
        ...item,
      };

      const dbCopy = {
        ...deSerializeInitialInventory,
        inventories: deSerializeInitialInventory.inventories.splice(
          currentInventoryIndex,
          1,
          value,
        ),
      };

      await AsyncStorage.setItem(BLUEMOONDB, JSON.stringify(dbCopy));
      return dbCopy.inventories;
    } else {
      return null;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteInventoryFromDb = async (
  itemId: string,
): Promise<boolean | string | object> => {
  try {
    const initialDb = await AsyncStorage.getItem(BLUEMOONDB);
    if (initialDb) {
      const deSerializeInitialInventory = JSON.parse(initialDb) as dbType;

      const dbCopy = {
        ...deSerializeInitialInventory,
        inventories: deSerializeInitialInventory.inventories.filter(
          (inventory: InventoryType) => inventory.itemId !== itemId,
        ),
      };

      await AsyncStorage.setItem(BLUEMOONDB, JSON.stringify(dbCopy));
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
