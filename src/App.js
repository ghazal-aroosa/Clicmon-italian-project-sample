import {Route, BrowserRouter as Router} from 'react-router-dom'

import Home from './Components/ProductViewCard'
import Product from './Components/ProductForm/index'
import React from 'react'

function App() {
  return (
    <div>
          <Router>
            <Route path="/" exact><Home/></Route>
            <Route path="/Product" exact><Product/></Route>
          </Router>
    </div>
  );
}
export default App;
