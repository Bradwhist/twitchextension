import * as React from 'react';
import * as classNames from 'classnames';
import * as greendot from '../../img/greendot.svg';
import * as redx from '../../img/redx.svg';
import * as whitetriangle from '../../img/whitetriangle.svg';

import './component.sass';

export interface ReduxStateProps {
  mockApiEnabled: boolean;
}

export interface ReduxDispatchProps {
  toggleMockApi: () => void;
}

interface State {
  open: boolean;
}

type Props = ReduxStateProps & ReduxDispatchProps;

export class MockApiDropdownComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      open: false
    }
  }

  private handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

  public render() {
    const { mockApiEnabled } = this.props;
    const img = mockApiEnabled ? <img src={greendot} alt='enabled' /> : <img src={redx} alt='disabled' />;

    const dropdownClass = classNames({
      'mock-api__menu': true,
      'transition': true,
      'open': this.state.open,
    });

    const triangleClass = classNames({
      'mock-api__triangle': true,
      'open': this.state.open,
    });

    return (
      <div className='mock-api__dropdown' onClick={this.handleClick} tabIndex={0}>
        <div className='mock-api__header'>{img} Mock Responses <img className={triangleClass} src={whitetriangle} alt='open or close' /></div>
        <div className={dropdownClass}>
          <ul>
            <li>
              <div onClick={this.props.toggleMockApi}>{mockApiEnabled ? 'Disable' : 'Enable'}</div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
