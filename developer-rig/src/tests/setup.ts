import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { mockGlobals } from './globals';

configure({ adapter: new Adapter() });
mockGlobals();
