import * as React from 'react';
import { mount } from 'enzyme';


/**
 * Builds the mount wrapper for a component given defaults set in a test suite, and allowing overrides for each case.
 * @param {*} Component
 * @param {*} generator
 * @param {*} mountOptions
 */
export function setupMountTest(Component: React.ComponentClass, generator: Function, mountOptions?: Object) {
  return (propOverrides?: any) => {
    const combinedProps = Object.assign({}, generator(), propOverrides);
    return {
      props: combinedProps,
      wrapper: mount((<Component {...combinedProps} />), mountOptions),
    }
  }
}
