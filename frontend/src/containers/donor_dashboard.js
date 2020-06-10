import React from 'react';
import NavBar from '../components/navbar_dashboard';
import Scheduler from '../components/scheduler';
import { connect } from 'react-redux';

import DonorCard from '../components/followers';


class DonorDashboard extends React.Component {

    render() {
        return (
            <div>
            <NavBar />
            <DonorCard />
            <Scheduler />
            </div>
        )
    }
}

export default connect() (DonorDashboard);