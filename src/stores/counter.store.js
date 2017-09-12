import { action, observable, computed } from 'mobx'

class CounterStore {
  @observable number = 0;

  @action increment = ()  =>{
    this.number += 1
  }

  @action incrementAsync = async () => {
    await Promise.resolve(this.number += 1)
  }

  @action decrement = ()  =>{
    this.number -= 1
  }
}

export default CounterStore
