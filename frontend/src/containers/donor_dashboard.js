import React from 'react';
import NavBar from '../components/navbar_dashboard';
import Scheduler from '../components/scheduler';
import { connect } from 'react-redux';

import DonorCard from '../components/donor_card';

class DonorDashboard extends React.Component {

    render() {
        return (
            <div>
            <NavBar />
            <DonorCard />
            <Scheduler />
                <h2>Friends / nudge</h2>
                <h2>Map</h2>
                </div>
        )
    }
}

export default connect() (DonorDashboard);