import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
   
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <form>
                        <label>Sign In</label>
                        <p>To an existing account</p>
                        <br />
                        <label>Username:</label>
                        <input
                            name="existingUsername" 
                            type="text"
                            placeholder="eg. Us3rname248">
                        </input>
                        <br />
                        <label>Password:</label>
                        <input 
                            name="password" 
                            type="password"
                            placeholder="eg. Passw0rd928">
                        </input>
                        </form>
                        < br/>
                        <button className='loginUserButton btn btn-danger' type='submit' >Log In</button>
                    </div>
                    <div className="col">
                        <form>
                        <label>Create</label>
                        <p>A new free account</p>
                        <p>It's free to join and easy to use. Continue on to create your Red Cells account and be a part of saving lives through blood donation!</p>
                        < br/>
                        <label>Username:</label>
                        <input 
                            name="newUsername" 
                            type="text"
                            placeholder="Insert Username">
                        </input>
                        <br />
                        <label>Password:</label>
                        <input 
                            name="password" 
                            type="password"
                            placeholder="Insert Password">
                        </input>
                        <br />
                        <label>Account type:</label>
                        <select name="option" className="">
                            <option value="donor">Donor</option>
                            <option value="clinic">Clinic</option>
                        </select>
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