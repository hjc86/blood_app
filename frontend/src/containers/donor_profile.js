import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from '../components/navbar_dashboard';
import { updateProfile } from '../action-creators/updateProfile';
import { createAccount } from '../action-creators/createAccount';
import { login } from '../action-creators/login';
import { Redirect } from 'react-router-dom'


const mapStateToProps = state => ({
    // ...state
    profile: state.login.profile,
    token: state.login.token,
    updateProfile: state.updateProfile.update
})

const mapDispatchToProps = dispatch => ({
    update: (credentials,token) => dispatch(updateProfile(credentials,token))
})

class Donor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile:{
                "first_name": this.props.profile.first_name,
                "last_name": this.props.profile.last_name,
                "date_of_birth": this.props.profile.date_of_birth,
                "postcode": this.props.profile.postcode 
            },
            token: this.props.token
        
        }
    }

    changeHandler = (event) =>  {
        let state = this.state 

        switch (event.target.name) {
            case "firstName": 
                state.profile.first_name = event.target.value
                this.setState(state);
                break;
            case "surname":
                state.profile.last_name = event.target.value
                this.setState(state);
                break;
            case "dateOfBirth":
                state.profile.date_of_birth = event.target.value
                this.setState(state);
                break;
            case "postcode":
                state.profile.postcode = event.target.value
                this.setState(state);
                break;
        }
    }

    updateProfile = async (event) => {
        await event.preventDefault()
        console.log("updating profile")
        //if(!Object.values(this.state.profile).includes(null)){
            await this.props.update(this.state.profile, this.state.token)
        //}
    }

    render() {

        console.log("value" ,this.state.updateResponse)
      
        //if(this.props.updateResponse != undefined){
            
            if(this.props.updateProfile === 200){
                return  <Redirect to='/donor-dashboard'/> 
            }

        //}
            
        
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
                        value={this.state.profile.first_name} 
                        type="text"
                        placeholder="Insert First Name"
                        required>
                    </input>
                    <input 
                        className="form-control"
                        name="surname"
                        onChange={this.changeHandler}
                        value={this.state.profile.last_name} 
                        type="text"
                        placeholder="Insert Surname"
                        required>
                    </input>
                    <br />
                    <label>Date of Birth:</label>
                    <input 
                        className="form-control"
                        name="dateOfBirth"
                        onChange={this.changeHandler} 
                        value={this.state.profile.date_of_birth}
                        type="date"
                        placeholder="eg Date/Month/Year"
                        required>
                    </input>
                    <br />
                    <label>Postcode:</label>
                    <input 
                        className="form-control"
                        name="postcode"
                        onChange={this.changeHandler}
                        value={this.state.profile.postcode} 

                        type="text"
                        placeholder="eg. CR3 6LD"
                        required>
                    </input>
                    {/* <Link to={{pathname:'/donor-dashboard'}}><button className='passwordButton btn btn-primary mt-3' type='submit'>Create</button></Link> */}
                    <button className='passwordButton btn btn-primary' type='submit' onClick={(event)=>this.updateProfile(event)}>Create</button>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}





export default connect(mapStateToProps, mapDispatchToProps) (Donor);
//export default Donor;
