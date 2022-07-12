import React from 'react';
import {
  View,
  TextInput,
  KeyboardTypeOptions,
  StyleProp,
  ViewProps,
  StyleSheet,
} from 'react-native';
import {RFPercentage as RFP} from 'react-native-responsive-fontsize';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface TextInputFieldProps {
  secureTextEntry?: boolean;
  placeholder?: string;
  value?: string;
  editable?: boolean;
  numberOfLines?: number;
  multiline?: boolean;
  inputStyle?: StyleProp<ViewProps>;
  placeholderTextColor?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  inputContainer?: StyleProp<ViewProps>;
}

const TextInputField: React.FC<TextInputFieldProps> = props => {
  const {
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
    inputContainer,
    editable,
    multiline,
    numberOfLines,
    placeholderTextColor,
    inputStyle,
  } = props;
  return (
    <View style={[styles.wrapper, inputContainer]}>
      <TextInput
        {...props}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={[styles.textInputStyle, inputStyle]}
        value={value}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor || '#5b5b5c'}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    marginTop: hp(2),
  },

  textInputStyle: {
    backgroundColor: '#cfd0d1',
    height: hp(7),
    borderRadius: 3,
    paddingHorizontal: 10,
    color: '#000',
    fontFamily: 'bold',
    fontSize: RFP(2),
  },
});
export default TextInputField;
