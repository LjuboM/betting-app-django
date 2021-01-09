import React, { Component } from 'react';

// first we will make a new context
const MyContext = React.createContext();

// Create an exportable consumer that can be injected into components
export const ExportableContext = MyContext.Consumer

// Then create a provider Component
class MyProvider extends Component {

  constructor(props){
    super(props)
    this.state = { 
      User : [],
      NewTicket : [],
      totalOdd : 1,
      possibleGain : 0,
      tax : 0,
      money : '',
      isHidden: true,
      alertMessage : '',
      popUpSeen : false,
      matchAlreadyStartedMessage : ''
     }
     this.finalizeNewTicket = this.finalizeNewTicket.bind(this);
     this.refreshTicket = this.refreshTicket.bind(this);
     this.removePair = this.removePair.bind(this);
     this.calculateTax = this.calculateTax.bind(this);
     this.updateMoneyValue = this.updateMoneyValue.bind(this);
    }

  calculateTax(possibleGain){
    let newTax = 0;
    let possibleGainparts = possibleGain;
    if(possibleGainparts >= 10000){
      newTax = 1000;
      possibleGainparts = possibleGainparts - 10000;
      if(possibleGainparts >= 20000){
        newTax = 4000;
        possibleGainparts = possibleGainparts - 20000;
        if(possibleGainparts >= 470000){
          newTax = 94000;
          possibleGainparts = possibleGainparts - 470000;
          if(possibleGainparts > 0){
            newTax = newTax + possibleGainparts * 0.30;
          }
        }
        else{
          newTax = newTax + possibleGainparts * 0.20;
        }
      }
      else{
        newTax = newTax + possibleGainparts * 0.15;
      }
    }
    else{
      newTax = possibleGainparts * 0.10
    }
    return newTax;
  }

  async finalizeNewTicket(finalTicket){
    await fetch(`/api/ticket`, {
        method : 'POST',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(finalTicket)
        })
        .then(response => {     
          if (response.ok) {
            this.updateMoneyValue(this.state.money, false)
            this.refreshTicket();
          } else {
                  this.setState({ matchAlreadyStartedMessage : 'Remove match or matches that already started!' })
          }
        })
        .catch((error) => {
          this.setState({ matchAlreadyStartedMessage : 'Remove match or matches that already started!' })
        });
  }

  removePair(oddId, odd){
    let isAlertNotNeeded = this.state.isHidden;
    let newAlertMessage = this.state.alertMessage;
    let newPossibleGain = 0;
    let newMoneyValue = this.state.money;
    const newTotalOdd = this.state.totalOdd / odd;
    newPossibleGain = 0.95 * this.state.money * newTotalOdd;
    if(newTotalOdd === 1.00){
      newPossibleGain = 0;
      newMoneyValue = '';
    }
    //check if constraint is no longer needed
    if(this.state.alertMessage === 'With Special offer you have to combine 5 Basic offers with Odd >= 1.10!' && this.state.NewTicket.filter(pair => pair.odds.id === oddId && pair.odds.type === "Special offer").length >= 1){
      isAlertNotNeeded = true;
      newAlertMessage = '';
    }

    const finalNewTicket = this.state.NewTicket.filter(pair => pair.odds.id !== oddId);
    const newTax = this.calculateTax(newPossibleGain);
    this.setState({ NewTicket: finalNewTicket, totalOdd: newTotalOdd, possibleGain: newPossibleGain, tax : newTax, money: newMoneyValue, isHidden: isAlertNotNeeded, alertMessage : newAlertMessage})
  }

  refreshTicket(){
    this.setState({ NewTicket: [], totalOdd: 1, possibleGain: 0, tax: 0, money: '', isHidden: true, alertMessage: '', popUpSeen: false, matchAlreadyStartedMessage : ''})
  }

  fetchUser = () => {
    fetch('/api/user/1', {})
    .then(body => body.json())
    .then(body => this.setState({User : body}))
    .catch(error => console.log(error)); 
  };
  
