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
   
    render() {
        return (
            <div>
                <NavBar />
                <div className="container-fluid">
                <form>
                    <label>Donor Profile</label>
                    <p>By creating this account......</p>
    
                    <label>Name:</label>
                    <input 
                        name="firstName" 
                        type="text"
                        placeholder="Insert First Name">
                    </input>
                    <input 
                        name="surname" 
                        type="password"
                        placeholder="Insert Surname">
                    </input>
                    <br />
                    <label>Date of Birth:</label>
                    <input 
                        name="dateOfBirth" 
                        type="date"
                        placeholder="eg Date/Month/Year">
                    </input>
                    <br />
                    <label>Postcode:</label>
                    <input 
                        name="postcode" 
                        type="text"
                        placeholder="eg. CR3 6LD">
                    </input>
                    </form>
                    <Link to={{pathname:'/donor-dashboard'}}><button className='passwordButton btn btn-primary' type='submit'>Create</button></Link>
                </div>
            </div>
        )
    }
}


export default Donor;