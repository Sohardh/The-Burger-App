import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders.js';

const INGREDIENTS_PRICE = {
	salad:0.5,
	meat:1.3,
	cheese:0.6,
	bacon:0.7
}
class BurgerBuilder extends Component {
	state={
		ingredients:null,
		Price:4,
		purchasable:false,
		purchasing: false
	}
	componentDidMount () {
		axios.get('https://react-burger-app-dd058.firebaseio.com/orders/sni.json')
		.then(response => {
			this.setState({ingredients:response.data});

		})
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
		const order= {
			ingredients: this.state.ingredients,
			price: this.state.Price,
			customer: {
				name: 'demi',
				addredd: {
					street: 'the royal street',
					zipcode:'6255',
					country: 'India'
				}
			}
		}
		axios.post('/orders.json',order) 
			.then(response=>console.log(response))
	}
	render() {

			const disabledInfo = {
				...this.state.ingredients
			};
			for(let key in disabledInfo)
			{disabledInfo[key] = disabledInfo[key]<=0;}

	
		let ordersummary=null;
		let burger='yo'
		if(this.state.ingredients) {
			burger=(
			<Aux>
			<Burger ingredients={this.state.ingredients}/>

			<BuildControls 
			disabled={disabledInfo} 
			ingredientRemoved={this.removeIngredHandler} 
			ingredientAdded={this.addIngredHandler}
			price={this.state.Price}
			ordered={this.purchaseHandler}
			purchasable={this.state.purchasable}
			/>
			</Aux>);
			ordersummary=(<OrderSummary 
				buttonCancel={this.purchaseCancelHandler} 
				ingredients={this.state.ingredients}
				buttonContinue={this.continue}
				totalPrice={this.state.Price}/>);
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

export default BurgerBuilder;