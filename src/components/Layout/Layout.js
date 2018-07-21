import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary.js';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state={
			showSideDrawer:false,
		}
		closeSideDrawerHandler = () => { 
			this.setState({showSideDrawer:false});
		}

		OpenSideDrawerHandler = () => {
			this.setState((prevState) => 
				{return {showSideDrawer:true}});
		}

	render() {
		return(
	<Aux>
	<Toolbar showDrawer={this.OpenSideDrawerHandler}/>
	<SideDrawer open={this.state.showSideDrawer} close={this.closeSideDrawerHandler}/>
	<main className={classes.content}>
		{this.props.children}
	</main>
	</Aux>);
}
}

export default Layout;