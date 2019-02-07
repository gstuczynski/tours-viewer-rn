import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './src/reducers/index';

export default ({children, initialState = {}}) => {
  const store = createStore(reducer, initialState)

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}