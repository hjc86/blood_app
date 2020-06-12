import React from 'react';
import { connect } from 'react-redux';


class BloodInfo extends React.Component {

    render() {

        return (
            <div className="container-fluid m-3 p-3">
                <div className="justify-content-center p-5" style={{backgroundColor: "#dfe6e9"}}>
                    <div className="text-center">
                        <h3 >Who can give blood</h3>
                        <p>Most people can give blood. You can give blood if you:
                            <br />
                            - are fit and healthy
                            <br />
                            - weigh between 7 stone 12 lbs and 25 stone, or 50kg and 158kg
                            <br />
                            - are aged between 17 and 66 (or 70 if you have given blood before)
                            <br />
                            - are over 70 and have given a full blood donation in the last two years</p>
                    </div>
                    <div className="justify-content-center mt-3 p-2">
                        <div className="text-center">
                            <h3>Coronavirus (COVID-19) advice</h3>
                            <p>Please keep donating. You can still travel to donate. 
                            <br />Giving blood and platelets is essential to the NHS and vulnerable patients.
                            Please read the following information before coming to donate:
                            < br />
                            - <a href="https://nhs.queue-it.net/?c=nhs&e=default&t=https%3A%2F%2Fmy.blood.co.uk%2FKnowledgeBase%2FIndex%2Fcoronavirus%2520infection&cid=en-GB" target="_blank">Read our coronavirus rules about donating blood</a>
                            < br />
                            - <a href="https://www.blood.co.uk/news-and-campaigns/news-and-statements/coronavirus-covid-19-updates/" target="_blank">Read our latest advice for blood donors</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


// export default connect() (BloodInfo);
export default BloodInfo;