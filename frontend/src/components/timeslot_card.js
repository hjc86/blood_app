import React from 'react';


class TimeslotCard extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            "timeStart" : null,
            "timeEnd" : null
        }
        this.changeHandler = this.changeHandler.bind(this);
    }
    changeHandler = (event) =>  {
        let state = this.state 

        switch (event.target.name) {
            case "timeStart": 
                state.timeStart = event.target.value
                this.setState(state);
                console.log(state)
                break;
            case "timeEnd":
                state.timeEnd = event.target.value
                this.setState(state);
                console.log(state)
                break;
        }
    }

    render() {

        
        return (
            <div className="container-fluid">
                <div className="card m-2">
                <div className="justify-content-center m-3">
                    <form>
                        <label htmlFor={this.props.day}>{this.props.day}</label>
                        <br />
                        <label htmlFor="timeStart">Timeslot start:</label>
                        <input type="time" id="timeStart" name="timeStart" onChange={(e) => this.changeHandler(e)} required />
                        < br/>
                        <label htmlFor="timeEnd">Timeslot end:</label>
                        <input type="time" id="timeStart" name="timeEnd" onChange={(e) => this.changeHandler(e)} required />
                    </form>
                    <button className='addButton btn btn-primary m-2' name="addTimeSlot" type='submit' onClick={(e) => this.props.changeHandler(e, this.props.day, [this.state.timeStart, this.state.timeEnd])}>Add</button>
                </div>
                
                {this.props.timeslots.map((item,index) => 
                    (
                    <div className="card-footer" key={index}>
                        <input type="time" value={item[0]} readOnly />
                        <input type="time" value={item[1]} readOnly />
                        <input value="✖" name="removeTimeSlot" onClick={(e) => this.props.changeHandler(e, this.props.day, index)} type="button" />
                    </div>
                    ))}
            </div>
            </div>
            
        )
    }
}

export default TimeslotCard;