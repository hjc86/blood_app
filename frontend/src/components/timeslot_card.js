import React from 'react';


class TimeslotCard extends React.Component {
    
    constructor(props) {
        super(props);
        this.clickSomething = clickSomething.bind(this)
    }
    

    clickSomething = () => {
        console.log(this.props.timeslot)
     } 


    render() {
        return (
            <div>
                <form>
                    <label for={this.props.day}>{this.props.day}</label>
                    <br />
                    <label for="timeStart">Timeslot start:</label>
                    <input type="time" id="appt" name="timeStart" required />
                    < br/>
                    <label for="timeEnd">Timeslot end:</label>
                    <input type="time" id="appt" name="timeEnd" required />
                </form>
                {/* {Object.keys(this.props.timeslots).map(timeslot => 
                ( 
                   <div>
                <h3>{timeslot[0][0]}</h3>
                </div> 
                ))} */}

                <button className='addButton btn btn-primary' type='submit' onclick={this.clickSomething}>Add</button>
                
            </div>
            
        )
    }
}

export default TimeslotCard;