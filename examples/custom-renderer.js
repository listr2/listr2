const { Listr, ListrBaseRenderer } = require('../dist/index')

class MyAmazingRenderer extends ListrBaseRenderer {
  // Designate this renderer as tty or nonTTY
  static nonTTY = true
  // designate your renderer options that will be showed inside the `ListrOptions` as rendererOptions
  static rendererOptions = { test: false }
  // designate your custom internal task-based options that will show as `options` in the task itself
  static rendererTaskOptions = { taskOption: true }
  tasks = []
  options = {}

  // get tasks to be renderered and options of the renderer from the parent
  constructor (tasks, options) {
    super()
    this.tasks = tasks
    this.options = options
  }

  // implement custom logic for render functionality
  render () {
    this.tasks.forEach((task) => console.log(task.title))
  }

  // implement custom logic for end functionality
  end (err) {}
}

async function main () {
  await new Listr([
    {
      title: 'Test',
      task: () => {},
      options: {
        taskOption: true
      }
    }
  ], { renderer: MyAmazingRenderer, rendererOptions: { test: true } }).run()
}

main()