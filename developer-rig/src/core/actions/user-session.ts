import { Action } from '../models/actions';
import { UserSession } from '../models/user-session';

export const USER_LOGIN = 'core.session.USER_LOGIN';
export const USER_LOGOUT = 'core.session.USER_LOGOUT';

interface UserLogin extends Action<typeof USER_LOGIN> {
  userSession?: UserSession;
}

interface UserLogout extends Action<typeof USER_LOGOUT> {}

export type All = (
  | UserLogin
  | UserLogout
);

export function userLogin(user: UserSession | null): UserLogin {
  return {
    type: USER_LOGIN,
    userSession: user,
  }
}

export function userLogout(): UserLogout {
  return {
    type: USER_LOGOUT,
  }
}
