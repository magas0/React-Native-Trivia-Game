import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './src/reducers/index';
import Button from 'react-native-button';
import HomeScreen from './src/components/homescreen';
import QuestionsScreen from './src/components/questions';
import FinalScreen from './src/components/finalscreen';

const store = createStore(reducers);

// Set up the three different screens for the app with no header
const QuestionsApp = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Questions: { screen: QuestionsScreen },
    Final: { screen: FinalScreen },
  },
  { headerMode: 'none' }
);

export default () => (
  <Provider store={store}>
    <QuestionsApp />
  </Provider>
);
