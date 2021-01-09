import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { ExportableContext } from './providers/MyProvider';

class OddsOffer extends Component {
    constructor(props){
        super(props)

        this.state = { 
            isLoading : true,
            Odds : [],
            Types : []
         }
    }
    
    fetchTypes = () => {
        fetch('/api/types/', {})
        .then(body => body.json())
          .then(body => this.setState({Types : body}))
          .catch(error => console.log(error)); 
      };

    fetchOdds = () => {
        fetch('/api/odds/', {})
        .then(body => body.json())
        .then(body => {
            let modifiedBody = body;
            modifiedBody.map( odd => {
                if(odd.odd1 === 1){
                    odd.odd1 = "";
                }
                if(odd.odd2 === 1){
                    odd.odd2 = "";
                }
                if(odd.odd3 === 1){
                    odd.odd3 = "";
                }
                if(odd.odd4 === 1){
                    odd.odd4 = "";
                }
                if(odd.odd5 === 1){
                    odd.odd5 = "";
                }
                if(odd.odd6 === 1){
                    odd.odd6 = "";
                }
                return odd;
            })
            return modifiedBody;
        })
        .then(body => this.setState({Odds : body , isLoading: false}))
        .catch(error => console.log(error)); 
      };

    componentDidMount(){
        this.fetchTypes();
        this.fetchOdds()
    }

