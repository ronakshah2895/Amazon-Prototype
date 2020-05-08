import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';
import * as authActions from '../../store/actions/authActions';

function Header() {
  const authReducerData = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  return (
    <div className="HEADER">
      {authReducerData.loggedIn && (
        <div className="ui secondary icon menu">
        <div className="item"><i className="large yellow active amazon icon"></i></div>
          <NavLink exact className="item" activeClassName="active" to="/">Home</NavLink>
          <NavLink exact className="item" activeClassName="active" to="/orderDetails">TEST</NavLink>
          <NavLink exact className="item" activeClassName="active" to="/productlist">Products</NavLink>
          {authReducerData.user_type === 'Seller' && <NavLink exact className="item" activeClassName="active" to="/addProduct">Add Product</NavLink>}
          <NavLink exact className="item" activeClassName="active" to="/orders">Orders</NavLink>
          <Link onClick={() => dispatch(authActions.logout())} className="item right" to="/">Logout</Link>
        </div>
      )}
      {!authReducerData.loggedIn && (
        <div className="ui secondary icon menu">
        <div className="item"><i className="large yellow active amazon icon"></i></div>
          <NavLink exact className="item" activeClassName="active" to="/">Home</NavLink>
          <NavLink exact className="item" activeClassName="active" to="/orderDetails">TEST</NavLink>
          <NavLink exact className="item right" activeClassName="active" to="/login">Login</NavLink>
        </div>
      )}
    </div>
  );
}

export default Header;
