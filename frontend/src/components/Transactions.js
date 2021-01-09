import React, { Component } from 'react';
import { Table } from 'reactstrap';

class Transactions extends Component {
     constructor(props){
        super(props)
  
        this.state = { 
            isLoading : true,
            Transactions : []
         }
    }

     fetchTransactions = () => {
        fetch('/api/transaction/', {})
        .then(body => body.json())
        .then(body => {
            let modifiedBody = body;
            modifiedBody.map( transaction => {
                if(transaction.transaction_type === true){
                    transaction.transaction_type="Ticket";
                    transaction.money = "-" + transaction.money;
                }
                else{
                    transaction.transaction_type="Added money";
                }
                return transaction;
            })
            return modifiedBody;
        })
          .then(body => this.setState({Transactions : body , isLoading: false}))
          .catch(error => console.log(error)); 
      };

      componentDidMount(){
        this.fetchTransactions()
    }

    render() {
        const {Transactions , isLoading} = this.state;
        if(isLoading) 
            return (<div>Loading...</div>);

        return ( 
            <Table striped >
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Type</th>
                <th>Money</th>
              </tr>
            </thead>
            {
            Transactions.map( transaction =>
                <tbody key={transaction.id} className={transaction.transaction_type}>
                    <tr>
                        <th scope="row" >{transaction.id}</th>
                        <td>{transaction.transaction_time}</td>
                        <td>{transaction.transaction_type}</td>
                        <td>{transaction.money}</td>
                    </tr>
                </tbody>
            )
            }
          </Table>
        );
    }
}
 
export default Transactions;