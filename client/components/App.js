import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { processAfterLoginThunk } from '../redux/actions/shared'
import { getAllUsersThunk } from '../redux/actions/users'
import { getAllReviewsThunk } from '../redux/actions/reviews'
import { checkForUserThunk } from '../redux/actions/login'
import { getAllProductsThunk } from '../redux/actions/product'
import { getAllCategoriesThunk } from '../redux/actions/category'
import Home from './Home'
import Nav from './Nav'
import Login from './Login'
import Products from './Products'
import SingleProduct from './SingleProduct'
import Cart from './Cart'
import SingleUser from './SingleUser'
import CheckoutPage from './CheckoutPage'
import SignUp from './SignUp'

class App extends Component {
  componentDidMount() {
    const {
      getAllCategories,
      getAllProducts,
      getAllReviews,
      getAllUsers,
      checkForUser,
      processAfterLogin
    } = this.props
    return Promise.all([
      getAllCategories(),
      getAllProducts(),
      getAllUsers(),
      getAllReviews()
    ])
      .then(() => checkForUser())
      .then(({ user: { id } }) => id && processAfterLogin(id, { userId: id }))
  }

  render() {
    return (
      <Router>
        <Route component={Nav} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/checkoutpage" component={CheckoutPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/cart" component={Cart} />
          <Route
            exact
            path="/products/category/:categoryId"
            component={Products}
          />
          <Route path="/products/:id" component={SingleProduct} />
          <Route path="/users/:id/:filter?" component={SingleUser} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk()),
    getAllCategories: () => dispatch(getAllCategoriesThunk()),
    getAllReviews: () => dispatch(getAllReviewsThunk()),
    getAllUsers: () => dispatch(getAllUsersThunk()),
    checkForUser: () => dispatch(checkForUserThunk()),
    processAfterLogin: (userId, newOrder) =>
      dispatch(processAfterLoginThunk(userId, newOrder))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)