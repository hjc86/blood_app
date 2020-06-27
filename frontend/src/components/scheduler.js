import React, { Component } from "react";
import AppointmentPicker from "react-appointment-picker";
import {createAppSlots} from '../action-creators/createAppSlots'
import {createAppointment} from '../action-creators/createAppointment'
import {changeAppointment} from '../action-creators/changeAppointment'
import {searchClinic} from '../action-creators/searchClinic';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal'

class Scheduler extends Component {

  constructor(props){
    super(props);
    this.selectedAppointmentsState = React.createRef();
  }
 
  state = {
    loading: false,
    appointment: false,
    booked: false,
    clinicName: null,
    clinicId: null,
    showAppointments: false
  };

  addAppointmentCallback = ({ day, number, time, id }, addCb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        //await new Promise(resolve => setTimeout(resolve));
        console.log(
          `Added =======> appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
       
        await addCb(day, number, time, id);
        await this.setState({ loading: false, appointment: id});
      }
    );
  };

  removeAppointmentCallback = ({ day, number, time, id }, removeCb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        //await new Promise(resolve => setTimeout(resolve));
        console.log(
          `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        await removeCb(day, number);
        await this.setState({ loading: false, appointment: false });
      }
    );
  };

  submitBooking = async (clinicId,timeSlot) =>{
    await this.props.createAppointment(clinicId,timeSlot)
  }

  changeBooking = async (appId,timeSlot) =>{
    await this.props.changeAppointment(appId,timeSlot)
  }

  deleteBooking = async (appId,timeSlot) =>{
    await this.props.changeAppointment(appId,timeSlot)
  }

  populateAppointments = async () => {

    await this.props.createAppSlots(this.state.clinicId, this.state.clinicName)
    //console.log("====>",this.props.slots)
  }

  componentDidMount = () => {
    this.populateAppointments()
  }

  // componentDidUpdate = () => {
  //   this.populateAppointments()
  // }
  


  unselectButton = () =>{
   
    // console.log(this.selectedAppointmentsState.current)
    if(this.selectedAppointmentsState.current !== null){

    // } && this.state.showAppointments === false){
     // this.selectedAppointmentsState.current.setState({selectedAppointments:{}, size:0});
    // })
      //this.selectedAppointmentsState.current.setState({selectedAppointments:{}, size:0});
      console.log( this.selectedAppointmentsState.current)
      //this.setState()
    }
    // let appState= await this.refs.apps.state//.getElementsByClassName("appointment appointment--selected") 
    // console.log("before", appState)
    // await this.setState({selectedAppointments:{}})
    // console.log(appState)
  }


  changeHandler = (event) =>  {
    let state = this.state 
    switch (event.target.name) {
        case "clinicName": 
            event.preventDefault()
            state.clinicName = event.target.value
            this.setState(state);
            this.props.searchClinic(state.clinicName)
            console.log("search text",state.clinicName)
            break;
    }
  }

  setShowAppointments = async (bool) =>{
    await this.setState({showAppointments: bool})
    // if(this.state.showAppointments === false){
    //   await this.selectedAppointmentsState.current.setState({selectedAppointments:{}, size:0});
    //   console.log("shoudl have reset")
    // }
  }

  // search = async () =>{
  //   await this.props.searchClinic(this.state.clinicName)

  // }

  // componentDidMount = async() =>{
  //   await  this.props.getFollowing()
  // }


  render() {
  
    const { loading } = this.state;


    return (
      <div className="container-fluid text-center">
        <h1>Booking</h1>
        
        <div className="container-fluid ">
          <div className="row">
            
            <div className="col">
                
                <h2>Search Clinics</h2>

                <form>
                    <input
                        className="m-3 col-xs-4"
                        name="clinicName"
                        onChange={this.changeHandler}
                        type="text"
                        placeholder="search for a clinic" />
                </form>
            
                {this.props.clinics===(undefined)? 
                    "no search results"
                    :
                    this.props.clinics.map((clinic, index) => (
                      <p>{clinic.clinic__name} <button className='followerButton btn btn-primary m-3' name='followerbutton' type='submit' 
                          onClick={async()=>{await this.setState({clinicId: clinic.id, clinicName: clinic.clinic__name}); await this.populateAppointments(); await this.setShowAppointments(true); await this.unselectButton()} }> 
                          Select</button></p>
                     
                    ))
                }
            </div>
       

            
          </div>
        </div>
  


        
        {this.props.slots=== false ?
        "Loading slots":
        <Modal
          size="lg"
          show={this.state.showAppointments}
          onHide={() => this.setShowAppointments(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        > 
          {this.state.clinicName}
          <AppointmentPicker
              addAppointmentCallback={this.addAppointmentCallback}
              removeAppointmentCallback={this.removeAppointmentCallback}
              //initialDay={new Date(Date.parse(this.props.slots[0][0]['id']))}
              //initialDay={new Date(Date.parse(this.props.slots[0][0]['id']).toISOString())} 
              //initialDay={new Date(Date.parse(this.props.min_time))}//{new Date('2020-06-27 09:00')}
              initialDay={new Date(this.props.slots.min_time)}//{new Date('2020-06-27 09:00')}
              
              days={this.props.slots.appointments}
              maxReservableAppointments={1}
              // alpha={true}
              unitTime= {36000_0_0}
              visible
              ref = {this.selectedAppointmentsState}
              selectedByDefault
              loading={loading}
            />
              {/* {`you have booked ${this.state.appointment}`}
               */}
              <br/>
              {/* {new Date(this.props.slots.min_time).toString()} */}
              <br/>
        <br></br>

        {!this.props.slots.app_id?       
        <button className='passwordButton btn btn-success' type='submit' 
                onClick={async () => {await this.submitBooking(this.state.clinicId, this.state.appointment); await this.populateAppointments(); await this.unselectButton();}}>
                Submit booking </button>:
        <button className='passwordButton btn btn-warning' type='submit' 
                onClick={async () => {await this.changeBooking(this.props.slots.app_id, this.state.appointment); await this.populateAppointments(); await this.unselectButton();}}>
                Change booking</button>       
        }
        <br></br>
        <button className='cancelButton btn btn-primary m-3' type='button' 
            onClick={async () => {await this.deleteBooking(this.props.slots.app_id, this.state.appointment); await this.populateAppointments(); await this.unselectButton();}}>
            Cancel Booking</button>       


        </Modal>
     
        }
        
    
      </div>
      
      
      );
  }
}

const mapStateToProps = state => ({
  // ...state
  profile: state.login.profile,
  token: state.login.token,
  slots: state.createAppSlots.slots,
  clinics: state.searchClinic.clinics
})

const mapDispatchToProps = dispatch => ({
  createAppSlots: (clinicId) => dispatch(createAppSlots(clinicId)),
  createAppointment: (clinicId, timeSlot) => dispatch(createAppointment(clinicId, timeSlot)),
  changeAppointment: (appId, timeSlot) => dispatch(changeAppointment(appId,timeSlot)),
  searchClinic: (clinicName) => dispatch(searchClinic(clinicName)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
//export default Scheduler;
