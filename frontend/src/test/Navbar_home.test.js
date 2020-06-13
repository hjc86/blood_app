import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import Navbar from '../components/navbar_home'

describe('<Navbar/>', () => {
    
  it('mounts to DOM', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Navbar />, div);
      ReactDOM.unmountComponentAtNode(div);
  });

  let wrapper;
  beforeEach(() => wrapper = shallow(<Navbar />));
  it('Renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
  })

  it('should render a <div />', () => {
      expect(wrapper.find('div').length).toEqual(1);
  });


})