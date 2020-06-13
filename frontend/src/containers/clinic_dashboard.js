import React from 'react';
import NavBar from '../components/navbar_dashboard';
import { connect } from 'react-redux';

class ClinicDashboard extends React.Component {

    render() {

        return (
            <div>
            <NavBar />
                <div>
                <h1>Hello im ClinicDashboard</h1>
                <h2>See appointments for today</h2>
                <h3>validate feature to check in the donor</h3>
                </div>
            </div>
        )
    }
}

// export default connect() (ClinicDashboard);
export default ClinicDashboard