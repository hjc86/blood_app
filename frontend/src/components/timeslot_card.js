import React from 'react';


class TimeslotCard extends React.Component {
    
    constructor(props) {
        super(props);
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
                { console.log(this.props.timeslots) }
                <button className='addButton btn btn-primary' type='submit'>Add</button>
                
            </div>
            
        )
    }
}

export default TimeslotCard;