/**
 * @format
 */

import {AppRegistry} from 'react-native';
import './shim'; // Make sure this comes before anything else
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
