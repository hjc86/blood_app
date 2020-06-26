import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
                "postcode": "PA75 5TB"
            },
            "requirements": "I need some stuff in here.",
            "time_slots": {"Monday": [["10:00","13:00"],["14:00","17:00"]],
                        "Tuesday": [["09:00","13:00"],["14:00","17:00"]], 
                        "Wednesday": [["09:00","13:00"],["14:00","17:00"]], 
                        "Thursday": [["09:00","13:00"],["14:00","17:00"]], 
                        "Friday": [["09:00","13:00"],["14:00","17:00"]]}
        };
        this.changeHandler = this.changeHandler.bind(this);
    };

    changeHandler = (event, param1, param2) => {

        let state = this.state 
        switch (event.target.name) {
            case "removeTimeSlot":
                state.timeslots[param1].splice(param2, 1);
                this.setState(state);
                console.log(param1, param2)
                break;
            case "addTimeSlot":
                // Check times are not null
                if (param2[0]===null || param2[1]===null || param2[1]==="" || param2[1]==="") {
                    break;
                }
                // Check times make sense
                if (parseInt(param2[0].split(":")[0])*60+parseInt(param2[0].split(":")[1]) >= parseInt(param2[1].split(":")[0])*60+parseInt(param2[1].split(":")[1])) {
                    break;
                }
                state.timeslots[param1].push(param2);
                this.setState(state);
                console.log(param1, param2)
                break;    
            case "address1": 
                state.address.address_line_1 = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "address2": 
                state.address.address_line_2 = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "city": 
                state.address.city = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "county": 
                state.address.county = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "postcode": 
                state.address.postcode = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "requirements": 
                state.requirements = event.target.value
                this.setState(state);
                console.log(state)
                break;
        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container-fluid">
                    <div className="justify-content-around row mt-5">  
                        <div className="justify-content-center col-4 mt-5">
                        <form>
                            <label className="display-4 text-center">Clinic Profile</label>
                            <p className= "text-center">St.Earl_clinic</p>
                        <label>Address line 1:</label>
                        <input 
                            name="address1"
                            className="form-control"
                            // value={this.state.address.address_line_1}
                            onChange={this.changeHandler}
                            type="text"
                            placeholder="eg. 32 Gladstone">
                        </input>
                        <br />
                        <label>Address line 2:</label>
                        <input 
                            name="address2"
                            className="form-control"
                            // value={this.state.address.address_line_2}
                            onChange={this.changeHandler} 
                            type="text"
                            placeholder="eg. Potter Road">
                        </input>
                        <br />
                        <label>Town/City:</label>
                        <input 
                            name="city"
                            className="form-control"
                            // value={this.state.address.city}
                            onChange={this.changeHandler} 
                            type="text"
                            placeholder="Enfield">
                        </input>
                        <br />
                        <label>County:</label>
                        <input 
                            name="county"
                            className="form-control"
                            // value={this.state.address.county}
                            onChange={this.changeHandler} 
                            type="text"
                            placeholder="Middlesex">
                        </input>
                        <br />
                        <label>Postcode:</label>
                        <input 
                            name="postcode" 
                            className="form-control"
                            // value={this.state.address.postcode}
                            onChange={this.changeHandler}
                            type="text"
                            placeholder="eg. EN7 3PX">
                        </input>
                        <br />
                        <label>Clinic Requirements:</label>
                        <p>Brief instructions for donors</p>
                        <textarea 
                            name="requirements" 
                            className="form-control"
                            // value={this.state.requirements}
                            onChange={this.changeHandler}
                            type="text"
                            placeholder="eg. no parking spaces available">
                        </textarea>
                        <br />
                        </form>
                        </div>
                        
                        <div>
                        < Timeslot changeHandler={this.changeHandler} timeslots={this.state.timeslots}/>
                        <div className="container text-center p-5 m-2">
                            <Link to={{pathname:'/clinic-dashboard'}}>
                                <button className="passwordButton btn btn-primary btn-block" type='submit'>Submit</button>
                            </Link>
                        </div>
                        </div>
                        
                    </div>
                    </div>  
        </div>
        )
    }
}


// export default connect() (Clinic);
export default Clinic;