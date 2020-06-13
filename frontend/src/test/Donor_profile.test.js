import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import Donor from '../containers/donor_profile'

describe('<Donor/>', () => {
    
  it('mounts to DOM', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Donor />, div);
      ReactDOM.unmountComponentAtNode(div);
  });

  let wrapper;
  beforeEach(() => wrapper = shallow(<Donor />));
  it('Renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
  })

  it('should render a <div />', () => {
      expect(wrapper.find('div').length).toEqual(4);
  });

  it('should render a <form />', () => {
    expect(wrapper.find('form').length).toEqual(1);
    });

    it('should render a <p/>', () => {
        expect(wrapper.find('p').length).toEqual(1);
    });

    it('should render a <label />', () => {
        expect(wrapper.find('label').length).toEqual(4);
    });

    it('should render a <input />', () => {
      expect(wrapper.find('input').length).toEqual(4);
  });



})