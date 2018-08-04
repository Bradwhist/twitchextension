import * as React from 'react';
import * as line from '../img/rig_line.png';
import * as plus from '../img/plus_icon.png';
import './component.sass'

interface ExtensionViewButtonProps {
  onClick: () => void;
}

type Props = ExtensionViewButtonProps;
export class ExtensionViewButton extends React.Component<Props> {
  public render() {
    return (
      <div className='button-wrapper'>
        <img alt='line' className='background' src={line} />
        <div className="circle-button" onClick={this.props.onClick}>
          <img alt='Add new view' src={plus} />
        </div>
      </div>
    )
  }
}
