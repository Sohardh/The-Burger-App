import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../Store/index';
import {connect } from 'react-redux';

class Auth extends Component {
	state={
		controls:{
			email:{
			elementType: 'input',
			elementConfig: {
				type:'text',
				placeholder: 'Enter Your Email'
			},
			value:'',
			validation: {
				required:true
			},
			valid: false,
			touched: false
		},
		password:{
			elementType: 'input',
			elementConfig: {
				type:'password',
				placeholder: 'Enter Password'
			},
			value:'',
			validation: {
				required:true,
				minLength:5
			},
			valid: false,
			touched: false
		},
		}
	}

	checkValidity(event, rules) {
		let isValid: true;
		
		if(rules.required) {
			isValid=event.trim() !=='' ;
		}
		if(rules.minLength) {
			isValid = event.length>=rules.minLength ;
		}
		return isValid;
	}

	inputChangedHandler = (event,controlName) => {
			const updateControls = {
				...this.state.controls,
				[controlName]:{...this.state.controls[controlName],
					value:event.target.value,
					valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
					touched:true}
};
		this.setState({controls:updateControls});
	}

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value)
	}
	render() {
		let formArray = [];
		for(let key in this.state.controls) {
			formArray.push({
				id:key,
				config:this.state.controls[key]
			})
		}

		let form=(formArray.map(input => {
				return(<Input 
					invalid={!input.config.valid} 
					changed={(event) => this.inputChangedHandler(event,input.id)} 
					key={input.id} 
					elementType={input.config.elementType} 
					shouldValidate={input.config.validation }
					elementConfig={input.config.elementConfig} 
					touched={input.config.touched}
					value={input.config.value} />)
			}));
		return(
			<div>
			<form onSubmit={this.submitHandler}>
			{form}
			<Button btnType="Success" >Login</Button>
			</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
		return{
			onAuth : (email,password) => dispatch(actions.auth(email,password))
		}
} 

export default connect(null,mapDispatchToProps) (Auth);