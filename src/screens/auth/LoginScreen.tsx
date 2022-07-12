import React, {useContext, useEffect, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {RFPercentage as RFP} from 'react-native-responsive-fontsize';
import {AppContext} from '../../context/app-context/App.context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppText from '../../components/AppText';
import CustomButton from '../../components/CustomButton';
import TextInputField from '../../components/TextInputField';
import {handleToast} from '../../utils';
import navigator from '../../navigation/Navigator';

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {createOrLoginUser, loading, currentUser} = useContext(AppContext);
  const onSubmit = () => {
    if (email && password) {
      createOrLoginUser({
        email,
        password,
      });
    } else {
      handleToast('Input fields are required', 'error');
    }
  };

  const onChaneEmail = (value: string) => setEmail(value);
  const onChangePassword = (value: string) => setPassword(value);

  useEffect(() => {
    if (currentUser && currentUser?.userId) {
      navigator.resetTo({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
    }
  }, [currentUser]);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerContainer}>
        <AppText text={'Welcome to'} style={styles.welcomeTextStyle} />
        <AppText text={'BLUEMOON'} style={styles.headerTitleStyle} />
      </View>

      <View style={styles.bodyContainer}>
        <TextInputField
          placeholder={'Email address'}
          onChangeText={onChaneEmail}
        />
        <TextInputField
          placeholder={'Security pasword'}
          secureTextEntry
          onChangeText={onChangePassword}
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
export default LoginScreen;
