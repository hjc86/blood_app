import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import Login from '../containers/login'

describe('<Login/>', () => {
    
  it('mounts to DOM', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Login />, div);
      ReactDOM.unmountComponentAtNode(div);
  });

  let wrapper;
  beforeEach(() => wrapper = shallow(<Login />));
  it('Renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
  })

  it('should render a <div />', () => {
      expect(wrapper.find('div').length).toEqual(11);
  });

  it('should render a <form />', () => {
    expect(wrapper.find('form').length).toEqual(2);
    });

    it('should render a <p/>', () => {
        expect(wrapper.find('p').length).toEqual(3);
    });

    it('should render a <label />', () => {
        expect(wrapper.find('label').length).toEqual(5);
    });

    it('should render select Component', () =>{
        expect(wrapper.find('select').length).toEqual(1);
    })

    it('should render inputt', () =>{
        expect(wrapper.find('input').length).toEqual(5);
    })

})