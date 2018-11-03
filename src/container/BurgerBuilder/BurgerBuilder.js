import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders.js';
import * as actionTypes from '../../Store/actions.js'
import {connect} from 'react-redux';
import * as actionCreators from '../../Store/index';

class BurgerBuilder extends Component {
	state={
		purchasable:false,
		purchasing: false
	}
	componentDidMount () {
		/*axios.get('https://react-burger-app-dd058.firebaseio.com/Ingredients.json')
		.then(response => {
			this.setState({ingredients:response.data});
		})*/
	}
	updatePurchasableState = () => {
		const sum = Object.keys(this.props.ings).map(igKey => {
			return this.props.ings[igKey]
		}).reduce((sum, el) => {return sum+el;},0)
		return sum>0;
	}

	/*addIngredHandler = (type) => {
		const oldCount= this.state.ingredients[type];
		const updatedCount=oldCount+1;
		const updatedIngredients={...this.state.ingredients};
		updatedIngredients[type]=updatedCount;

		const newPrice=this.state.Price+INGREDIENTS_PRICE[type];
		this.setState({
					Price:newPrice,
					ingredients:updatedIngredients
				});
		this.updatePurchasableState(updatedIngredients);
	}*/

	/*removeIngredHandler = (type) => {
		const currentCount = this.state.ingredients[type];
		if(currentCount!==0){
		const newCount=currentCount-1;
		const newIngredients={...this.state.ingredients};
		newIngredients[type]=newCount;

		const latestPrice=this.state.Price-INGREDIENTS_PRICE[type];
		this.setState({Price:latestPrice,
						ingredients:newIngredients});
                this.updatePurchasableState(newIngredients);
            }
	}*/

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	continue = () => {
		//alert('Continue building Burger!');
			this.props.history.push( '/checkout' );	
	}
	render() {

			const disabledInfo = {
				...this.props.ings
			};
			for(let key in disabledInfo)
			{disabledInfo[key] = disabledInfo[key]<=0;}

	
		let ordersummary=null;
		let burger=" ";
		if(this.props.ings) {
			burger=(
			<Aux>
			<Burger ingredients={this.props.ings}/>
			<BuildControls 
			disabled={disabledInfo} 
			ingredientRemoved={this.props.onIngredientRemoved} 
			ingredientAdded={this.props.onIngredientAdded}
			price={this.props.price}
			ordered={this.purchaseHandler}
			purchasable={this.updatePurchasableState()}
			/>
			</Aux>);
			ordersummary=(<OrderSummary 
				buttonCancel={this.purchaseCancelHandler} 
				ingredients={this.props.ings}
				buttonContinue={this.continue}
				totalPrice={this.props.price}/>);
		}

		return(
			<Aux>
			<Modal purchasing={this.state.purchasing}
			modalClosed={this.purchaseCancelHandler}>
			{ordersummary}
			
			</Modal>
			{burger}
			</Aux>
			);
	}
}

const mapStateToProps = state => {
	return{
		ings:state.ingredients,
		price:state.Price
	};
}
const mapDispatchToProps = dispatch => {
	return{
		onIngredientAdded : (ingName) => dispatch(actionCreators.addIngredient(ingName)),
		onIngredientRemoved : (ingName) => dispatch(actionCreators.removeIngredient(ingName))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);