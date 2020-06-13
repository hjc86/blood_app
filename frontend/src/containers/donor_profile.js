import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from '../components/navbar_dashboard';
import { simpleAction } from '../action-creators/simpleAction';
import { update } from '../action-creators/update';
import { createAccount } from '../action-creators/createAccount';
import { login } from '../action-creators/login';
import { Redirect } from 'react-router-dom'


const mapStateToProps = state => ({
    // ...state
    loginResponse: state.login,
    updateResponse: state.update
})

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction()),
    update: (credentials,token) => dispatch(update(credentials,token))
})


class Donor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // "firstName": "Steven",
            // "surname": "Berrisford",
            // "dateOfBirth": "1996-10-28",
            // "postcode": "CR3 6LD"
            profile:{
                "first_name": this.props.loginResponse.token.profileData.first_name,
                "last_name": this.props.loginResponse.token.profileData.last_name,
                "date_of_birth": this.props.loginResponse.token.profileData.date_of_birth,
                "postcode": this.props.loginResponse.token.profileData.postcode 
            },
            token: this.props.loginResponse.token.tokenData
        
        }
    }

    changeHandler = (event) =>  {
        let state = this.state 

        switch (event.target.name) {
            case "firstName": 
                state.profile.first_name = event.target.value
                this.setState(state);
                //this.setState({profile.first_name: event.targtet.value})
                
                // this.setState({);
                //console.log(state)
                break;
            case "surname":
                state.profile.last_name = event.target.value
                this.setState(state);
                //console.log(state)
                break;
            case "dateOfBirth":
                state.profile.date_of_birth = event.target.value
                this.setState(state);
                //console.log(state)
                break;
            case "postcode":
                state.profile.postcode = event.target.value
                this.setState(state);
                //console.log(state)
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

        console.log("value",this.props.updateResponse)
    
        
        if(this.props.updateResponse.update != undefined){
            
            if(this.props.updateResponse.update === 200){
                return  <Redirect to='/donor-dashboard'/> 
            }

        }
            
        
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

                        // value={this.state.firstName} 

                        value={this.state.profile.first_name} 

                        type="text"
                        placeholder="Insert First Name"
                        required>
                    </input>
                    <input 
                        className="form-control"
                        name="surname"
                        onChange={this.changeHandler}

                        // value={this.state.surname}  

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

                        // value={this.state.dateOfBirth}

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

                        // value={this.state.postcode} 

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


// export default connect(mapStateToProps, mapDispatchToProps) (Donor);
export default Donor;
