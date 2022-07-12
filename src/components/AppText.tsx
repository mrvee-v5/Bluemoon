import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {RFPercentage as RFP} from 'react-native-responsive-fontsize';

interface AppTextProps {
  text?: string | number | undefined;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
}
const AppText: React.FC<AppTextProps> = props => {
  const {text, style, onPress, numberOfLines, ellipsizeMode} = props;
  return (
    <Text
      style={[styles.textStyle, style]}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      onPress={onPress && onPress}>
      {text}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: RFP(2),
    letterSpacing: 0.2,
    color: '#000',
  },
});
