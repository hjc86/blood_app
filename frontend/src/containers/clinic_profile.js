import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../components/navbar_dashboard';
import Timeslot from '../components/timeslots';

class Clinic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "address": {
                "address_line_1": "75  Ploughley Rd",
                "address_line_2": "TOBERMORY",
                "city": "ISLE OF MULL",
                "county": "Argyll and Bute",
                "postcode": "PA75 5TB",
            },
            "requirements": "I need some stuff in here.",
            "timeslots": {"monday": [["10:00","13:00"],["14:00","17:00"]],
                        "tuesday": [["09:00","13:00"],["14:00","17:00"]], 
                        "wednesday": [["09:00","13:00"],["14:00","17:00"]], 
                        "thursday": [["09:00","13:00"],["14:00","17:00"]], 
                        "friday": [["09:00","13:00"],["14:00","17:00"]]}
        }
        this.timeSlotHandler = this.timeSlotHandler
    }

    timeSlotHandler = (event) => {
        
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container-fluid">
                    <form>
                        <label>Clinic Profile</label>
                        <p>Hello Clinic......</p>
                        <br />
                        <label>Address line 1:</label>
                        <input 
                            name="address"
                            value={this.state.address.address_line_1}
                            type="text"
                            placeholder="eg. 32 Gladstone">
                        </input>
                        <br />
                        <label>Address line 2:</label>
                        <input 
                            name="address"
                            value={this.state.address.address_line_2} 
                            type="text"
                            placeholder="eg. Potter Road">
                        </input>
                        <br />
                        <label>Town/City:</label>
                        <input 
                            name="city"
                            value={this.state.address.city} 
                            type="text"
                            placeholder="Enfield">
                        </input>
                        <br />
                        <label>County:</label>
                        <input 
                            name="county"
                            value={this.state.address.county} 
                            type="text"
                            placeholder="Middlesex">
                        </input>
                        <br />
                        <label>Postcode:</label>
                        <input 
                            name="address" 
                            value={this.state.address.postcode}
                            type="text"
                            placeholder="eg. EN7 3PX">
                        </input>
                        <br />
                        <label>Clinic Requirements:</label>
                        <p>Brief instructions for donors</p>
                        <textarea 
                            name="requirements" 
                            value={this.state.requirements}
                            type="text"
                            placeholder="eg. no parking spaces available">
                        </textarea>
                        <br />
                        </form>
                        <div>
                        < Timeslot timeSlotHandler = {this.timeSlotHandler} timeslots = {this.state.timeslots}/>
                        </div>
                        <Link to={{pathname:'/clinic-dashboard'}}><button className='passwordButton btn btn-primary' type='submit'>Submit</button></Link>
                    </div>
        </div>
        )
    }
}


export default Clinic;