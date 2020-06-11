import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from '../components/navbar_home';
import { simpleAction } from '../action-creators/simpleAction';
import logo from '../img/red-blood-cells.png';
const mapStateToProps = state => ({
    ...state
})
const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction())
})
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "create" : {"username": null, "password": null, "passwordTwo": null, "isClinic" : null},
            "signIn" : {"username": null, "password": null}
        }
        this.changeHandler = this.changeHandler.bind(this);
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
                if (this.state.passwordTwo !== this.state.password){
                    alert('wront')
                } 
                console.log(state)
                break;
            case "createOption":
                if (event.target.value === "donor") {
                    state.create.isClinic = false  
                } else if (event.target.value === "clinic") {
                    state.create.isClinic = true
                } else if (event.target.value === "choose") {
                    state.create.isClinic = null
                }
                this.setState(state);
                console.log(state)
                break;
        }
    }
    render() {
        let createButton
        if ((this.state.create.isClinic === false) && (this.state.create.passwordTwo === this.state.create.password)) {
            createButton =
            <Link to={{pathname:'/donor-profile'}}><button className='passwordButton btn btn-primary' type='submit'>Create</button></Link>
        }else if ((this.state.create.isClinic === false) && (this.state.create.passwordTwo !== this.state.create.password)){
        //    alert('Password did not match. Please try again.')
        document.getElementById('info1').innerHTML = "Password did not match. Please try again."
        }else if ((this.state.create.isClinic === true) && (this.state.create.passwordTwo === this.state.create.password)) {
        createButton =
        <Link to={{pathname:'/clinic-profile'}}><button className='passwordButton btn btn-primary' type='submit'>Create</button></Link>
        }else if ((this.state.create.isClinic === true) && (this.state.create.passwordTwo !== this.state.create.password)){
            document.getElementById('info1').innerHTML = "Password did not match. Please try again." 
         }
        return (
            <div>
            < NavBar />
            <div className="container-fluid pt-3">
            <div className="text-center mb-5">   
            <img className="mt-5" src={logo} alt="profile picture" style={{width: "90px"}}/>
            </div>
                <div className="row justify-content-center">
                    <div className="col-3 p-2 m-2">
                        <form>
                        <h2>Sign In</h2>
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
                        <button className='loginUserButton btn btn-danger' type='submit' >Log In</button>
                    </div>
                    <div className="col-3">
                        <form>
                        <h2>Create</h2>
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
                        {createButton}
                        <p id="info1" className="text-danger"></p>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Login);