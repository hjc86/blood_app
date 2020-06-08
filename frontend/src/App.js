import React from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Homepage from './containers/homepage';
import DonorProfile from './components/donor_profile';
import ClinicProfile from './components/clinic_profile';
import ClinicDashboard from './components/clinic_dashboard';
import DonorDashboard from './components/donor_dashboard';

const App = () => {
    return (
      <div className="Home">
            <Router>
              <Switch>
                  <Route 
                      path='/'
                      exact 
                      component={Homepage}
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
