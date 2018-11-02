import React, {Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact');
	}

	
	render() {
		return (
			<div>
			<CheckoutSummary 
			ingredients={this.props.ings}
			checkoutCancelled={this.checkoutCancelledHandler}
			checkoutContinued={this.checkoutContinuedHandler}/>

			<Route path={this.props.match.path + '/contact'} 
			component={ContactData}/> 
			{/* we can manually render a component in routing if we need to pass some props. */}
			</div>
			);

	}
}
const mapStateToProps = state => {
	return {
	ings: state.ingredients,
	price: state.Price
	};
}

const mapDispatchToProps = dispatch => {
	return {

	};
}


export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
