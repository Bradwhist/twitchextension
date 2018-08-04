import * as React from 'react';
import { Provider } from 'react-redux';
import { RigStore } from '../core/rig-store';

export function wrap(store: RigStore, element: JSX.Element): JSX.Element{
  return (
    <Provider store={store.getReduxStore()}>
      {element}
    </Provider>
  );
}
