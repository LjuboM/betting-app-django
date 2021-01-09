import React, { Component } from 'react';
import { ExportableContext } from './providers/MyProvider';
import { Table, Button } from 'reactstrap';

class PopUpPlayTicket extends Component {
    state = {  }
    render() { 
        return (   
        <ExportableContext > 
            {(value) => (
            <div id="popup">
                <div id="popup-content">
                    <Table striped >
                        <thead>
                        <tr>
                            <th>Money: <b>{value.state.money}</b> </th>
                            <th style={{fontSize:"0.7em"}}>-{(0.05 * value.state.money).toFixed(2)} (5% mt) = {(0.95 * value.state.money).toFixed(2)} HRK</th>
                            <th></th>
                            <th>Gain: <b>{(value.state.possibleGain - value.state.tax).toFixed(2)}</b> HRK</th>
                            <th style={{color:"blue"}}>Total Odd: <b>{value.state.totalOdd.toFixed(2)}</b></th>
                        </tr>
                        </thead>
                        <tbody>
                            {value.state.NewTicket.map( pair =>
                                <tr key={pair.odds.id}>
                                    <td>{pair.odds.match.home}</td>
                                    <td>{pair.odds.match.away}</td>
                                    <td>{pair.odds.match.matchdate}</td>
                                    <td>{pair.type}</td>
                                    <td>{pair.odd}</td>
                                </tr>
                            )}
                            <tr>
                                <td>Tax: {value.state.tax.toFixed(2)} HRK</td>
                                <td style={{fontSize:"0.6em"}}>First 10000 HRK is taxed by 10%, next 20000 by 15%, next 470000 by 20% and the rest by 30%</td>
                                <td></td>
                                <td><a href="https://www.porezna-uprava.hr/HR_porezni_sustav/Stranice/porez_dobitak_kladjenje.aspx" target="_blank" rel="noopener noreferrer"> Bet taxes in Croatia.</a></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <Button color="danger" onClick={() => { value.removePopUp(); }}> Cancel </Button>
                        <div><p style={{color:"red"}}><b>{value.state.matchAlreadyStartedMessage}</b></p></div>
                        <Button color="primary" onClick={() => { value.playTicket(); }}> Confirm </Button>
                    </div>
                </div>
            </div>
            )}
        </ExportableContext>
       );
    }
}
 
export default PopUpPlayTicket;