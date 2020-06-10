import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link, BrowserRouter } from 'react-router-dom';


import Login from '../containers/login';
import DonorProfile from '../containers/donor_profile';
import ClinicProfile from '../containers/clinic_profile';


describe('Login', () => {
    let wrapper;
    
   test('Link to /donor-profile when donor button clicked', () => {   
    let wrap = shallow(<BrowserRouter><Login location={<DonorProfile />} /></BrowserRouter> );                                       
    let link = wrap.find( <Link to='/donor-profile' /> );
    expect(link).toBeTruthy();
    });

    test('Link to /clinic-profile when clinic button clicked', () => {   
        let wrap = shallow(<BrowserRouter><Login location={<ClinicProfile />} /></BrowserRouter> );                                       
        let link = wrap.find( <Link to='/clinic-profile' /> );
        expect(link).toBeTruthy();
    });

    test('contains loginDiv', () => {
        expect(wrapper.find('.loginDiv')).toBeTruthy();
      }); 


});