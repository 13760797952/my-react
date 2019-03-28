import React from 'react'
import ReactDom from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import App from './App'
import {counter,addGun,removeGun,addGunAsync} from './index.redux'


const store = createStore(counter,compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>{}
))
ReactDom.render(
  (<Provider store={store}>
    <App/>
  </Provider>),
  document.getElementById('root')
)

// store.subscribe(render)
