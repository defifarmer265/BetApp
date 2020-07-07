import React from 'react'
import {connect} from 'react-redux'
import '../css/betAmount.scss'
import { Formik, Field, Form, ErrorMessage } from "formik";
class BetAmount extends React.Component{
    state={totalOdd: 0, formError: false, potentialWin: 0, bonus: 0, betAmount:0}
    calcTotalOdd(){
        return this.props.selectedMatches
        .filter(match=>match.checked === true)
        .reduce(
            (acc, item)=> acc * Number(parseFloat(item.marketOdd).toFixed(2)), 1
        )
    }
    calcWinning(){
        console.log(`Total Odd: ${this.calcTotalOdd()} Bet Amount: ${this.state.betAmount}`)
        this.setState({potentialWin: this.calcTotalOdd()*this.state.betAmount}) 
    }
    calcBonus(){
        console.log("The betamount from bonus is:"+this.state.betAmount)
        this.setState({bonus: (0.4*this.state.potentialWin)}) 
    }
    setBetAmount(amount){
        console.log('Amount from setAMount: '+amount)
        this.setState({betAmount: amount})
    }
    checkAmountError(comp){
        return this.state.formError === true ? 'uk-form-danger' : ''
    }
    componentDidUpdate(prevProp){
        if(prevProp.selectedMatches !== this.props.selectedMatches){
            this.calcWinning()
            this.calcBonus()
        }
        console.log(prevProp)
        // this.calcWinning()
        // this.calcBonus()
    }
    render(){
        console.log("bet rendering")
       return(
        <div className="betAmount">
            <Formik
            enableReinitialize
              initialValues={{ betAmount: 0}}
              onSubmit={({ setSubmitting, betAmount }) => {
                alert(typeof parseFloat(betAmount));
                setSubmitting(false);
              }}
              validate={values => {
                  console.log('Inputted bet Amount is: '+values.betAmount)
                  this.setBetAmount(values.betAmount)
                  console.log('bet amount in validate '+this.state.betAmount)
                let errors = {};
                this.calcWinning()
                this.calcBonus()
                // console.log('potential win is: '+ potentialWin)
                // this.setState({potentialWin: ((potentialWin)+(0.4*potentialWin)), bonus: 0.4*potentialWin})
                if (this.state.betAmount < 100) {
                  errors.betAmount = "Can't be less than 100";
                  this.setState({formError: true})
                }
                else{
                  this.setState({formError: false})  
                }                
                return errors;
              }}
            >
               {()=>(
               <Form>
                <div className="betAmount__details">
                <div className="betAmount__details-money">
               <small className="info">Amount</small>
                    <div class="input">
                    
                        <Field class={`${this.checkAmountError()} uk-input uk-form-width-xsmall`}
                        name="betAmount"
                        type="text" 
                        placeholder="Amount"
                        style={{width: '70px', height: '26px', textAlign: 'right'}}
                        />
                        <ErrorMessage
                    component="div"
                    name="betAmount"
                    className="invalid-feedback"
                    />
                    </div>
                </div>
                {/* {this.state.betAmount} */}
                <div className="betAmount__details-winning">
                    <small className="info">Bonus</small>
                    <div className="money">
                        <span>NGN</span>&nbsp;
                        <h3 className="content">{this.state.bonus.toFixed(2)}</h3> 
                    </div>
                </div>
                <div className="betAmount__details-bonus">
                    <small className="info">Odds</small>
                    <h3 className="content">
                        {
                         this.calcTotalOdd() === 1 ? 0 :this.calcTotalOdd().toFixed(2) || 0 
                        }
                    </h3>
                </div>
                <div className="betAmount__details-winning">
                    <small className="info">Potential Win</small>
                    <div className="money">
                        <span>NGN</span>&nbsp;
                        <h3 className="content">{(this.state.potentialWin + this.state.bonus).toFixed(2)}</h3> 
                    </div>
                </div>
            </div>
            <div className="betAmount__actions">
                <div className="betAmount__actions-suggest">
                    <div className="betAmount__actions-suggest-button">RESET</div>
                    <div className="betAmount__actions-suggest-button">100</div>
                    <div className="betAmount__actions-suggest-button">500</div>
                    <div className="betAmount__actions-suggest-button">1000</div>
                </div>
                <div className="betAmount__actions-buttons">
                <button class="uk-button uk-button-default uk-button-small cancel">Cancel</button>
                <button class="uk-button uk-button-default uk-button-small bet">Bet</button>
                </div>
            </div>
            </Form>
               )} 
            </Formik>
            
            
        </div>
    ) 
    }
    
}

const mapStateToProps =(state)=>{
    // console.log("moprps", state.posts)
    return {selectedMatches: state.selectedMatches}
}
export default connect(mapStateToProps, null)(BetAmount)