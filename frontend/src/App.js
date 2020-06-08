import React from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Homepage from './containers/homepage';
import Donor from './components/donor_profile';
import Clinic from './components/clinic_profile';

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
                      component={Donor}

                  />
                  <Route
                      path='/clinic-profile'
                      exact 
                      component={Clinic}
                  />
                  <Route
                      path='/donor-dashboard'
                      exact 
                      component={Clinic}
                  />
                  <Route
                      path='/clinic-dashboard'
                      exact 
                      component={Clinic}
                  />
               </Switch>
            </Router>
        </div>
    );
}

export default App;
