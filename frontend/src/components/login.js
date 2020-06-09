import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
   
    render() {
        return (
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
                            name="existingUsername" 
                            type="text"
                            placeholder="eg. Us3rname248">
                        </input>
                        <br />
                        <label>Password:</label>
                        <input 
                            className="form-control"
                            name="password" 
                            type="password"
                            placeholder="eg. Passw0rd928">
                        </input>
                        </form>
                        < br/>
                        <button className='loginUserButton btn btn-danger' type='submit' >Log In</button>
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
                                    name="newUsername" 
                                    type="text"
                                    placeholder="Insert Username">
                                </input>
                                <br />
                                <label>Password:</label>
                                <input
                                    className="form-control" 
                                    name="password" 
                                    type="password"
                                    placeholder="Insert Password">
                                </input>
                        </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-2">
                            <label>Account type:</label>
                            <select name="option" className="form-control col-xs-2">
                                <option value="choose">Please Select</option>
                                <option value="donor">Donor</option>
                                <option value="clinic">Clinic</option>
                            </select>
                            </div>
                        </div>
                        </form>
                        < br/>
                        <Link to={{pathname:'/donor-profile'}}><button className='passwordButton btn btn-primary' type='submit'>Donor</button></Link>
                        <Link to={{pathname:'/clinic-profile'}}><button className='passwordButton btn btn-primary' type='submit'>Clinic</button></Link>
                    </div>
                </div>
            </div>
        
        )
    }
}


export default Login;