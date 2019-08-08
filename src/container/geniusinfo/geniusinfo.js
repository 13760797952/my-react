import React from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import AvatarSelect from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state=>state.user,
  {update}
)

class GeniusInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title:'',
      desc:''
    }
  }
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  render(){
    const path = this.props.location.pathname
    const redirects = this.props.redirectTo
    return (
      <div>
        {redirects&&redirects!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar mode="dark">牛人完善信息页面</NavBar>
        <AvatarSelect selectAvatar={(imgname)=>{
          this.setState({
            avatar:imgname
          })
          }}
        ></AvatarSelect>
        <InputItem onChange={v=>this.handleChange('title',v)}>
          求职岗位
        </InputItem>
        <TextareaItem
          onChange={v=>this.handleChange('desc',v)}
          rows={3} 
          autoHeight 
          title="个人简介">
        </TextareaItem>
        <Button
           onClick={()=>{
             this.props.update(this.state)
           }}
          type="primary"
        >
          保存
        </Button>
      </div>
    )
  }
}

export default GeniusInfo