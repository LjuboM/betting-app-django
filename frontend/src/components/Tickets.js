import React, { Component } from 'react';
import { Table } from 'reactstrap';

class Tickets extends Component {
    constructor(props){
        super(props)

        this.state = { 
            isLoading : true,
            Tickets : [],
            TicketOdds : []
         }
         this.showPairs= this.showPairs.bind(this);
    }
    
    fetchTickets = () => {
        fetch('/api/ticket', {})
        .then(body => body.json())
          .then(body => this.setState({Tickets : body , isLoading: false}))
          .catch(error => console.log(error)); 
      };

    componentDidMount(){
        this.fetchTickets()
    }

    showPairs(ticketId){
        const ticketViewOpened = this.state.TicketOdds.some(ticketOdd => ticketOdd.ticket.id === ticketId);

        if(ticketViewOpened){
            let updatedTicketOdds = [...this.state.TicketOdds].filter(ticketOdd => ticketOdd.ticket.id !== ticketId);
            this.setState({TicketOdds : updatedTicketOdds});
        }
        else{
            fetch('/api/ticketOdds/' + ticketId, {})
            .then(body => body.json())
            .then(body => {
                const modifiedBody = this.state.TicketOdds.concat(body);
                return modifiedBody;
            })
              .then(body => this.setState({TicketOdds : body , isLoading: false}))
              .catch(error => console.log(error)); 
        }
    }

    render() {
        const {Tickets, TicketOdds, isLoading} = this.state;

        if(isLoading) 
            return (<div>Loading...</div>);

        return ( 
            <div>
            {
            Tickets.map( ticketInfo =>
                <Table key={ticketInfo.id}>
                    <thead className={"ticketView"} onClick={this.showPairs.bind(this, ticketInfo.id)}>
                        <tr>
                            <td className={"noselect"}><b># {ticketInfo.id}</b></td>
                            <td className={"noselect"}><b>{ticketInfo.transaction.transaction_time}</b></td>
                            <td className={"noselect"}></td>
                            <td className={"noselect"}>Possible Gain: <b>{ticketInfo.possible_gain} HRK</b></td>
                            <td className={"noselect"}>Bet: <b>{ticketInfo.transaction.money} HRK</b></td>
                            <td className={"noselect"}>Total Odd: <b>{ticketInfo.total_odd}</b></td>
                        </tr>
                    </thead>
                    <tbody>
                    {TicketOdds.filter(ticketOdd => ticketOdd.ticket.id === ticketInfo.id).map( ticketOddWithSportType =>
                        <tr key={ticketOddWithSportType.id}>
                            <th scope="row" ></th>
                            <td>{ticketOddWithSportType.odds.match.home}</td>
                            <td>{ticketOddWithSportType.odds.match.away}</td>
                            <td>{ticketOddWithSportType.odds.match.match_time}</td>
                            <td>{ticketOddWithSportType.type_value}</td>
                            <td>{ticketOddWithSportType.odd}</td>
                        </tr>
                        )}
                    </tbody>
                </Table>
            )
            }
            </div>
        );
    }
}
 
export default Tickets;
