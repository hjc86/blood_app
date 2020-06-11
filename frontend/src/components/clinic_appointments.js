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
                "appointment": "Monday 10:00",
                "isValidated": false
                },
                {
                "id": 1,
                "firstname": "Susan",
                "surname": "Tofu",
                "dateOfBirth": "1889-10-23",
                "postcode": "PJ8 K89",
                "appointment": "Tuesday 14:00",
                "isValidated": false
                },
                {
                "id": 2,
                "firstname": "Steven",
                "surname": "Beef",
                "dateOfBirth": "1500-80-28",
                "postcode": "BT5 7HH",
                "appointment": "Wednesday 15:00",
                "isValidated": false
                },
                {
                "id": 3,
                "firstname": "Helder",
                "surname": "Chicken",
                "dateOfBirth": "2302-07-28",
                "postcode": "DS8 5LB",
                "appointment": "Thursday 11:00",
                "isValidated": false
                },{
                    "id": 4,
                    "firstname": "John",
                    "surname": "Doe",
                    "dateOfBirth": "1963-03-03",
                    "postcode": "SW17 9TK",
                    "appointment": "Monday 12:01",
                    "isValidated": false
                    }]
        };
        
    };

    // changeHandler = () => {
    // let donorval = {...this.state.Donors}
    // donorval.isValidated = true;
    // this.setState({donorval})
    // console.log(donorval)
    // }

    // changeHandler = () => {
    //     this.setState({isValidated: !this.state.isValidated})
    //     console.log(this.state)
    //   } 

    //  changeHandler = () => {
    //     const array = [...this.state.Donors];
    //     array[i] = { ...array[i], isValidated: true };
    //     this.setState({ array });
    //     console.log(state)
    //   } 

      changeHandler = () => {
        //Need to find a way to display the correct array number.
        let state = this.state.Donors
        state.isValidated = true
        this.setState({
        isValidated: state
        })
        alert('Is validated!!! Not really.. :(')
        // console.log(position)
        // console.log(state)
      } 


    render() {
        return (
            <div className="container-fluid">
            <div className="m-3 mt-3 justify-content-center text-center">
                    <img className="mt-5" src={clinic} alt="profile picture" style={{width: "90px"}}/>
                    <br/>
                    <label className="display-4">St.Earl_clinic</label>
                    <br />
                    {/* <p>{this.state.address.address_line_1}</p>
                    <p>{this.state.address.address_line_2}</p>
                    <p>{this.state.address.city} , {this.state.address.county}</p>
                    <p>{this.state.address.postcode}</p> */}
                    <p>14 Trampath</p>
                    <p>Balham, Devon</p>
                    <p>EX16 8AA</p>
                    < br/>
                    <p>Status : No parking spaces available</p>
            </div>
            <div className="m-3 justify-content-center text-center mt-5 p-3" style={{backgroundColor: "#dfe6e9"}}>
                <h2>Appointments</h2>
            <div className="container-fluid row">
            {this.state.Donors.map((info) => {
            return <div className="col-3 mt-5 p-3">
                <img src={image} alt="profile picture" style={{width: "40px"}}/>
                <p>Donor ID: {info.id}</p> 
                <p>Donor: {info.firstname} {info.surname}</p> 
                <p>Date of Birth: {info.dateOfBirth}</p> 
                <p>Postcode:{info.postcode}</p> 
                <p>Appointment: {info.appointment}</p>
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