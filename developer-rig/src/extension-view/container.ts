import { connect } from 'react-redux';
import { GlobalState } from '../core/models/global-state';
import { ReduxStateProps, ExtensionViewComponent } from './component';
import { mockApiEnabled } from '../core/state/rig';

function mapStateToProps(state: GlobalState): ReduxStateProps {
  return {
    mockApiEnabled: mockApiEnabled(state),
  };
}

export const ExtensionView = connect<ReduxStateProps>(mapStateToProps)(ExtensionViewComponent);