    render() {
        const {Odds, Types, isLoading} = this.state;



        if(isLoading) 
            return (<div>Loading...</div>);

        return (
            <div id="oddsOffer">
            <ExportableContext >

                   {(value) => (
                        Types.map( TypesPerSport =>
                            <Table style={{backgroundColor:"#fcfcfc"}} responsive key={TypesPerSport.id}>
                            <thead id={TypesPerSport.name}>
                                <tr>
                                    <th>{TypesPerSport.name}</th>
                                    <th></th>
                                    <th></th>
                                    <th>{TypesPerSport.type1}</th>
                                    <th>{TypesPerSport.type2}</th>
                                    <th>{TypesPerSport.type3}</th>
                                    <th>{TypesPerSport.type4}</th>
                                    <th>{TypesPerSport.type5}</th>
                                    <th>{TypesPerSport.type6}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                Odds.filter( specialOfferOdds => specialOfferOdds.match.types.name === TypesPerSport.name && specialOfferOdds.odd_type === "Special offer")
                                .map( specialOfferOdd =>                             
                                    <tr style={{color:"blue"}} key={specialOfferOdd.id} className={value.isPairSelected(specialOfferOdd.id) === true ? 'selectedPair' : ''}>
                                        <td>{specialOfferOdd.match.home}</td>
                                        <td>{specialOfferOdd.match.away}</td>
                                        <td>{specialOfferOdd.match.matchdate}</td>
                                        <td className={`${specialOfferOdd.odd1 === "" ? ' ' : 'oddsOfferFakeButton'}  ${value.isOddTypeOfPairSelected(specialOfferOdd.id, TypesPerSport.type1) === true ? 'selectedTypeOfPair ' : ''}`}
                                            onClick={ () => value.modifyPair(specialOfferOdd.odd1, TypesPerSport.type1, specialOfferOdd)}>
                                            {specialOfferOdd.odd1}
                                         </td>
                                        <td className={`${specialOfferOdd.odd2 === "" ? ' ' : 'oddsOfferFakeButton'}  ${value.isOddTypeOfPairSelected(specialOfferOdd.id, TypesPerSport.type2) === true ? 'selectedTypeOfPair ' : ''}`}
                                            onClick={ () => value.modifyPair(specialOfferOdd.odd2, TypesPerSport.type2, specialOfferOdd)}>
                                            {specialOfferOdd.odd2}
                                         </td>
                                        <td className={`${specialOfferOdd.odd3 === "" ? ' ' : 'oddsOfferFakeButton'}  ${value.isOddTypeOfPairSelected(specialOfferOdd.id, TypesPerSport.type3) === true ? 'selectedTypeOfPair ' : ''}`}
                                            onClick={ () => value.modifyPair(specialOfferOdd.odd3, TypesPerSport.type3, specialOfferOdd)}>
                                            {specialOfferOdd.odd3}
                                         </td>
                                        <td className={`${specialOfferOdd.odd4 === "" ? ' ' : 'oddsOfferFakeButton'}  ${value.isOddTypeOfPairSelected(specialOfferOdd.id, TypesPerSport.type4) === true ? 'selectedTypeOfPair ' : ''}`}
                                            onClick={ () => value.modifyPair(specialOfferOdd.odd4, TypesPerSport.type4, specialOfferOdd)}>
                                            {specialOfferOdd.odd4}
                                         </td>
                                        <td className={`${specialOfferOdd.odd5 === "" ? ' ' : 'oddsOfferFakeButton'}  ${value.isOddTypeOfPairSelected(specialOfferOdd.id, TypesPerSport.type5) === true ? 'selectedTypeOfPair ' : ''}`}
                                            onClick={ () => value.modifyPair(specialOfferOdd.odd5, TypesPerSport.type5, specialOfferOdd)}>
                                            {specialOfferOdd.odd5}
                                         </td>
                                        <td className={`${specialOfferOdd.odd6 === "" ? ' ' : 'oddsOfferFakeButton'}  ${value.isOddTypeOfPairSelected(specialOfferOdd.id, TypesPerSport.type6) === true ? 'selectedTypeOfPair ' : ''}`}
                                            onClick={ () => value.modifyPair(specialOfferOdd.odd6, TypesPerSport.type6, specialOfferOdd)}>
                                            {specialOfferOdd.odd6}
                                         </td>
                                    </tr>
                                )
                                }
                                {
                                Odds.filter( basicOfferOdds => basicOfferOdds.match.types.name === TypesPerSport.name && basicOfferOdds.odd_type === "Basic")
                                .map( basicOfferOdd =>                             
                                    <tr key={basicOfferOdd.id} className={value.isPairSelected(basicOfferOdd.id) === true ? 'selectedPair' : ''}>
                                        <td>{basicOfferOdd.match.home}</td>
                                        <td>{basicOfferOdd.match.away}</td>
                                        <td>{basicOfferOdd.match.matchdate}</td>
                                        <td className={`${basicOfferOdd.odd1 === "" ? ' ' : 'oddsOfferFakeButton'}  ${value.isOddTypeOfPairSelected(basicOfferOdd.id, TypesPerSport.type1) === true ? 'selectedTypeOfPair ' : ''}`}
                                            onClick={ () => value.modifyPair(basicOfferOdd.odd1, TypesPerSport.type1, basicOfferOdd)}>
                                                {basicOfferOdd.odd1}
                                        </td>
                                        <td className={`${basicOfferOdd.odd2 === "" ? ' ' : 'oddsOfferFakeButton'}  ${value.isOddTypeOfPairSelected(basicOfferOdd.id, TypesPerSport.type2) === true ? 'selectedTypeOfPair ' : ''}`}
                                            onClick={ () => value.modifyPair(basicOfferOdd.odd2, TypesPerSport.type2, basicOfferOdd)}>
                                            {basicOfferOdd.odd2}
                                        </td>
                                        <td className={`${basicOfferOdd.odd3 === "" ? ' ' : 'oddsOfferFakeButton'}  ${value.isOddTypeOfPairSelected(basicOfferOdd.id, TypesPerSport.type3) === true ? 'selectedTypeOfPair ' : ''}`} 
                                            onClick={ () => value.modifyPair(basicOfferOdd.odd3, TypesPerSport.type3, basicOfferOdd)}>
                                            {basicOfferOdd.odd3}
                                        </td>
                                        <td className={`${basicOfferOdd.odd4 === "" ? ' ' : 'oddsOfferFakeButton'}  ${value.isOddTypeOfPairSelected(basicOfferOdd.id, TypesPerSport.type4) === true ? 'selectedTypeOfPair ' : ''}`} 
                                            onClick={ () => value.modifyPair(basicOfferOdd.odd4, TypesPerSport.type4, basicOfferOdd)}>
                                            {basicOfferOdd.odd4}
                                        </td>
                                        <td className={`${basicOfferOdd.odd5 === "" ? ' ' : 'oddsOfferFakeButton'}  ${value.isOddTypeOfPairSelected(basicOfferOdd.id, TypesPerSport.type5) === true ? 'selectedTypeOfPair ' : ''}`}
                                            onClick={ () => value.modifyPair(basicOfferOdd.odd5, TypesPerSport.type5, basicOfferOdd)}>
                                            {basicOfferOdd.odd5}
                                        </td>
                                        <td className={`${basicOfferOdd.odd6 === "" ? ' ' : 'oddsOfferFakeButton'}  ${value.isOddTypeOfPairSelected(basicOfferOdd.id, TypesPerSport.type6) === true ? 'selectedTypeOfPair ' : ''}`}
                                            onClick={ () => value.modifyPair(basicOfferOdd.odd6, TypesPerSport.type6, basicOfferOdd)}>
                                            {basicOfferOdd.odd6}
                                        </td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </Table>
                        )
                    )}

            </ExportableContext>
            </div>
        );
    }
}
 
export default OddsOffer;