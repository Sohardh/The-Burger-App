import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	state= {
		orderForm:{
		name:{
			elementType: 'input',
			elementConfig: {
				type:'text',
				placeholder: 'Your Name'
			},
			value:'',
			validation: {
				required:true
			},
			valid: false
		},
		street:{
			elementType: 'input',
			elementConfig: {
				type:'text',
				placeholder: 'Street Name'
			},
			value:'',
			validation: {
				required:true
			},
			valid: false
		},
		zipcode:{
			elementType: 'input',
			elementConfig: {
				type:'text',
				placeholder: 'ZIP Code'
			},
			value:'',
			validation: {
				required:true
			},
			valid: false
		},
		country:{
			elementType: 'input',
			elementConfig: {
				type:'text',
				placeholder: 'country'
			},
			value:'',
			validation: {
				required:true
			},
			valid: false
		},
		email:{
			elementType: 'input',
			elementConfig: {
				type:'text',
				placeholder: 'Your email'
			},
			value:'',
			validation: {
				required:true
			},
			valid: false
		},
		deliveryMethod:{
			elementType: 'select',
			elementConfig: {
				options: [
				{value: 'fastest', displayValue:'Fastest'},
				{value: 'cheapest', displayValue:'Cheapest'}
				]
				
			},
			value:''
		},
		

	}
}

	checkValidity(event, rules) {
		let isValid: false;

		if(rules.required) {
			isValid=event.trim() !==''
		}
		return isValid
	}

	orderHandler = (event) => {
		event.preventDefault();
		const formElement = {};
		for(let inputIdentifier in this.state.orderForm) {
			formElement[inputIdentifier] = this.state.orderForm[inputIdentifier].value
		}
		const order= {
			ingredients: this.props.ingredients,
			price: this.props.Price,
			orderData:formElement
		}
		
		
		axios.post('/orders.json',order) 
			.then(response=>console.log(response))		
	}

	inputChangedHandler =(event,inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		}
		const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
		updatedFormElement.value= event.target.value;
		updatedFormElement.valid =this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		this.setState({
			orderForm:updatedOrderForm
		})
	}

	
	render() {
		let formArray = [];
		for(let key in this.state.orderForm) {
			formArray.push({
				id:key,
				config:this.state.orderForm[key]
			})
		}

		let form=(
			<form>
			{formArray.map(input => {
				return(<Input changed={(event) => this.inputChangedHandler(event,input.id)} key={input.id} elementType={input.config.elementType} elementConfig={input.config.elementConfig} value={input.config.value} />)
			})}
			<Button btnType="Success" clicked={this.orderHandler}>Order</Button>
			</form>
			)
	
		return(
			<div className={classes.ContactData}>
			<h4>Enter Your contact data</h4>
			{form}
			
			</div>
			);
	}
}

export default ContactData;