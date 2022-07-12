import React from 'react';

import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppText from './AppText';
import CustomButton from './CustomButton';
import CustomModal from './CustomModal';

interface YesOrNoProps {
  open: boolean;

  onNoAction: ((event: GestureResponderEvent) => void) | undefined;
  onYesAction: ((event: GestureResponderEvent) => void) | undefined;
}

const YesOrNoOption: React.FC<YesOrNoProps> = ({
  open,
  onYesAction,
  onNoAction,
}) => {
  return (
    <CustomModal open={open} childStyle={styles.modalStyle}>
      <View style={styles.container}>
        <View style={styles.contentStyle}>
          <View style={styles.titleWrapper}>
            <AppText text={'Delete Product'} />
            <AppText
              text={'Are you sure you want to delete this product?'}
              style={styles.descriptionStyle}
            />
          </View>

          <View style={styles.btnContainer}>
            <View style={styles.cancelContainer}>
              <CustomButton value={'No'} onPress={onNoAction} />
            </View>
            <View style={styles.cancelButtonContainer}>
              <CustomButton
                value={'Yes'}
                onPress={onYesAction}
                buttonStyle={styles.buttonStyle as StyleProp<ViewProps>}
              />
            </View>
          </View>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#3d7de3',
  },
  titleContainerStyle: {
    paddingHorizontal: wp(4),
    backgroundColor: '#3d7de3',
    height: hp(5),
    justifyContent: 'center',
  },

  modalStyle: {
    padding: 0,
  },
  titleWrapper: {
    marginTop: hp(4),
  },
  container: {
    height: hp(33),
  },
  contentStyle: {
    paddingHorizontal: wp(4),
  },

  cancelButtonContainer: {
    flex: 1,
    paddingLeft: 5,
  },
  descriptionStyle: {
    marginTop: 10,
  },
  cancelContainer: {
    flex: 1,

    marginRight: 2,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(10),
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  paynow: {
    fontSize: RFPercentage(2),
  },
});

export default YesOrNoOption;
