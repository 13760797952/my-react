import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import  {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form.js'


// function hello(){
//   console.log('Hi React')
// }

// function WrapperHello(fn){
//   return function(){
//     console.log('before')
//     fn()
//     console.log('after')
//   }
// }

// hello = WrapperHello(hello)
// hello()

//属性代理
// function WrapperHello(Comp){
//    class WrapComp extends Comp{
//      componentDidMount(){
//        console.log('高阶组件新增周期')
//      }
//      render(){
//        return <Comp></Comp>
//      }
//    }

//   // class WrapComp extends React.Component{
//   //   render(){
//   //     return (
//   //       <div>
//   //         <p>高阶组件特有的元素</p>
//   //         <Comp {...this.props}></Comp>
//   //       </div>
//   //     )
//   //   }
//   // }
//   return WrapComp
// }

// @WrapperHello
// class Hello extends React.Component{
//   render(){
//     return <h2>hello React</h2>
//   }
// }


@connect(
  state=>state.user,
  {login}
)
@imoocForm

class Login extends React.Component{
  constructor(props){
    super(props);
    // this.state = {
    //   user:'',
    //   pwd:''
    // }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  // handleChange(key,val){
  //   this.setState({
  //     [key]:val
  //   })
  // }
  handleLogin(){
    this.props.login(this.props.state)
  }
  register(){
    console.log(this.props)
    this.props.history.push('/register')
  }
  render (){
    return (
      <div>
        {/* <Hello></Hello> */}
        <Logo></Logo>
        {this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo} />:null}
        <WingBlank>
          <List>
            <InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
            <InputItem onChange={v=>this.props.handleChange('pwd',v)} type="password">密码</InputItem>
          </List>
          <WhiteSpace />

          <Button onClick={this.handleLogin} type="primary">登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login