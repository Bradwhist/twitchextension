import { connect, Dispatch } from 'react-redux';
import { GlobalState } from '../core/models/global-state';
import { PublicProps, ReduxDispatchProps, UserDropdownComponent} from './component';
import { userLogout } from '../core/actions/user-session';

function mapDispatchToProps(dispatch: Dispatch<GlobalState>) {
  return {
    logout: () => dispatch(userLogout()),
  };
}
export const UserDropdown = connect<{}, ReduxDispatchProps, {}>(null, mapDispatchToProps)(UserDropdownComponent);
