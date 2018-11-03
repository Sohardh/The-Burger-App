export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const AUTH_START='AUTH_START';
export const AUTH_SUCCESS='AUTH_SUCCESS';
export const AUTH_FAIL='AUTH_FAIL';


//action creators
export const addNow = (ingName) => {
	return {
		type: ADD_INGREDIENT,
		ingredientName: ingName
	};
};

export const addIngredient = (ingName) => {
	return dispatch => {setTimeout(() => {
		dispatch(addNow(ingName))
	} ,1000);
}
};

export const removeIngredient = (ingName) => {
	return {
		type: REMOVE_INGREDIENT,
		ingredientName: ingName
	};
};