import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from '../components/navbar_home';
import { simpleAction } from '../action-creators/simpleAction';
import { createAccount } from '../action-creators/createAccount';
import { login } from '../action-creators/login';

const mapStateToProps = state => {
    const object = {};
    try {
        object.createAccountResponse = state.createAccount
    } catch {
        // Something
    };
    try {
        object.loginResponse = {
            token: state.loginResponse.token,
            profile: state.loginResponse.profile
        }
    } catch {
        // Something
    };
    // createAccountResponse: state.createAccount,
    // loginResponse: {
    //     token: state.loginResponse.token,
    //     profile: state.loginResponse.profile
    // }
    return {details: object}
}
const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction()),
    createAccount: (create) => dispatch(createAccount(create)),
    login: (credentials) => dispatch(login(credentials))
})

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "create" : {"username": null, "password": null, "passwordTwo": null, "is_clinic" : null},
            "signIn" : {"username": null, "password": null}
        }
        this.changeHandler = this.changeHandler.bind(this);
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

    loginHandler = (event) => {
        if ((this.state.signIn.username && this.state.signIn.password) === (null || "")) {
            return null
        } else { 
            console.log("===>",this.state.signIn)
            this.props.login(this.state.signIn)
        
        }
    }

    simpleAction = (event) => {
        this.props.simpleAction();
        console.log(this.props);
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

    checkProfile =()=>{
        
        console.log(this.props.loginResponse.profile)
        let profile=this.props.loginResponse.profile
        
        if (Object.values(profile).includes(null)){//
            console.log("we have nulls in the profile send to page to update")
            // to profile
        }
        else{
            console.log("profile complete send to dashboard")
            // to dashboard
        }
        
        // this.props.history.push('');
        


    }

    render() {
        let createButton
        if (this.state.create.is_clinic === false) {
            createButton = <button className='passwordButton btn btn-primary' type='submit' onClick={this.createHandler}>Create</button>
            
            // createButton =
            // <Link to={{pathname:'/donor-profile'}}><button className='passwordButton btn btn-primary' type='submit'>Create</button></Link>

        } else if (this.state.create.is_clinic === true) {
            // createButton =
            // <Link to={{pathname:'/clinic-profile'}}><button className='passwordButton btn btn-primary' type='submit'>Create</button></Link>

        }
        let status
        if (this.props.createAccountResponse === undefined) {
            status = <p></p>
        } else if (this.props.createAccountResponse.status === 201) {
            status = <p>{"Account created successfully"}</p>
        } else {
            status = <p>{"Creation failed"}</p>
        }
        

        return (
            <div>
            < NavBar />
            <div className="container-fluid pt-5">
                <div className="row justify-content-center">
                    <div className="col-3">
                        <form>
                        <label>Sign In</label>
                        <p>To an existing account</p>
                        <br />
                        <label>Username:</label>
                        <input
                            className="form-control"
                            name="signInUsername" 
                            onChange={this.changeHandler}
                            type="text"
                            placeholder="eg. Us3rname248">
                        </input>
                        <br />
                        <label>Password:</label>
                        <input 
                            className="form-control"
                            name="signInPassword"
                            onChange={this.changeHandler} 
                            type="password"
                            placeholder="eg. Passw0rd928">
                        </input>
                        </form>
                        < br/>
                        <button className='loginUserButton btn btn-danger' type='submit' onClick={this.loginHandler} >Log In</button>
                    </div>

                    <div className="col-3">
                        <form>
                        <label>Create</label>
                        <p>A new free account</p>
                        <p>It's free to join and easy to use. Continue on to create your Red Cells account and be a part of saving lives through blood donation!</p>
                        <div className="form-group">
                            <div>
                                <label>Username:</label>
                                <input 
                                    className="form-control"
                                    name="createUsername" 
                                    type="text"
                                    onChange={this.changeHandler}
                                    placeholder="Insert Username">
                                </input>
                                <br />
                                <label>Password:</label>
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
                        {this.props.details === undefined ? "no dice":"dice" }
                    </div>
                </div>
            </div>
            </div>
        
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login);