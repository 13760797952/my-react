import React from 'react'
import ReactDom from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'

// import {counter} from './index.redux'
import reducer from './reducer'

import Auth from './Auth.js'
import Dashboard from './Dashboard.js'


const store = createStore(reducer,compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>{}
))

// class Test extends React.Component{
//   render(){
//     console.log(this.props)
//     return <h2>测试组件</h2>
//   }
// }
ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <Switch>
        {/**只渲染命中的第一个路由 */}
        <Route path="/login" exact component={Auth}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Redirect to="/dashboard"></Redirect>
      </Switch>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)

// store.subscribe(render)
