import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../components/navbar_dashboard';
class Donor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "firstName": "Steven",
            "surname": "Berrisford",
            "dateOfBirth": "1996-10-28",
            "postcode": "CR3 6LD"
        }
    }
    changeHandler = (event) =>  {
        let state = this.state 

        switch (event.target.name) {
            case "firstName": 
                state.firstName = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "surname":
                state.surname = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "dateOfBirth":
                state.dateOfBirth = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "postcode":
                state.postcode = event.target.value
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
                    <div className="justify-content-center row mt-5">
                <form className="col-5 ">
                    <div className="text-center">
                    <label className="display-4">Donor Profile</label>
                    <p>By adding a profile to your account you gain access to clinics, appointments and other donors!</p>
                    </div>
                    <label>Name:</label>
                    <input 
                        className="form-control"
                        name="firstName"
                        onChange={this.changeHandler}
                        value={this.state.firstName} 
                        type="text"
                        placeholder="Insert First Name">
                    </input>
                    <input 
                        className="form-control"
                        name="surname"
                        onChange={this.changeHandler}
                        value={this.state.surname}  
                        type="text"
                        placeholder="Insert Surname">
                    </input>
                    <br />
                    <label>Date of Birth:</label>
                    <input 
                        className="form-control"
                        name="dateOfBirth"
                        onChange={this.changeHandler} 
                        value={this.state.dateOfBirth}
                        type="date"
                        placeholder="eg Date/Month/Year">
                    </input>
                    <br />
                    <label>Postcode:</label>
                    <input 
                        className="form-control"
                        name="postcode"
                        onChange={this.changeHandler}
                        value={this.state.postcode} 
                        type="text"
                        placeholder="eg. CR3 6LD">
                    </input>
                    <Link to={{pathname:'/donor-dashboard'}}><button className='passwordButton btn btn-primary mt-3' type='submit'>Create</button></Link>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}


export default Donor;