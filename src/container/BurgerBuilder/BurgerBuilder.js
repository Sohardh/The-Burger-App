import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
	salad:0.5,
	meat:1.3,
	cheese:0.6,
	bacon:0.7
}
class BurgerBuilder extends Component {
	state={
		ingredients:{
			salad:0,
			meat:0,
			cheese:0,
			bacon:0		
		},
		Price:4,
		purchasable:false,
		purchasing: false
	}
	updatePurchasableState (ingredients) {

		const sum = Object.keys(ingredients).map(igKey => {
			return ingredients[igKey]
		}).reduce((sum, el) => {return sum+el;},0)
		this.setState({purchasable: sum>0})
	}

	addIngredHandler = (type) => {
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
	}

	removeIngredHandler = (type) => {
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
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	continue = () =>{
		//alert('Continue building Burger!');
		this.props.history.push('/checkout');
	}
	render() {

			const disabledInfo = {
				...this.state.ingredients
			};
			for(let key in disabledInfo)
			{disabledInfo[key] = disabledInfo[key]<=0;}

		return(
			<Aux>
			<Modal purchasing={this.state.purchasing}
			modalClosed={this.purchaseCancelHandler}>
			<OrderSummary 
				buttonCancel={this.purchaseCancelHandler} 
				ingredients={this.state.ingredients}
				buttonContinue={this.continue}
				totalPrice={this.state.Price}/>
			</Modal>
			<Burger ingredients={this.state.ingredients}/>
			<BuildControls 
			disabled={disabledInfo} 
			ingredientRemoved={this.removeIngredHandler} 
			ingredientAdded={this.addIngredHandler}
			price={this.state.Price}
			ordered={this.purchaseHandler}
			purchasable={this.state.purchasable}
			/>

			</Aux>
			);
	}
}

export default BurgerBuilder;