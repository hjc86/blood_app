import React from 'react';

class Login extends React.Component {
   
    render() {
        return (
            <div>
                <div>
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
                    <button className='loginUserButton' type='submit'>Log In</button>
                </div>

                <div>
                    <form>
                    <label>Create</label>
                    <p>A new free account</p>
                    <p>It's free to join and easy to use. Continue on to create your Red Cells account and be a part of saving lives through blood donation!</p>
                    <input 
                        name="newUsername" 
                        type="text"
                        placeholder="Insert Username">
                    </input>
                    <br />
                    <input 
                        name="password" 
                        type="password"
                        placeholder="Insert Password">
                    </input>
                    <br />
                    <label>Account type:</label>
                    <select name="option">
                        <option value="donor">Donor</option>
                        <option value="clinic">Clinic</option>
                    </select>
                    </form>
                    <button className='passwordButton' type='submit'>Join Red Cells</button>
                </div>
            </div>
        
        )
    }
}


export default Login;