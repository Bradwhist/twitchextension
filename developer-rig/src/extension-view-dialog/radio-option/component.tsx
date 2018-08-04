import * as React from 'react';
import './component.sass';

interface RadioOptionProps {
  name: string;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  checked: boolean;
}
type Props = RadioOptionProps & React.HTMLAttributes<HTMLInputElement>
export class RadioOption extends React.Component<Props> {
  public render() {
    return (
      <div className='option-div'>
        <label className="option-label">
            <input type="radio" name={this.props.name} value={this.props.value} onChange={this.props.onChange} defaultChecked={this.props.checked}/>
            <span className={this.props.checked ? 'dialog-selected': null}>{this.props.value}</span>
        </label>
      </div>
    )
  }
}
