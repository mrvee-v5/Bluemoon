import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import Navigations from './src/navigation';
import {AppContextProvider} from './src/context/app-context/App.context';
import {initializeDb} from './src/db/db';

const App = () => {
  useEffect(() => {
    initializeDb();
  }, []);
  return (
    <View style={styles.safeAreaView}>
      <SafeAreaView style={styles.safeAreaView}>
        <AppContextProvider>
          <Navigations />
        </AppContextProvider>
      </SafeAreaView>
      <Toast ref={(ref: any) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  textButton: {
    backgroundColor: '#fff',
  },
  safeAreaView: {
    flex: 1,
  },
});
export default App;
