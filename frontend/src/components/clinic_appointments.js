import React from 'react';
import { connect } from 'react-redux';

import clinic from "../img/hospital.png";
import image from "../img/user.png";



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
            // "isValidated": false,
            "requirements": "No parking available",
            "Donors": [{
                "id": 0,
                "firstname": "Jimbo",
                "surname": "Fish",
                "dateOfBirth": "1836-10-28",
                "postcode": "PA75 5TB",
                "appointment": {"Monday": [["10:00"],["11:00"]]},
                "isValidated": false
                },
                {
                "id": 1,
                "firstname": "Susan",
                "surname": "Tofu",
                "dateOfBirth": "1889-10-23",
                "postcode": "PJ8 K89",
                "appointment": {"Tuesday": [["11:00"],["12:00"]]},
                "isValidated": false
                },
                {
                "id": 2,
                "firstname": "Steven",
                "surname": "Beef",
                "dateOfBirth": "1500-80-28",
                "postcode": "BT5 7HH",
                "appointment": {"Wednesday": [["12:00"],["13:00"]]},
                "isValidated": false
                },
                {
                "id": 3,
                "firstname": "Helder",
                "surname": "Chicken",
                "dateOfBirth": "2302-07-28",
                "postcode": "DS8 5LB",
                "appointment": {"Friday": [["14:00"],["15:00"]]},
                "isValidated": false
                },]
        };
        
    };

    changeHandler = () => {
    let donorval = {...this.state.Donors}
    donorval.isValidated = true;
    this.setState({donorval})
    console.log(donorval)
    }

    // changeHandler = () => {
    //     this.setState({isValidated: !this.state.isValidated})
    //     console.log(this.state)
    //   } 

    //   changeHandler = () => {
    //     let state = this.state.Donors
    //     state.isValidated = true
    //     this.setState({
    //     isValidated: state
    //     })
    //     console.log(state)
    //   } 


    render() {
        return (
            <div className="container-fluid">
            <div className="m-3 mt-3 justify-content-center text-center">
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
            <div className="m-3 justify-content-center text-center mt-5">
                <h2>Appointments</h2>
            <div className="container-fluid row">
            {this.state.Donors.map((info) => {
            return <div className="col-3 mt-5">
                <img src={image} alt="profile picture" style={{width: "40px"}}/>
                <p>Donor ID: {info.id}</p> 
                <p>Donor: {info.firstname} {info.surname}</p> 
                <p>Date of Birth: {info.dateOfBirth}</p> 
                <p>Postcode:{info.postcode}</p> 
                <p>Appointment:{info.appointment[0]}</p>
                <button className="btn btn-primary m-3" name="validate" onClick={this.changeHandler}>Check In</button>
                </div>
            })}
            </div>
            </div>
            </div>
        )
    }
}

export default connect() (ClinicAppointments);