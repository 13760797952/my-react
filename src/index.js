import React from 'react'
import ReactDom from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css';

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/auth-route/auth-route'
import Dashboard from './component/dashboard/dashboard'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Chat from './component/chat/chat'
import reducer from './reducer'
import './config'
import './index.css'

const store = createStore(reducer,compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))
//boss genius me msg 4个页面
ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch> {/** 只要使用了switch,路由只会命中渲染第一个 */}
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={Dashboard}></Route> {/** 1.如果不放在switch标签里面 不写path属性 会显示在所有路由下面 2.如果放在switch里面，没有的路由就会显示*/}
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)
