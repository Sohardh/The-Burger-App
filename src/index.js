import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import{createStore, applyMiddleware, compose} from 'redux';
import reducer from './Store/reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

const logger = store => {
	return next => {
		return action => {
			console.log('Middleware Dispatching',action);
			const result = next(action);
			console.log('Middleware next state',store.getState());
			return result;

		}
	}
}
const store=createStore(reducer,composeEnhancers(applyMiddleware(logger, thunk)));

const app = (
	<Provider store={store}>
	<BrowserRouter>
		<App/>
	</BrowserRouter>
	</Provider>
	);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
