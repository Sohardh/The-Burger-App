import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import {connect } from 'react-redux';

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
			valid: false,
			touched: false
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
			valid: false,
			touched: false
		},
		zipcode:{
			elementType: 'input',
			elementConfig: {
				type:'text',
				placeholder: 'ZIP Code'
			},
			value:'',
			validation: {
				required:true,
				minLength:6
			},
			valid: false,
			touched: false
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
			valid: false,
			touched: false
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
			valid: false,
			touched: false
		},
		deliveryMethod:{
			elementType: 'select',
			elementConfig: {
				options: [
				{value: 'fastest', displayValue:'Fastest'},
				{value: 'cheapest', displayValue:'Cheapest'}
				]
				
			},
			value:'',
			validation: {
				required:false
			},
			valid: true,
		}
	},
		formIsValid:false
}

	

	orderHandler = (event) => {
		event.preventDefault();
		const formElement = {};
		for(let inputIdentifier in this.state.orderForm) {
			formElement[inputIdentifier] = this.state.orderForm[inputIdentifier].value
		}
		const order= {
			ingredients: this.props.ings,
			price: this.props.price,
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
		updatedFormElement.touched=true;
		updatedFormElement.valid =this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid =true;
		for(let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid //to maintain previous validity of form
		}
		console.log(formIsValid)
		this.setState({
			orderForm:updatedOrderForm,
			formIsValid:formIsValid
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
				return(<Input 
					invalid={!input.config.valid} 
					changed={(event) => this.inputChangedHandler(event,input.id)} 
					key={input.id} 
					elementType={input.config.elementType} 
					shouldValidate={input.config.validation }
					elementConfig={input.config.elementConfig} 
					touched={input.config.touched}
					value={input.config.value} />)
			})}
			<Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid} >Order</Button>
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
const mapStateToProps = state => {
	return{
		ings:state.ingredients,
		price:state.Price
	}
}

export default connect(mapStateToProps)(ContactData);