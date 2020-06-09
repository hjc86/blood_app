import React from 'react';
import NavBar from '../components/navbar_dashboard';
import Scheduler from '../components/scheduler';
import { connect } from 'react-redux';

class DonorDashboard extends React.Component {

    render() {
        return (
            <div>
            <NavBar />
                <div>
                <h1>Hello im Donor Dashboard</h1>
                <h2>Donor Profile</h2>
            < Scheduler />
                <h2>Friends / nudge</h2>
                <h2>Map</h2>
                </div>
            </div>
        )
    }
}

export default connect() (DonorDashboard);