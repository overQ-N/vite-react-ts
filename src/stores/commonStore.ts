import {makeAutoObservable,action} from 'mobx'
class CommonStore{
  public title: string = 'title'
  public theme: string = 'default'
  public count:number = 0
  constructor() {
    makeAutoObservable(this)
  }
  setTitle(title: string) {
    this.title = title
  }
  setTheme(theme: string) {
    this.theme = theme
  }
  *increment() {

    yield setTimeout(action('increment', () => {
      this.count++
    }), 2000);
  }
}
export default new CommonStore()