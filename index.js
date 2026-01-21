/**
 * @format
 */

import App from './src/App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

if (__DEV__) {
  require('./ReactotronConfig');
}

AppRegistry.registerComponent(appName, () => App);
