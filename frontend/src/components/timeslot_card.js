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
            <div style={{display: "flex", flexDirection: "row"}}>
                    <form >
                        <h3 htmlFor={this.props.day}>{this.props.day}</h3>
                    
                        <label htmlFor="timeStart">Timeslot start: </label>
                        <input type="time" id="timeStart" name="timeStart" onChange={(e) => this.changeHandler(e)} required />
                        
                        <label htmlFor="timeEnd"> Timeslot end:</label>
                        <input type="time" id="timeStart" name="timeEnd" onChange={(e) => this.changeHandler(e)} required />
                    </form>
                    <button className='addButton btn btn-primary m-2' name="addTimeSlot" type='submit' onClick={(e) => this.props.changeHandler(e, this.props.day, [this.state.timeStart, this.state.timeEnd])}>Add</button>
           
                
                {this.props.timeslots!==undefined?
                this.props.timeslots.map((timeperiods, index) => {
                    return (
                        <div>
                            {timeperiods.map((period)=> {return (
                                 <input type="time" value={period} readOnly />
                                )
                            })}
                            <input value="✖" name="removeTimeSlot" onClick={(e) => this.props.changeHandler(e, this.props.day, index)} type="button"/>
                        </div>
                        )
                }
                ):
                null}
                
        
            </div>
            
        )
    }
}

export default TimeslotCard;