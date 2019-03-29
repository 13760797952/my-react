import React from 'react'
import {Link,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import App from './App'
import {logout} from './Auth.redux.js'


function campSecond(){
  return <h2>二营</h2>
}
function squadron(){
  return <h2>骑兵连</h2>
}

@connect(
  state=>state.auth,
  {logout}
)
class Dashboard extends React.Component{
  render(){
    const match = this.props.match
    const redirectToLogin = <Redirect to="/login"></Redirect>
    const app = (
      <div>
        {this.props.isAuth?<button onClick={this.props.logout}>退出登录</button>:null}
        <ul>
          <li>
            <Link to={`${match.url}/`}>一营</Link>
          </li>
          <li>
            <Link to={`${match.url}/camp-second`}>二营</Link>
          </li>
          <li>
            <Link to={`${match.url}/squadron`}>骑兵连</Link>
          </li>
        </ul>
        <Route path="/dashboard/" exact component={App}></Route>
        <Route path="/dashboard/camp-second" component={campSecond}></Route>
        <Route path="/dashboard/squadron" component={squadron}></Route>
      </div>
    )
    return this.props.isAuth ? app : redirectToLogin
  }
}
export default Dashboard