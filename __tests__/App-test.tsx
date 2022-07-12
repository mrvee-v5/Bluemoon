import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import LoginScreen from '../src/screens/auth/LoginScreen';
import HomeScreen from '../src/screens/main/HomeScreen';
import EditScreen from '../src/screens/main/EditScreen';

it('renders App.tsx correctly ', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders App.tsx correctly ', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders LoginScreen.tsx correctly ', () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders HomeScreen.tsx correctly ', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders EditScreen.tsx correctly ', () => {
  const tree = renderer.create(<EditScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
