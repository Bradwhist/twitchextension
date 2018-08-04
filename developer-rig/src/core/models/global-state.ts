import { RigState } from '../state/rig';
import { SessionState } from '../state/session';
import { ExtensionsState } from '../state/extensions';
import { ProductState } from '../state/products';

export interface GlobalState{
  rig: RigState;
  session: SessionState;
  extensions: ExtensionsState;
  products: ProductState;
}
