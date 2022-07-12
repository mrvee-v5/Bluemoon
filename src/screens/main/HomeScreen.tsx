import React, {useContext, useEffect} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppText from '../../components/AppText';
import ProductCard from '../../components/ProductCard';
import {InventoryType} from '../../context/app-context/types';
import {AppContext} from '../../context/app-context/App.context';
import {RFPercentage as RFP} from 'react-native-responsive-fontsize';
import navigator from '../../navigation/Navigator';

const HomeScreen: React.FC = () => {
  const {currentUser, inventories, getAllInventory} = useContext(AppContext);
  console.log(inventories);

  const handleRenderItem: ListRenderItem<InventoryType> = ({item}) => (
    <ProductCard data={item} />
  );

  const handleKeyExtractor = (_item: any, index: number) => index.toString();
  const handleCreateProduct = () => {
    navigator.navigate('AddProductScreen');
  };

  useEffect(() => {
    getAllInventory();
  }, []);
  return (
    <View style={styles.wrapper}>
      <AppText
        text={currentUser ? currentUser.email : ''}
        style={styles.titleStyle}
      />
      <View style={styles.containerStyle}>
        <FlatList
          onLayout={() => ''}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.serviceContainer}
          data={inventories}
          renderItem={handleRenderItem}
          keyExtractor={handleKeyExtractor}
        />
      </View>
      <TouchableWithoutFeedback onPress={handleCreateProduct}>
        <View style={styles.createOptionsCont}>
          <AppText text={'Add Product'} style={styles.addStyle} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  addStyle: {
    color: '#fff',
  },

  titleStyle: {
    fontSize: RFP(2.4),
    margin: hp(3),
  },
  serviceContainer: {
    paddingHorizontal: wp(3),
    paddingBottom: hp(2),
    flexDirection: 'column',
  },
  containerStyle: {
    marginTop: hp(1),
  },
  createOptionsCont: {
    padding: 10,
    width: '50%',
    position: 'absolute',
    bottom: 90,
    right: 10,
    backgroundColor: '#3d7de3',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
    alignItems: 'center',
  },
});

export default HomeScreen;
