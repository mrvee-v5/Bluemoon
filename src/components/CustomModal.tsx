import React from 'react';

import {
  Modal,
  View,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';

const CustomModal: React.FC<{
  open?: boolean;
  setOpen?: any;
  hp?: object;
  normal?: object;
  containerStyle?: StyleProp<ViewStyle>;
  childStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}> = ({open, setOpen, children, hp, normal, childStyle, containerStyle}) => {
  return (
    <SafeAreaView>
      <Modal
        visible={open}
        transparent={true}
        onRequestClose={setOpen}
        animationType={'slide'}>
        <View
          style={[
            styles.overlayStyle,
            hp,
            !normal ? styles.normal : null,
            containerStyle,
          ]}>
          <View style={[styles.otpContainer, normal, childStyle, hp]}>
            {children}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
  },
  normal: {
    justifyContent: 'center',
  },
  overlayStyle: {
    backgroundColor: 'rgba(00,00,00,0.8)',
    position: 'relative',
    flex: 1,
  },

  viewStyle: {},
});

export default CustomModal;
