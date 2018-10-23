import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component {
	state={
		orders:[]
	}
	componentDidMount() {
		const fetchedOrders=[];
		axios.get('/orders.json')

		.then(res => {
			for(let key in res.data) {
				fetchedOrders.push({
					...res.data[key],
					id:key
				});
			}
			this.setState({orders:fetchedOrders})
		})
	}
	render() {
		return (
			<div>
				{
					this.state.orders.map(order => {
						return(
							<Order 
								key={order.id}
								ingredients={order.ingredients}
								price={order.price}/>)
					})}
			</div>)
	}
}
export default Orders;