import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
// import fetch from './test/__mocks__/fetch'

global.fetch = fetch;
Enzyme.configure({ adapter: new EnzymeAdapter() });