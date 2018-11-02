import * as actionTypes from './actions.js'

const initialState={
		ingredients:{
			salad:0,
			bacon:0,
			cheese:0,
			meat:0
		},
		Price:4
	};

const INGREDIENTS_PRICE = {
	salad:0.5,
	meat:1.3,
	cheese:0.6,
	bacon:0.7
}

const reducer =(state=initialState,action) => {
	switch(action.type){
	case actionTypes.ADD_INGREDIENT: 
		return{
		...state,
		ingredients: {
			...state.ingredients,
			[action.ingredientName]: state.ingredients[action.ingredientName]+1
		},
		Price:state.Price + INGREDIENTS_PRICE[action.ingredientName]
	};
	case actionTypes.REMOVE_INGREDIENT: 
		return{
		...state,
		ingredients: {
			...state.ingredients,
			[action.ingredientName]: state.ingredients[action.ingredientName]-1
		},
		Price:state.Price - INGREDIENTS_PRICE[action.ingredientName]
	};
	default: 
			return state;

}
}

export default reducer;