import { delay, Listr } from 'listr2'

try {
  await new Listr(
    [
      {
        title: 'Provisioning the servers.',
        task: async(): Promise<void> => {
          await delay(5000)
        },
        rollback: async(_, task): Promise<void> => {
          task.title = 'Tearing the servers back down.'

          await delay(1000)
        }
      },
      {
        title: 'Running the health checks.',
        task: async(_, task): Promise<void> => {
          await delay(1000)

          task.output = 'Health check failed, cancelling the run.'

          task.cancel()

          await delay(5000)
        }
      },
      {
        title: 'Deploying the application.',
        task: async(): Promise<void> => {
          await delay(5000)
        },
        rollback: async(_, task): Promise<void> => {
          task.title = 'Rolling back the deployment.'

          await delay(1000)
        }
      }
    ],
    { concurrent: true, renderer: 'default' }
  ).run()
} catch(e: any) {
  console.error(e)
}
