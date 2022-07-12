import React, {createContext, useEffect, useState} from 'react';
import {
  createInventoryFromDb,
  createUserFromDb,
  deleteInventoryFromDb,
  getInventoriesFromDB,
  updateInventoryFromDb,
} from '../../db/db';
import {handleToast} from '../../utils';
import {AppContextType, UserType, InventoryType} from './types';

export const AppContext = createContext<AppContextType>({
  currentUser: null,
  inventories: [],
  addProductToInventory: () => {},
  updateInventoryProduct: () => {},
  deleteInventoryProduct: () => {},
  createOrLoginUser: () => {},
  getAllInventory: () => {},
  errorMessage: '',
  success: '',
  loading: false,
});
const UNATHORIZED_ERROR = 'Ooops you are not authorized';
export const AppContextProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [inventories, setInventory] = useState<[] | InventoryType[]>([]);
  const [currentUser, setcurrentUser] = useState<null | UserType>(null);
  const [errorMessage, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const addProductToInventory = (item: InventoryType) => {
    setLoading(true);
    if (currentUser && currentUser.userId) {
      createInventoryFromDb(item, currentUser?.userId)
        .then(inevntory => {
          if (inevntory && inevntory.length) {
            setInventory(inevntory);
            setLoading(false);
            setSuccess('Product Added successfully');
          } else {
            setLoading(false);
            setError('Ooops could not add to inventory!');
          }
        })
        .catch(err => {
          setLoading(false);
          setError(err.toString());
        });
    } else {
      setLoading(true);
      setError(UNATHORIZED_ERROR);
    }
  };

  const updateInventoryProduct = (itemId: string, item: InventoryType) => {
    setLoading(true);
    if (currentUser) {
      updateInventoryFromDb(itemId, item)
        .then(inventory => {
          if (inventory && inventory.length) {
            setInventory(inventory);
            setLoading(false);
            setSuccess('Product updated successfully');
          } else {
            setLoading(true);
            setError('Oooops could not update this product!');
          }
        })
        .catch(err => setError(err.toString()));
    } else {
      setLoading(true);
      setError(UNATHORIZED_ERROR);
    }
  };
  const deleteInventoryProduct = (itemId: string) => {
    setLoading(true);
    if (currentUser) {
      deleteInventoryFromDb(itemId)
        .then(deletedItem => {
          if (deletedItem) {
            setLoading(false);
            setSuccess('Product Deleted successuflly');
          } else {
            setLoading(false);
            setError('Ooops could not delete this product');
          }
        })
        .catch(err => {
          setLoading(false);
          setError(err.toString());
        });
    } else {
      setLoading(true);
      setError(UNATHORIZED_ERROR);
    }
  };
  const createOrLoginUser = (userDetails: UserType) => {
    setLoading(true);
    createUserFromDb(userDetails)
      .then(user => {
        if (user) {
          setLoading(false);
          setcurrentUser(user);
        } else {
          setLoading(false);
          setError('Unable to authenticate this user');
        }
      })
      .catch(err => {
        setLoading(false);
        setError(err.toString());
      });
  };

  const getAllInventory = () => {
    setLoading(true);
    if (currentUser && currentUser.userId) {
      getInventoriesFromDB(currentUser.userId)
        .then(inventories => {
          if (inventories && inventories.length) {
            setLoading(false);
            setInventory(inventories);
          } else {
            setLoading(false);
            setInventory([]);
          }
        })
        .catch(err => {
          setLoading(false);
          setError(err.toString());
        });
    } else {
      setLoading(true);
      setError(UNATHORIZED_ERROR);
    }
  };

  return (
    <AppContext.Provider
      value={{
        errorMessage,
        success,
        inventories,
        currentUser,
        addProductToInventory,
        updateInventoryProduct,
        deleteInventoryProduct,
        createOrLoginUser,
        getAllInventory,
        loading,
      }}>
      {children}
    </AppContext.Provider>
  );
};
