import React from 'react';

class Clinic extends React.Component {
   
    render() {
        return (
            <div>
                <form>
                    <label>Clinic Profile</label>
                    <p>Hello Clinic......</p>
                    <br />
                    <label>Address line 1:</label>
                    <input 
                        name="address" 
                        type="text"
                        placeholder="eg. 32 Gladstone">
                    </input>
                    <br />
                    <label>Address line 2:</label>
                    <input 
                        name="address" 
                        type="text"
                        placeholder="eg. Potter Road">
                    </input>
                    <br />
                    <label>Town/City:</label>
                    <input 
                        name="city" 
                        type="text"
                        placeholder="Enfield">
                    </input>
                    <br />
                    <label>County:</label>
                    <input 
                        name="county" 
                        type="text"
                        placeholder="Middlesex">
                    </input>
                    <br />
                    <label>Postcode:</label>
                    <input 
                        name="address" 
                        type="text"
                        placeholder="eg. EN7 3PX">
                    </input>
                    <br />
                    <label>Clinic Requirements:</label>
                    <p>Brief instructions for donors</p>
                    <textarea 
                        name="requirements" 
                        type="text"
                        placeholder="eg. no parking spaces available">
                    </textarea>
                    <br />
                    </form>
                    <button className='passwordButton' type='submit'>Submit</button>
                </div>
        
        )
    }
}


export default Clinic;