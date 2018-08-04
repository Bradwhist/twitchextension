import * as React from 'react';
import './component.sass';
import { ProductTable } from '../product-table-component';

interface ProductManagementViewContainerProps {
  clientId: string;
}

export class ProductManagementViewContainer extends React.Component<ProductManagementViewContainerProps> {
  public render() {
    return (
      <div className='product-container-wrapper'>
        <div className='product-container'>
          <ProductTable clientId={this.props.clientId} />
        </div>
      </div>
    );
  }
}
