import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('counterStore')
@observer
class Counter extends Component {
  render () {
    console.log('mobx', this.props.counterStore)
    const { number, increment, incrementAsync, decrement } = this.props.counterStore

    return (
      <div>
        <p>Counter { number }</p>
        <br/>
        <button onClick={decrement}>decrement</button>
        <button onClick={incrementAsync}>increment</button>
      </div>
    )
  }
}

export default Counter
