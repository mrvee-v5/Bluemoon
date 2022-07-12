import React, {useContext, useEffect, useState} from 'react';
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

const AddProductScreen = () => {
  const [stock, setStock] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const {addProductToInventory, loading} = useContext(AppContext);
  const onSubmit = () => {
    if (stock && productName && price && description) {
      addProductToInventory({
        name: productName,
        totalStock: Number(stock),
        price: Number(price),
        description: description,
      });
    } else {
      handleToast('Input fields are required', 'error');
    }
  };

  const handleProductName = (value: string) => setProductName(value);
  const handleProductDescription = (value: string) => setDescription(value);
  const handleProductPrice = (value: string) => setPrice(value);
  const handleProductStock = (value: string) => setStock(value);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.bodyContainer}>
        <TextInputField
          placeholder={'Product name'}
          onChangeText={handleProductName}
        />

        <TextInputField
          placeholder={'Total stock'}
          keyboardType={'decimal-pad'}
          onChangeText={handleProductStock}
        />

        <TextInputField
          placeholder={'Product Price'}
          keyboardType={'decimal-pad'}
          onChangeText={handleProductPrice}
        />

        <TextInputField
          placeholder={'Description'}
          onChangeText={handleProductDescription}
        />

        <CustomButton
          value={'Login'}
          onPress={onSubmit}
          loading={loading}
          buttonStyle={styles.buttonStyle as StyleProp<ViewStyle>}
        />
      </View>
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
});
export default AddProductScreen;
