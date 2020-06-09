import React from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './containers/login';
import DonorProfile from './containers/donor_profile';
import ClinicProfile from './containers/clinic_profile';
import ClinicDashboard from './containers/clinic_dashboard';
import DonorDashboard from './containers/donor_dashboard';

const App = () => {
    return (
      <div className="Home">
            <Router>
              <Switch>
                  <Route 
                      path='/'
                      exact 
                      component={Login}
                  />
                  <Route 
                      path='/donor-profile'
                      exact 
                      component={DonorProfile}

                  />
                  <Route
                      path='/clinic-profile'
                      exact 
                      component={ClinicProfile}
                  />
                  <Route
                      path='/donor-dashboard'
                      exact 
                      component={DonorDashboard}
                  />
                  <Route
                      path='/clinic-dashboard'
                      exact 
                      component={ClinicDashboard}
                  />
               </Switch>
            </Router>
        </div>
    );
}

export default App;
