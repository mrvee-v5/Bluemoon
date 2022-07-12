import React, {useContext, useState, useEffect} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {RFPercentage as RFP} from 'react-native-responsive-fontsize';
import {AppContext} from '../../context/app-context/App.context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../components/CustomButton';
import TextInputField from '../../components/TextInputField';
import {handleToast} from '../../utils';
import {RouteProp, useRoute} from '@react-navigation/native';
import {InventoryType} from '../../context/app-context/types';
import YesOrNoOption from '../../components/YesOrNoOption';

const EditScreen = () => {
  const [stock, setStock] = useState<string>('');
  const [visible, setVisble] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const route: RouteProp<
    {
      params: {data: InventoryType};
    },
    'params'
  > = useRoute();

  const {updateInventoryProduct, loading, deleteInventoryProduct} =
    useContext(AppContext);
  const onSubmit = () => {
    if (stock && productName && price && description) {
      if (route.params.data.itemId)
        updateInventoryProduct(route.params.data.itemId, {
          name: productName,
          totalStock: Number(stock),
          price: Number(price),
          description: description,
        });
    } else {
      handleToast('Input fields are required', 'error');
    }
  };

  const handleDeleteProduct = () => {
    setVisble(true);
  };

  const handleYes = () => {
    setVisble(false);
    if (route.params.data.itemId)
      deleteInventoryProduct(route.params.data.itemId);
  };

  const handleNo = () => setVisble(false);

  const handleProductName = (value: string) => setProductName(value);
  const handleProductDescription = (value: string) => setDescription(value);
  const handleProductPrice = (value: string) => setPrice(value);
  const handleProductStock = (value: string) => setStock(value);
  useEffect(() => {
    setProductName(route.params.data.name);
    setDescription(route.params.data.description);
    setPrice(route.params.data.price.toString());
    setStock(route.params.data.totalStock.toString());
  }, []);
  return (
    <View style={styles.containerStyle}>
      <View style={styles.bodyContainer}>
        <TextInputField
          placeholder={'Product name'}
          onChangeText={handleProductName}
          value={productName}
        />

        <TextInputField
          placeholder={'Total stock'}
          keyboardType={'decimal-pad'}
          onChangeText={handleProductStock}
          value={stock}
        />

        <TextInputField
          placeholder={'Product Price'}
          keyboardType={'decimal-pad'}
          onChangeText={handleProductPrice}
          value={price}
        />

        <TextInputField
          placeholder={'Description'}
          onChangeText={handleProductDescription}
          value={description}
        />

        <CustomButton
          value={'Update Product'}
          onPress={onSubmit}
          loading={loading}
          buttonStyle={styles.buttonStyle as StyleProp<ViewStyle>}
        />

        <CustomButton
          value={'Delete Product'}
          onPress={handleDeleteProduct}
          loading={loading}
          buttonStyle={styles.deleteButton as StyleProp<ViewStyle>}
        />
      </View>
      <YesOrNoOption
        open={visible}
        onNoAction={handleNo}
        onYesAction={handleYes}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
  },

  headerTitleStyle: {
    fontSize: RFP(3.5),
    fontWeight: 'bold',
  },
  welcomeTextStyle: {
    fontSize: RFP(3),
  },
  bodyContainer: {
    marginHorizontal: wp(5),
    marginTop: hp(10),
  },
  buttonStyle: {
    marginTop: hp(2),
    backgroundColor: '#3d7de3',
  },

  deleteButton: {
    marginTop: hp(2),
    backgroundColor: '#f55b84',
  },
});
export default EditScreen;
