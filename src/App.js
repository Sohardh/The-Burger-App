import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import { Route ,Switch} from 'react-router-dom';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div>
      <Layout>
      <Switch>
      <Route path="/orders" exact component={Orders}/>
        <Route path="/checkout" component={Checkout}/>
         <Route path="/auth" component={Auth}/>
      <Route path="/" exact component={BurgerBuilder}/>
    
      </Switch>
      </Layout>
      </div>
    );
  }
}

export default App;
