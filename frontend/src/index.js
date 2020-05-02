import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/authReducer';
import productReducer from './store/reducers/productReducer';
import categoryReducer from './store/reducers/categoryReducer';
import alertReducer from './store/reducers/alertReducer';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  authReducer, productReducer, categoryReducer, alertReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
