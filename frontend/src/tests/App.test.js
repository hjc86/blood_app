import React from 'react';
import App from '../App';
import { shallow, mount } from 'enzyme';
import { Route } from 'react-router-dom';


import Login from '../containers/login';
import DonorProfile from '../containers/donor_profile';
import ClinicProfile from '../containers/clinic_profile';
import ClinicDashboard from '../containers/clinic_dashboard';
import DonorDashboard from '../containers/donor_dashboard';

describe('App', () => {
  let wrapper;
  beforeEach(() => { wrapper = shallow(<App />);
  });

  test('contains Routes', () => {
    expect(wrapper.containsMatchingElement(<Route />)).toEqual(true);
  });

  test('contains 5 Routes', () => {
    console.log(wrapper.debug());
    expect((wrapper.find('Route').length)).toEqual(5);
  });

   test('Route to Login is exact', () => {     
    let wrap = shallow(<App />);                                 
    let route = wrap.find(<Route path='/' exact component={Login}/>);
    expect(route).toBeTruthy();
   });

   test('Route to Donor profile is exact', () => {   
    let wrap = shallow(<App />);                                       
    let route = wrap.find( <Route path='/donor-profile' exact component={DonorProfile}/>);
    expect(route).toBeTruthy();
   });

  test('Route to Clinic profile is exact', () => {   
    let wrap = shallow(<App />);                                       
    let route = wrap.find( <Route path='/clinic-profile' exact component={ClinicProfile}
  />);
    expect(route).toBeTruthy();
  });

  test('Route to Donor Dashboard is exact', () => {   
    let wrap = shallow(<App />);                                       
    let route = wrap.find( <Route path='/donor-dashboard' exact component={DonorDashboard}
  />);
    expect(route).toBeTruthy();
  });

  test('Route to Clinic dashboard is exact', () => {   
    let wrap = shallow(<App />);                                       
    let route = wrap.find( <Route path='/clinic-dashboard' exact component={ClinicDashboard}
  />);
    expect(route).toBeTruthy();
  });

    
});