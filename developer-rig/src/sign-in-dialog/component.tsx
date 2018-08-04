import * as React from 'react';
import * as closeButton from '../img/close_icon.png';
import './component.sass';
import { LoginButton } from '../login-button';

export interface SignInDialogProps {
  show: boolean;
  closeSignInDialog: () => void;
}

export class SignInDialog extends React.Component<SignInDialogProps> {
  public render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="sign-in">
        <div className="sign-in__background"/>
        <div className="sign-in__dialog">
          <div className="dialog__top-bar-container">
            <div className="top-bar-container__title"> Please Sign In </div>
            <div className="top-bar-container__escape" onClick={this.props.closeSignInDialog}><img alt="Close" src={closeButton}/></div>
          </div>
          <div>
            <hr className="dialog__divider" />
            <div className='sign-in__text'>
              Why do I need to sign in for Local Mode?
              <br />
              <br/>
              We created Local Mode for the Developer Rig with one goal in mind: helping developers build extensions faster.
              <br />
              <br/>
              Local Mode is composed of Mock APIs and Mock Pub Sub, enabling you to start building and testing an extension immediately, without the need to go through the normal Twitch Extension Developer Onboarding.
              <br />
              <br/>
              So why are we asking you to sign in even when you're using mocks? Simply put, we want to know how we're doing. We have ambitions of delivering more Developer Rig features and want to make sure we are making features that are helpful to you. Being able to see how frequently developers log into and use the Rig will give us a good signal that we are adding value to your workflow and that we should continue to invest in it.
              <br />
              <br/>
              We really appreciate you being part of the Twitch developer community. We're excited to see what kind of extensions you'll make!
            </div>
            <div className="sign-in__bottom-bar">
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

