import * as React from 'react';
import { Product } from '../core/models/product';

interface Props {
  product: Product;
  handleValueChange: ()=>void;
  handleDeprecateClick: ()=>void;
}

export const ProductRow = (props: Props) => {
  const validationErrors = props.product.validationErrors || {};
  const invalid = Object.keys(validationErrors).length > 0;

  return (
    <div className="product-table__row">
      <div className="text-col">
        <input type="text"
          className={validationErrors.displayName ? "form__input invalid" : "form__input"}
          name="displayName"
          required
          maxLength={255}
          value={props.product.displayName}
          onChange={props.handleValueChange}
        />
        {invalid &&
          <p className="invalid-hint">
            {validationErrors.displayName}
          </p>
        }
      </div>
      <div className="text-col">
        <input type="text"
          className={validationErrors.sku ? "form__input invalid" : "form__input"}
          name="sku"
          required
          maxLength={255}
          disabled={props.product.savedInCatalog}
          value={props.product.sku}
          onChange={props.handleValueChange}
        />
        {invalid &&
          <p className="invalid-hint">
            {validationErrors.sku}
          </p>
        }
      </div>
      <div className="text-col">
        <input type="number"
          className={validationErrors.amount ? "form__input invalid" : "form__input"}
          name="amount"
          required
          min="1" max="10000"
          value={props.product.amount}
          onChange={props.handleValueChange}
        />
        {invalid &&
          <p className="invalid-hint">
            {validationErrors.amount}
          </p>
        }
      </div>
      <div className="select-col">
        <select name="inDevelopment"
            className={validationErrors.inDevelopment ? "form__input invalid" : "form__input"}
            value={props.product.inDevelopment}
            onChange={props.handleValueChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {invalid &&
          <p className="invalid-hint">
            {validationErrors.inDevelopment}
          </p>
        }
      </div>
      <div className="select-col">
        <select name="broadcast"
            className={validationErrors.broadcast ? "form__input invalid" : "form__input"}
            value={props.product.broadcast}
            onChange={props.handleValueChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {invalid &&
          <p className="invalid-hint">
            {validationErrors.broadcast}
          </p>
        }
      </div>
      <div className="button-col">
        <button className="product-row__deprecate-button"
            onClick={props.handleDeprecateClick}>
          {props.product.deprecated ? 'Restore' : 'Deprecate'}
        </button>
        {invalid && <p className="invalid-hint"></p>}
      </div>
      <div className="dirty-col">
      <div className={props.product.dirty ? "dirty-indicator" : "dirty-indicator hidden"}>
        <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'>
          <circle cx='5' cy='5' r='3' />
        </svg>
      </div>
      {invalid && <p className="invalid-hint"></p>}
      </div>
    </div>
  );
}
