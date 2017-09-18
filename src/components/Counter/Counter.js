import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'

@inject('stores')
@observer
class Counter extends Component {
  render() {
    console.log('mobx', this.props.stores.counterStore)
    const {number, increment, incrementAsync, decrement, loading} = this.props.stores.counterStore

    return (
      <div>
        <p>Counter {number}
          {loading
            ? 'Loading...'
            : ''}</p>
        <br/>
        <button onClick={decrement}>decrement</button>
        <button onClick={incrementAsync} disabled={loading}>increment</button>
      </div>
    )
  }
}

export default Counter


// const Counter = inject('stores')(observer(() => <div>Counter</div>))
