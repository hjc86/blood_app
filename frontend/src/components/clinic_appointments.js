import React from 'react';
import { connect } from 'react-redux';

import clinic from "../img/hospital.png";



class ClinicAppointments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "address": {
                "address_line_1": "75  Ploughley Rd",
                "address_line_2": "TOBERMORY",
                "city": "ISLE OF MULL",
                "county": "Aantofield",
                "postcode": "PA75 5TB"
            },
            "requirements": "No parking available",
            "timeslots": {"Monday": [["10:00","13:00"],["14:00","17:00"]],
                        "Tuesday": [["09:00","13:00"],["14:00","17:00"]], 
                        "Wednesday": [["09:00","13:00"],["14:00","17:00"]], 
                        "Thursday": [["09:00","13:00"],["14:00","17:00"]], 
                        "Friday": [["09:00","13:00"],["14:00","17:00"]]}
        };
    };



    render() {
        return (
            <div>
            <div className="m-3 justify-content-center text-center">
                    <img src={clinic} alt="profile picture" style={{width: "90px"}}/>
                    <br/>
                    <label className="display-4">Clinic Name</label>
                    <br />
                    <p>{this.state.address.address_line_1}</p>
                    <p>{this.state.address.address_line_2}</p>
                    <p>{this.state.address.city} , {this.state.address.county}</p>
                    <p>{this.state.address.postcode}</p>
                    < br/>
                    <p>Status : {this.state.requirements}</p>
            </div>
            <div>
                <h2>Appointments Table</h2>
                <p>Get timeslots from database to be displayed as table</p>
            </div>
            </div>
        )
    }
}

export default connect() (ClinicAppointments);