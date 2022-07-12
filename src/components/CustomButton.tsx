import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleProp,
  ViewProps,
  TextProps,
  GestureResponderEvent,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import AppText from './AppText';
interface CustomButtonProps {
  buttonStyle?: StyleProp<ViewProps>;
  valueStyle?: StyleProp<TextProps>;
  value: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  disable?: boolean;
  loading?: boolean;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  buttonStyle,
  value,
  valueStyle,
  onPress,
  loading,
}) => {
  return (
    <TouchableWithoutFeedback onPress={!loading ? onPress : undefined}>
      <View style={[styles.buttonContainer, buttonStyle]}>
        {loading ? (
          <ActivityIndicator color={'#fff'} size={25} />
        ) : (
          <AppText text={value} style={[styles.valueStyle, valueStyle]} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  valueStyle: {
    color: '#fff',
    fontWeight: 'bold',
  },

  buttonContainer: {
    height: hp(6),
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomButton;
