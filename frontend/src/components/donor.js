import React from 'react';

class Donor extends React.Component {
   
    render() {
        return (
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
                        placeholder="eg Date/Month/Year"
                        >
                    </input>
                    <br />
                    <label>Postcode:</label>
                    <input 
                        name="postcode" 
                        type="text"
                        placeholder="eg. CR3 6LD">
                    </input>
                    </form>
                    <button className='passwordButton btn btn-primary' type='submit'>Create</button>
                </div>
        
        )
    }
}


export default Donor;