import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form.js'

@connect(
  state=>state.user,
  {register}
)
@imoocForm

class Register extends React.Component{
  constructor(props){
    super(props)
    // this.state = {
    //   user:'',
    //   pwd:'',
    //   repeat_pwd:'',
    //   type:'genius'
    // }
    this.handleRegister = this.handleRegister.bind(this) //性能好一点
  }
  // handleChange(key,val){
  //   this.setState({
  //     [key]:val
  //   })
  // }
  componentDidMount(){
    this.props.handleChange('type','genius')
  }
  handleRegister(){
    this.props.register(this.props.state)
  }
  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
        <Logo></Logo>
        {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
        <WingBlank>
          <List>
            <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
            <InputItem onChange={v=>this.props.handleChange('pwd',v)} type="password">密码</InputItem>
            <InputItem onChange={v=>this.props.handleChange('repeat_pwd',v)} type="password">确认密码</InputItem>
          </List>
          <WhiteSpace/>
          <List>
            <RadioItem
              checked={this.props.state.type==="genius"}
              onChange={()=>this.props.handleChange('type','genius')}
            >
              牛人
            </RadioItem>
            <RadioItem
              checked={this.props.state.type==="boss"}
              onChange={()=>this.props.handleChange('type','boss')}
            >
              boss
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register