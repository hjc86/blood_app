import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import Clinic from '../containers/clinic_profile'

describe('<Clinic/>', () => {
    
//   it('mounts to DOM', () => {
//       const div = document.createElement('div');
//       ReactDOM.render(<Clinic />, div);
//       ReactDOM.unmountComponentAtNode(div);
//   });

  let wrapper;
  beforeEach(() => wrapper = shallow(<Clinic />));
  it('Renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
  })

  it('should render a <div />', () => {
      expect(wrapper.find('div').length).toEqual(6);
  });

  it('should render a <form />', () => {
    expect(wrapper.find('form').length).toEqual(1);
    });

    it('should render a <p/>', () => {
        expect(wrapper.find('p').length).toEqual(2);
    });

    it('should render a <label />', () => {
        expect(wrapper.find('label').length).toEqual(7);
    });

    it('should render a <input />', () => {
      expect(wrapper.find('input').length).toEqual(5);
  });


})