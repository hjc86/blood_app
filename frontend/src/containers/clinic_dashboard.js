import React from 'react';
import NavBar from '../components/navbar_dashboard';
import { connect } from 'react-redux';

import ClinicAppointments from '../components/clinic_appointments';

class ClinicDashboard extends React.Component {
    

    render() {

        return (
            <div>
                <NavBar />
                <ClinicAppointments />
            </div>
        )
    }
}

// export default connect() (ClinicDashboard);

export default ClinicDashboard

