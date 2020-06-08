import React from 'react';
import NavBar from './navbar_dashboard';
import Scheduler from './scheduler';

class DonorDashboard extends React.Component {

    render() {
        return (
            <div>
            <NavBar />
                <div>
                <h1>Hello im Donor Dashboard</h1>
                <h2>Donor Profile</h2>
                <h2>Booking / Scheduling appt</h2>
            < Scheduler />
                <h2>Friends / nudge</h2>
                <h2>Map</h2>
                </div>
            </div>
        )
    }
}

export default DonorDashboard;