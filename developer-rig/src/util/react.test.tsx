import * as React from 'react';
import { Provider } from 'react-redux';
import { RigStore } from '../core/rig-store';
import { wrap } from './react';

class TestComponent extends React.Component<{}, {}> { }
describe('react wrapper', () => {
  const testStore = new RigStore();
  const wrappedComponent = wrap(testStore, <TestComponent />);

  it('creates a provide wrapped component', () => {
    expect(wrappedComponent.type).toBe(Provider);
  });
});
