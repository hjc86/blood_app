import React from 'react';
import NavBar from '../components/navbar_dashboard';
import Scheduler from '../components/scheduler';
import { connect } from 'react-redux';

import Followers from '../components/followers';
import DonorCard from '../components/donorCard';
import BloodInfo from '../components/blood_info'


class DonorDashboard extends React.Component {

    render() {
        return (
            
            <div>
                <NavBar />
                <DonorCard />
              
                <Followers/>
              
                <Scheduler />
                <BloodInfo />
            </div>

        )
    }
}

export default connect() (DonorDashboard);
// export default DonorDashboard;