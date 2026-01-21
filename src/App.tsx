/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {persistor, store} from '@store/store';

import {ActivityIndicator} from 'react-native';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import Navigation from '@navigation/Navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <SafeAreaProvider>
          <KeyboardProvider>
            <Navigation />
          </KeyboardProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
