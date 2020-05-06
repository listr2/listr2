import { Manager } from '@root/index'

class MyTaskThingy {
  public tasks: Manager

  constructor () {
    this.tasks = new Manager()
  }

}