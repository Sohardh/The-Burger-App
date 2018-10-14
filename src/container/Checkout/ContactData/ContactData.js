import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from 'axios';

class ContactData extends Component {
	state= {
		name:'',
		email:'',
		address: {
			street: ' ',
			postalcode: ' '
		}

	}
	orderHandler= (event) => {
		event.preventDefault();
		const order= {
			ingredients: this.props.state.ingredients,
			price: this.props.state.Price,
			customer: {
				name: 'demi',
				address: {
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
		return(
			<div className={classes.ContactData}>
			<h4>Enter Your contact data</h4>
			<form>
			<input className={classes.Input} type="text" name="name" placeholder="Your Name" />
			<input className={classes.Input} type="text" name="name" placeholder="Email" />
			<input className={classes.Input} type="text" name="name" placeholder="Street" />
			<Button clicked={this.orderHandler} btnType="Success">Order</Button>
			</form>
			</div>
			);
	}
}

export default ContactData;