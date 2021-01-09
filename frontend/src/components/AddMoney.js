import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { Button, Alert } from 'reactstrap';
import { ExportableContext } from './providers/MyProvider';

class AddMoney extends Component {
    constructor(props){
        super(props)
  
        this.state = { 
          Transaction : this.emptyTransaction,
          isHidden: true
         }
         this.handleAddingMoney= this.handleAddingMoney.bind(this);
         this.handleMoneyInput= this.handleMoneyInput.bind(this);
    }
    emptyTransaction = {
        "money": 0,
        "user": 1
    }

    async handleAddingMoney(){
        const transaction = this.state.Transaction;
        if(transaction.money >= 1 && transaction.money.toString().search(/\./) === -1 && transaction.money.toString().search(/e/) === -1){
            await fetch(`/api/transaction/`, {
                method : 'POST',
                headers : {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body : JSON.stringify(transaction),
              });
            this.props.history.push("/transactions");
            console.log(JSON.stringify(transaction))
        }
        else{
            this.setState({
                isHidden: false
            })
        }
    }

    handleMoneyInput(event){
        const target= event.target;
        const money= target.value;
        let transaction={...this.state.Transaction};
        transaction.money = parseInt(money);
        this.setState({Transaction: transaction});
    }
    
    render() {
      const {Transaction} = this.state;
        return (
        <div>
          <ExportableContext>
            {(value) => (
              <InputGroup style={{margin:"15px", width:"50%"}}>
                <InputGroupAddon addonType="prepend">HRK</InputGroupAddon>
                <Input placeholder="Amount" min={1} type="number" step="1" onChange={this.handleMoneyInput}/>
                <InputGroupAddon addonType="append"><Button color="primary" onClick={() => { this.handleAddingMoney(); value.changeMoneyValue(Transaction.money, true);}}>Add Money</Button></InputGroupAddon>
              </InputGroup>
            )}
          </ExportableContext>
          {!this.state.isHidden && 
          <Alert color="danger">
            Only positive integer values higher than 1 are accepted!
          </Alert>}

        </div>
        );
    }
}
 
export default AddMoney;