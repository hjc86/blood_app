import React from 'react';
import NavBar from '../components/navbar_dashboard';
import Scheduler from '../components/scheduler';
import { connect } from 'react-redux';

import DonorCard from '../components/followers';
import BloodInfo from '../components/blood_info'


class DonorDashboard extends React.Component {

    render() {
        return (
            <div>
            <NavBar />
            <DonorCard />
            <BloodInfo />
            <Scheduler />
            </div>

        )
    }
}

export default connect() (DonorDashboard);