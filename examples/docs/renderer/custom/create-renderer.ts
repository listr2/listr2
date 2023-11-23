// #region create
import type { ListrRenderer, ListrTaskObject } from 'listr2'
import { Listr } from 'listr2'

type MyAmazingRendererOptions = (typeof MyAmazingRenderer)['rendererOptions']

type MyAmazingRendererTasks = ListrTaskObject<any, typeof MyAmazingRenderer>[]

class MyAmazingRenderer implements ListrRenderer {
  // Designate this renderer as tty or nonTTY
  public static nonTTY = true
  // designate your renderer options that will be showed inside the `ListrOptions` as rendererOptions
  public static rendererOptions: never
  // designate your custom internal task-based options that will show as `options` in the task itself
  public static rendererTaskOptions: never

  // get tasks to be rendered and options of the renderer from the parent
  constructor (
    public tasks: MyAmazingRendererTasks,
    public options: MyAmazingRendererOptions
  ) {}

  // implement custom logic for render functionality
  public render (): void {}

  // implement custom logic for end functionality
  public end (err: Error): void {}
}
// #endregion create

// #region run
const tasks = new Listr(
  [
    /* Array of task objects */
  ],
  { renderer: MyAmazingRenderer }
)

await tasks.run()
// #endregion run