  updateMoneyValue(moneyValue, addingMoney){
    if(moneyValue >= 2 && moneyValue.toString().search(/\./) === -1 && moneyValue.toString().search(/e/) === -1 && (moneyValue <= this.state.User.money || addingMoney)){
      let newUserState = this.state.User;
      if(addingMoney){
        newUserState.money = parseInt(newUserState.money) + parseInt(moneyValue);
      }
      else{
        newUserState.money = parseInt(newUserState.money) - parseInt(moneyValue);
      }
      this.setState({User : newUserState});
    }
  }

  componentDidMount(){
    this.fetchUser()
  }

    render() { 
        return ( 
            <MyContext.Provider value={{
                state: this.state,

                  changeMoneyValue: (newMoneyValue, addingMoney) => {
                    this.updateMoneyValue(newMoneyValue, addingMoney)
                  },

                  modifyPair: (odd, type, Odds) => {
                    if(odd !== ""){
                      let finalNewTicket = this.state.NewTicket;
                      let newTotalOdd = this.state.totalOdd
                      let isAlertNotNeeded = this.state.isHidden;
                      let newAlertMessage = this.state.alertMessage;
  
                      //check if we already bet on that exat odd, if yes, remove it from NewTicket
                      let oddAlreadyExists = finalNewTicket.filter(pair => pair.odds.id === Odds.id && pair.type === type);
  
                      if(oddAlreadyExists.length > 0){
                        this.removePair(Odds.id, odd);
                      }
                      else{
                          newTotalOdd = newTotalOdd * odd;
  
                          //check if we already bet on that match
                          let pairAlreadyExists = finalNewTicket.filter(pair => pair.odds.match.id === Odds.match.id);
  
                          pairAlreadyExists.map( pair => {
                            newTotalOdd = newTotalOdd / pair.odd;
                            return pair;
                          })
  
                          if(pairAlreadyExists.length > 0){
                            finalNewTicket = [...this.state.NewTicket].filter(pair => pair.odds.match.id !== Odds.match.id);
                          }
  
                          //check if we already bet on one special match
                          let specialMatchAlreadyExists = finalNewTicket.filter(pair => pair.odds.type === "Special offer" && Odds.type === "Special offer");                    
                          
                          specialMatchAlreadyExists.map( pair => {
                            newTotalOdd = newTotalOdd / pair.odd;
                            return pair;
                          })
  
                          if(specialMatchAlreadyExists.length > 0){
                            finalNewTicket = [...this.state.NewTicket].filter(pair => pair.odds.match.id !== Odds.match.id).filter(pair => pair.odds.type !== "Special offer" && Odds.type === "Special offer");
                          }                    
  
                          //check if constraint is no longer needed
                          if( specialMatchAlreadyExists.length === 0 && (pairAlreadyExists.length > 0 || (this.state.alertMessage === 'With Special offer you have to combine 5 Basic offers with Odd >= 1.10!' && finalNewTicket.filter(pair => pair.odds.type === "Basic" && pair.odd >= 1.10).length >= 4 && odd >= 1.10)) ){
                            isAlertNotNeeded = true;
                            newAlertMessage = '';
                          }
  
                          if(this.state.alertMessage === 'You have to add Matches for betting!'){
                            isAlertNotNeeded = true;
                            newAlertMessage = '';
                          }
  
                          const newPossibleGain = 0.95 * this.state.money * newTotalOdd;
                          const newTax = this.calculateTax(newPossibleGain);
                          const newPair = {
                            "odds": Odds,
                            "odd": odd,
                            "type": type
                          };
                            this.setState({ NewTicket: [...finalNewTicket, newPair], totalOdd: newTotalOdd, possibleGain: newPossibleGain, tax: newTax, isHidden: isAlertNotNeeded, alertMessage: newAlertMessage })
                      }
                    }
                  },

                  handleBetMoneyInput: (event) =>{
                    const target= event.target;
                    const newMoneyValue = target.value;
                    //if there are no pairs picked for bet, no need for calculating possible gain
                    //money input must be only integers higher than 1
                    if(this.state.NewTicket.length > 0){
                      if(newMoneyValue >= 2 && newMoneyValue.toString().search(/\./) === -1 && newMoneyValue.toString().search(/e/) === -1){
                        const newPossibleGainValue = 0.95 * newMoneyValue * this.state.totalOdd;
                        const newTax = this.calculateTax(newPossibleGainValue);
                        if(newMoneyValue > this.state.User.money){
                          this.setState({possibleGain: newPossibleGainValue, tax: newTax, money : newMoneyValue, isHidden : false, alertMessage : "You don't have enough money in your account!"});
                        }
                        else{
                          this.setState({possibleGain: newPossibleGainValue, tax: newTax, money : newMoneyValue, isHidden : true, alertMessage : ''});
                        }
                      }
                      else if(newMoneyValue === ""){
                        this.setState({possibleGain: 0, money : 0, tax: 0, isHidden : false, alertMessage : 'Only positive integer values higher than 2 are accepted!'});
                      }
                      else{
                        this.setState({isHidden : false, alertMessage : 'Only positive integer values higher than 2 are accepted!'});
                      }
                    }
                    else{
                      this.setState({isHidden : false, alertMessage : 'You have to add Matches for betting!'});
                    }
                  },

                  playTicket: () => {
                    let finalNewTicket = [];
                      this.state.NewTicket.map( ticketOdd => {
                        finalNewTicket = [...finalNewTicket, 
                          ticketOdd = {
                          "ticket": {
                            "totalodd": this.state.totalOdd,
                            "possiblegain": this.state.possibleGain - this.state.tax,
                            "transaction": {
                                "money": this.state.money,
                                    "user": {
                                    "id": 1
                                }
                            }
                          },
                          "odds": ticketOdd.odds,
                          "odd": ticketOdd.odd,
                          "type": ticketOdd.type
                          }]
                      return null;
                    })
                      this.finalizeNewTicket(finalNewTicket);
                  },

                  isPairSelected: (oddId) => {
                    return this.state.NewTicket.some(pair => pair.odds.id === oddId);
                  },

                  isOddTypeOfPairSelected: (oddId, oddTypeValue) => {
                    return this.state.NewTicket.some(pair => pair.odds.id === oddId && pair.type === oddTypeValue);
                  },

                  deleteNewTicket: () =>{
                    this.refreshTicket();
                  },

                  deletePair: (oddId, odd) => {
                    this.removePair(oddId, odd);
                  },
                  togglePopUp: () =>{
                    const moneyValue =  this.state.money;

                    if(moneyValue < 2 || moneyValue.toString().search(/\./) !== -1 || moneyValue.toString().search(/e/) !== -1 || moneyValue === ''){
                      this.setState({isHidden : false, alertMessage : 'Only positive integer values higher than 2 are accepted!'});
                    }
                    else if( moneyValue > this.state.User.money){
                      this.setState({isHidden : false, alertMessage : "You don't have enough money in your account!"});
                    }
                    else if( this.state.NewTicket.filter(pair => pair.odds.type === "Special offer").length === 1 && this.state.NewTicket.filter(pair => pair.odds.type === "Basic" && pair.odd >= 1.10).length < 5){
                      this.setState({isHidden : false, alertMessage : 'With Special offer you have to combine 5 Basic offers with Odd >= 1.10!'});
                    }
                    else{
                      this.setState({
                        popUpSeen: true
                    });
                    }
                  },
                  removePopUp: () =>{
                      this.setState({
                        popUpSeen: false,
                        matchAlreadyStartedMessage : ''
                    });
                  }
              }}>
                {this.props.children}
              </MyContext.Provider>
         );
    }
}

export default MyProvider;