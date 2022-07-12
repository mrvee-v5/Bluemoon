import React from 'react';
import {Dimensions, StyleProp, StyleSheet, View, ViewProps} from 'react-native';

import {RFPercentage as RFP} from 'react-native-responsive-fontsize';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {InventoryType} from '../context/app-context/types';
import Navigator from '../navigation/Navigator';
import {shortenText} from '../utils';

import AppText from './AppText';
import Card from './Card';

const ProductCard: React.FC<{
  data: InventoryType;
  style?: StyleProp<ViewProps>;
}> = ({data}) => {
  const {name, description, price, totalStock} = data;

  const handleViewProduct = () => {
    Navigator.navigate('EditScreen', {data});
  };
  return (
    <Card cardStyles={styles.cardStyle} onPress={handleViewProduct}>
      <View style={styles.cardContentContainer}>
        <AppText
          text={shortenText(name, 25)}
          style={styles.productNameStyle}
          ellipsizeMode={'tail'}
        />
        <AppText text={`₦${price}`} style={styles.productPriceStyle} />
        <View>
          <AppText text={`Available stock : ${totalStock}`} />
          <AppText text={description} />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  productNameStyle: {
    fontSize: RFP(3),
    flex: 1,
    color: 'gray',
  },
  productPriceStyle: {
    fontSize: RFP(2),
    fontWeight: '400',
  },

  cardStyle: {
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: {width: 5, height: 5},
    elevation: 5,
    borderColor: 'transparent',
    paddingTop: hp(2),
    paddingBottom: hp(3),
    overflow: 'hidden',
    position: 'relative',
    width: Dimensions.get('window').width / 2.3,
    justifyContent: 'space-evenly',
  },

  cardContentContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});

export default ProductCard;
