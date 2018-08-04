import { connect, Dispatch } from 'react-redux';
import { GlobalState } from '../../core/models/global-state';
import { ReduxDispatchProps, ReduxStateProps, MockApiDropdownComponent } from './component';
import * as rigActions from '../../core/actions/rig';
import { mockApiEnabled } from '../../core/state/rig';

function mapStateToProps(state: GlobalState): ReduxStateProps {
  return {
    mockApiEnabled: mockApiEnabled(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch<GlobalState>) {
  return {
    toggleMockApi: () => dispatch(rigActions.toggleMockApi())
  }
}
export const MockApiDropdown = connect<ReduxStateProps, ReduxDispatchProps>(mapStateToProps, mapDispatchToProps)(MockApiDropdownComponent);
