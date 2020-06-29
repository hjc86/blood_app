import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from '../components/navbar_home';

import logo from '../img/red-blood-cells.png';

import { createAccount } from '../action-creators/createAccount';
import { login } from '../action-creators/login';
import { Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "create" : {"username": null, "password": null, "passwordTwo": null, "is_clinic" : null},
            "signIn" : {"username": null, "password": null}
        }
      
    }

    
    createHandler = (event) => {
        if ((this.state.create.username && this.state.create.password && this.state.create.passwordTwo && this.state.create.is_clinic) === (null || "")) {
            return null
        } else if (this.state.create.password !== this.state.create.passwordTwo) {
            return null
        } else { 
            delete this.state.create['passwordTwo']
            this.props.createAccount(this.state.create)
        }
    }

    
    loginHandler = async (event) => {
        if ((this.state.signIn.username && this.state.signIn.password) === (null || "")) {
            return null
        } else { 
   
            await this.props.login(this.state.signIn)
        
        }
    }


    changeHandler = (event) =>  {
        let state = this.state 
        switch (event.target.name) {
            case "signInUsername": 
                state.signIn.username = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "signInPassword":
                state.signIn.password = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "createUsername":
                state.create.username = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "createPassword":
                state.create.password = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "createPasswordTwo":
                state.create.passwordTwo = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "createOption":
                if (event.target.value === "donor") {
                    state.create.is_clinic = false  
                } else if (event.target.value === "clinic") {
                    state.create.is_clinic = true
                } else if (event.target.value === "choose") {
                    state.create.is_clinic = null
                }
                this.setState(state);
                console.log(state)

                break;
        }
    }

    // static defaultProps = {
	// 	avatar: '',
	// 	first_name: '',
	// 	last_name: '',
	// };

    render() {
        let createButton
        if (this.state.create.is_clinic === false) {
            createButton = <button className='passwordButton btn btn-primary' type='submit' onClick={this.createHandler}>Create</button>
            
            // createButton =
            // <Link to={{pathname:'/donor-profile'}}><button className='passwordButton btn btn-primary' type='submit'>Create</button></Link>
        } 
        else if (this.state.create.is_clinic === true) {
            createButton = <button className='passwordButton btn btn-primary' type='submit' onClick={this.createHandler}>Create</button>
            // <Link to={{pathname:'/clinic-profile'}}><button className='passwordButton btn btn-primary' type='submit'>Create</button></Link>

        }


        let status
        console.log("creaet accounte response",this.props.createAccountStatus)
        if (this.props.createAccountStatus === 201) {
            status = <p>{"Account created successfully"}</p>
        } 

    
        console.log("default profile date",this.props.profileData)
        // const redirect = Object.values(this.props.profile).includes(null) && (this.props.profile.is_clinic==="False")
        if(this.props.profile.is_clinic === 'True'){

            if(Object.values(this.props.profile).includes(null)){
                return <Redirect to='/clinic-profile'/>
            }    
            else if(!Object.values(this.props.profile).includes(null)) {
                return <Redirect to='/clinic-dashboard'/>
            }
        }   

        else if(this.props.profile.is_clinic==='False'){

            if(Object.values(this.props.profile).includes(null)){
                return <Redirect to='/donor-profile'/>
            }    
            else if(!Object.values(this.props.profile).includes(null)) {
                return <Redirect to='/donor-dashboard'/>
            }
            
        }

        return (


            <div>
            < NavBar />
            <div className="container-fluid pt-3">
            <div className="text-center mb-5 justify-content-center" >   
            <h1 className="display-1">BE A D<img className="mb-3 justify-content-center" src={logo} alt="profile picture" style={{width: "70px"}}/>NOR</h1>
            </div>
                <div className="row justify-content-center">
                    <div className="col-5 p-2 m-2 ">
                        <div className="container mr-4 p-3" style={{backgroundColor: "#dfe6e9"}}>
                        <form>
                        <h2>Sign In</h2>
                        <p>To an existing account</p>
                        <br />
                  
                        <input
                            className="form-control"
                            name="signInUsername" 
                            onChange={this.changeHandler}
                            type="text"
                            placeholder="eg. Us3rname248"
                            required>

                        </input>
                        <br />
                  
                        <input 
                            className="form-control"
                            name="signInPassword"
                            onChange={this.changeHandler} 
                            type="password"
                            placeholder="eg. Passw0rd928"
                            required>
                        </input>
                        </form>
                        </div>
                        < br/>
                        <button className='loginUserButton btn btn-danger' type='submit' onClick={this.loginHandler} >Log In</button>
                    </div>
                    <div className="col-3">
                        <form>
                        <h2>Create</h2>
                        <p>A new free account</p>
                        <p>It's free to join and easy to use. Continue on to create your Red Cells account and be a part of saving lives through blood donation!</p>
                        <div className="form-group">
                            <div>
                              
                                <input 
                                    className="form-control"
                                    name="createUsername" 
                                    type="text"
                                    onChange={this.changeHandler}
                                    placeholder="Insert Username">
                                </input>
                                <br />
                             
                                <input
                                    className="form-control" 
                                    name="createPassword"
                                    onChange={this.changeHandler} 
                                    type="password"
                                    placeholder="Insert Password">
                                </input>
                                <input
                                    className="form-control" 
                                    name="createPasswordTwo"
                                    onChange={this.changeHandler} 
                                    type="password"
                                    placeholder="Confirm Password">
                                </input>
                        </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-2">
                            <label>Account type:</label>
                            <select name="createOption"
                            onChange={this.changeHandler} 
                            className="form-control col-xs-2">
                                <option value="choose">Please Select</option>
                                <option value="donor">Donor</option>
                                <option value="clinic">Clinic</option>
                            </select>
                            </div>
                        </div>
                        </form>
                        {createButton}<br/>
                        {status}
                        </div>
                </div>
            </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({

    createAccountStatus: state.createAccount.status,
    loginStatus: state.login.status,
    profile: state.login.profile
    // token: state.login.token 

})

const mapDispatchToProps = dispatch => ({

    createAccount: (create) => dispatch(createAccount(create)),
    login: (credentials) => dispatch(login(credentials))
})


export default connect(mapStateToProps, mapDispatchToProps) (Login);
