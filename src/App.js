import React from 'react'

class App extends React.Component{
  render (){
    const boss = "李云龙"
    return (
      <div>
        <h1>独立团,团长{boss}</h1>
        <Camp boss="张大喵"></Camp>
        <Squadron boss="孙德胜"></Squadron>
      </div>
    )
  }
}

function Squadron(props){
  return <h2>骑兵连连长{props.boss},冲啊</h2>
}

class Camp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      solders:['虎子','柱子','王根生']
    }
    // this.addSolder = this.addSolder.bind(this)
  }
  addSolder = ()=>{
    this.setState({
      solders:[...this.state.solders,'新兵'+Math.ceil(Math.random()*100)]
    })
  }
  render(){
    return (
      <div>
        <h2>一营营长,{this.props.boss}</h2>
        <button onClick={this.addSolder}>新兵入伍</button>
        <ul>
          {this.state.solders.map(v=>{
            return <li key={v}>{v}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default App