import React from 'react'
import {connect} from 'react-redux'
import {addGun,removeGun,addGunAsync} from './index.redux'

// const mapStateToProps = (state)=>{
//   return {num:state}
// }
// const actionCreators = {addGun,removeGun,addGunAsync}
// App = connect(mapStateToProps,actionCreators)(App)
@connect(
  // 你要什么state什么属性放到props里
  state=>({num:state.counter}),
  // 你要什么方法，放到props里，自动dispatch
  {addGun,removeGun,addGunAsync}
)

class App extends React.Component{
  // constructor(props){
  //   super(props);
  // }
  render(){
    // const num = this.props.num
    // const addGun = this.props.addGun
    // const removeGun = this.props.removeGun
    // const addGunAsync = this.props.addGunAsync
    return (
      <div>
        <h1>现在有{this.props.num}把机枪</h1>
        <button onClick={this.props.addGun}>申请武器</button>
        <button onClick={this.props.removeGun}>回收武器</button>
        <button onClick={this.props.addGunAsync}>晚一点给武器</button>
      </div>
    )
  }
}

export default App