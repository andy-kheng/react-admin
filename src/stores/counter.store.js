import {action, observable, computed} from 'mobx'

class CounterStore {
  @observable loading = false;
  @observable number = 0;

  @action increment = () => {
    this.number += 1
  }

  @action incrementAsync = async() => {
    this.loading = true
    return new Promise((resolve) => {
      setTimeout(() => {
        this.loading = false
        resolve(this.number += 1)
      }, 1000)
    })
  }

  @action decrement = () => {
    this.number -= 1
  }
}

export default CounterStore
