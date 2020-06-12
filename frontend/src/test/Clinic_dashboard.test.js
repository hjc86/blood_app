import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import ClinicDashboard  from '../containers/clinic_dashboard'

describe('<ClinicDashboard />', () => {
    
  it('mounts to DOM', () => {
      const div = document.createElement('div');
      ReactDOM.render(<ClinicDashboard  />, div);
      ReactDOM.unmountComponentAtNode(div);
  });

  let wrapper;
  beforeEach(() => wrapper = shallow(<ClinicDashboard  />));
  it('Renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
  })

  it('should render a <div />', () => {
      expect(wrapper.find('div').length).toEqual(1);
  });


})