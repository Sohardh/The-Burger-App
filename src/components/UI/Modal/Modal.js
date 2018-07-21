import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{ 
	shouldComponentUpdate(nextProps, nextState) {
		return   nextProps.purchasing !==this.props.purchasing;
	}
	
	componentWillUpdate (){
		console.log('[Modal]will update');
	}
	render() {
	return(<Aux>
	<Backdrop show={this.props.purchasing} clicked={this.props.modalClosed}/>
	<div 
	className={classes.Modal}
	style={{
		display: this.props.purchasing ? 'block' : 'none' 
	}}>
	{this.props.children}
	</div>
	</Aux>);
}
}

export default Modal;