import * as React from 'react';
import { shallow } from 'enzyme';
import { RigStore } from '../../core/rig-store';
import { wrap } from '../../util/react';

/**
 * Builds the shallow wrapper for a component given defaults set in a test suite,
 * and allowing overrides for each case.
 * @param {*} Component
 * @param {*} generator
 * @param {*} shallowOptions
 */
export function setupShallowTest(Component: React.ComponentClass, generator: Function, shallowOptions?: Object) {
  return (propOverrides?: any) => {
    const combinedProps = Object.assign({}, generator(), propOverrides);
    return {
      props: combinedProps,
      wrapper: shallow((<Component {...combinedProps} />), shallowOptions),
    }
  }
}

export function setupShallowTestWithStore(Component: React.ComponentClass, generator: Function, shallowOptions?: Object) {
  const store = new RigStore();
  return (propOverrides?: any) => {
    const combinedProps = Object.assign({}, generator(), propOverrides);
    return {
      props: combinedProps,
      wrapper: shallow(wrap(store, (<Component {...combinedProps} />)), shallowOptions),
    }
  }
}

