import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from '../components/navbar_dashboard';
import Timeslot from '../components/timeslots';
import ClinicScheduler from '../components/clinic-scheduler';
import { updateProfile } from '../action-creators/updateProfile';



const mapStateToProps = state => ({
    // ...state
    profile: state.login.profile,
    token: state.login.token,
    updateProfile: state.updateProfile.update
})

const mapDispatchToProps = dispatch => ({
    update: (credentials,token) => dispatch(updateProfile(credentials,token))
})

class Clinic extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                profile:{
                    "address": {
                        "name": this.props.profile.name,
                        "address_line_1": this.props.profile.address_line_1,
                        "address_line_2":  this.props.profile.address_line_2,
                        "city":  this.props.profile.city,
                        "county":  this.props.profile.county,
                        "postcode":  this.props.profile.postcode,
                    },
                    "timeslots": {"Monday": [["10:00","13:00"],["14:00","17:00"]],
                        "Tuesday": [["09:00","13:00"],["14:00","17:00"]], 
                        "Wednesday": [["09:00","13:00"],["14:00","17:00"]], 
                        "Thursday": [["09:00","13:00"],["14:00","17:00"]], 
                        "Friday": [["09:00","13:00"],["14:00","17:00"]],
                        "Saturday": [],
                        "Sunday": []
                    },
                   
                },
                token: this.props.token
            }
    }
    

    updateProfile = async (event) => {
        await event.preventDefault()
        console.log("updating profile")
        console.log(this.state.profile)
        await this.props.update(this.state.profile, this.state.token)
    }

    changeHandler = (event, start, end) => {

        let state = this.state 
        switch (event.target.name) {
            case "removeTimeSlot":
                state.profile.timeslots[start].splice(end, 1);
                this.setState(state);
                console.log(start, end)
                break;
            case "addTimeSlot":
                // Check times are not null
                if (end[0]===null || end[1]===null || end[1]==="" || end[1]==="") {
                    break;
                }
                // Check times make sense
                if (parseInt(end[0].split(":")[0])*60+parseInt(end[0].split(":")[1]) >= parseInt(end[1].split(":")[0])*60+parseInt(end[1].split(":")[1])) {
                    break;
                }
                state.profile.timeslots[start].push(end);
                this.setState(state);
                console.log(start, end)
                break;    
            case "name": 
                state.profile.name = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "address1": 
                state.profile.address.address_line_1 = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "address2": 
                state.profile.address.address_line_2 = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "city": 
                state.profile.address.city = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "county": 
                state.profile.address.county = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "postcode": 
                state.profile.address.postcode = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "requirements": 
                state.profile.requirements = event.target.value
                this.setState(state);
                console.log(state)
                break;
        }
    }

    printTimeTable = () =>{
        console.log("printing timtable")
        console.log(this.state.profile.timeslots)
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div style={{display: "flex", flexDirection: "column"}}>

                <form>
                    <label className="display-4 text-center">Clinic Profile</label>
                    <br/>
                    <label>Clinic Name:</label>
                        <input 
                        name="name"
                        className="form-control"
                        // value={this.state.address.address_line_1}
                        onChange={this.changeHandler}
                        type="text"
                        placeholder="name of clinic">
                        </input>
                    <br />
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
                    

            
                <Timeslot changeHandler={this.changeHandler} timeslots={this.state.profile.timeslots}/>

                {/* <Link to={{pathname:'/clinic-dashboard'}}> */}
                    {/* <button className="passwordButton btn btn-primary btn-block" type='submit' onClick={()=>this.printTimeTable()}>Submit</button> */}
                    <button className='passwordButton btn btn-primary' type='submit' onClick={(event)=>this.updateProfile(event)}>Submit</button>
                {/* </Link> */}

                </div>

                </div>   
             )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
// export default Clinic;