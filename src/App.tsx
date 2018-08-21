import CartList from '@@scenes/cart-list'
import ProductList from '@@scenes/product-list'
import Store from '@@store/index'
import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.module.scss'

class App extends React.Component {
  public render() {
    return (
      <Provider store={Store}>
        <BrowserRouter>
          <div>
            <Route exact={true} path="/" component={ProductList} />
            <Route path="/cart" component={CartList} />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
