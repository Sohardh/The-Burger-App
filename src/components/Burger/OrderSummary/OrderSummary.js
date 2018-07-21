import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';

class OrderSummary extends Component {
	render(){
		const ingredientsSummary = Object.keys(this.props.ingredients)
	.map(igKey => {return(
		<li>
			<span style={{textTransform:'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
		</li>)});

		return(
		<Aux>
	  <h3>Your Order</h3>
	  <p>A delicious burger with The following ingredients</p>
	  <ul>
	  	{ingredientsSummary}
	  </ul>
	  <strong>Total price : {this.props.totalPrice.toFixed(2)}</strong>
	  <p>Continue to Checkout?</p>
	  <Button btnType="Danger" clicked={this.props.buttonCancel}>CANCEL</Button>
	  <Button btnType="Success" clicked={this.props.buttonContinue}>CONTINUE</Button>
		</Aux>)}
}

OrderSummary.propTypes ={
	totalPrice:PropTypes.number
}

export default OrderSummary;