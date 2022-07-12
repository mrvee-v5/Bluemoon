import * as React from 'react';
import {
  StackActions,
  CommonActions,
  NavigationState,
  PartialState,
  Route,
} from '@react-navigation/native';

declare type ResetState =
  | PartialState<NavigationState>
  | NavigationState
  | (Omit<NavigationState, 'routes'> & {
      routes: Omit<Route<string>, 'key'>[];
    });

export const navigationRef: any = React.createRef();
export const isReadyRef: any = React.createRef();

function navigate(name: any, params?: any) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
}

function push(name: string, params?: object) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

function replace(name: string, params?: object) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

function pop(count?: number) {
  navigationRef.current?.dispatch(StackActions.pop(count));
}

function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

function resetTo(state: ResetState) {
  navigationRef.current?.dispatch(CommonActions.reset(state));
}

export default {
  navigate,
  push,
  pop,
  popToTop,
  replace,
  resetTo,
};
