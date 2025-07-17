import { ListrEnquirerPromptAdapter } from '@listr2/prompt-adapter-enquirer'

import { delay, Listr } from 'listr2'

try {
  await new Listr(
    [
      {
        title: 'Getting you on-board.',
        task: async(ctx, task): Promise<boolean> =>
          (ctx.user = await task.prompt(ListrEnquirerPromptAdapter).run({
            type: 'Toggle',
            message: 'Do you want to create beautiful CLI interfaces?',
            initial: true
          }))
      },

      {
        title: 'Doing initial configuration',
        skip: (ctx): boolean => !ctx.user,
        task: (_, task): Listr =>
          task.newListr(
            [
              {
                title: 'Spinning up a new project...',
                task: async(_, task): Promise<void> => {
                  await delay(2000)
                  task.output = 'Created a new project.'
                }
              },

              {
                title: 'Install Listr2...',
                task: async(_, task): Promise<void> => {
                  task.output = 'Creating a new repository...'
                  await delay(2000)
                  task.output = 'Installing Listr2...'
                  await delay(2000)
                  task.output = 'Listr2 installed.'
                }
              },

              {
                title: 'Reading the documentation and the examples...',
                task: async(_, task): Promise<void> => {
                  task.output = 'Documentation can be found in https://listr2.kilic.dev'
                  await delay(500)
                  task.output = 'Created a new instance of Listr!'
                  await delay(500)
                  task.output = 'Added a context.'
                  await delay(500)
                  task.output = 'Added some subtasks.'
                  await delay(500)
                  task.output = 'Get the user input through prompts.'
                  await delay(500)
                  task.output = 'Enabling some tasks.'
                  await delay(500)
                  task.output = 'Skipping some tasks.'
                  await delay(500)
                  task.output = 'Showing some output to user.'
                },
                rendererOptions: {
                  bottomBar: 3
                }
              }
            ],
            { concurrent: true, rendererOptions: { collapseSubtasks: false } }
          )
      },

      {
        title: 'Create beautiful interfaces...',
        enabled: (ctx): boolean => ctx.user,
        task: (_, task): Listr =>
          task.newListr(
            [
              {
                title: 'Show some output!',
                task: async(): Promise<void> => {
                  await delay(2000)
                }
              },

              {
                title: 'Enable tasks conditionally!',
                task: async(): Promise<void> => {
                  await delay(1000)
                }
              },

              {
                title: 'Throw and handle some errors!',
                task: async(_, task): Promise<void> => {
                  await delay(2500)
                  task.skip('No errors at all!')
                }
              }
            ],
            { concurrent: true, rendererOptions: { collapseSubtasks: false } }
          )
      },

      {
        title: 'Write some code!',
        enabled: (ctx): boolean => ctx.user,
        task: (_, task): Listr =>
          task.newListr(
            [
              {
                title: 'More code...',
                task: async(): Promise<void> => {
                  await delay(2000)
                }
              },

              {
                title: 'Oh no the types!',
                task: async(): Promise<void> => {
                  await delay(1000)
                }
              },

              {
                title: 'Some tests are needed too!',
                task: async(): Promise<void> => {
                  await delay(2500)
                }
              },

              {
                title: 'CI/CD configuration is a must!',
                task: async(): Promise<void> => {
                  await delay(2500)
                }
              }
            ],
            { concurrent: false, rendererOptions: { collapseSubtasks: true } }
          )
      },

      {
        title: 'Pulling some hair out.',
        task: (_, task): Listr =>
          task.newListr(
            [
              {
                title: 'Fixing bugs...',
                task: async(_, task): Promise<void> => {
                  await delay(1000)
                  task.skip('Can not find any bugs!')
                }
              },

              {
                title: 'Fixing type errors...',
                task: async(): Promise<void> => {
                  await delay(1000)
                  throw new Error('This type can not be assigned to that type, oh noes!')
                }
              },

              {
                title: 'Getting some help from Google.',
                task: async(_, task): Promise<void> => {
                  await delay(500)
                  task.title = 'I have found the answers to the universe!'
                }
              }
            ],
            {
              concurrent: true,
              exitOnError: false
            }
          )
      },

      {
        title: 'In the end it will all be worth it!',
        task: async(_, task): Promise<void> => {
          await delay(1000)
          task.title = 'Created a beautiful CLI interface!'
        }
      }
    ],
    { renderer: 'default' }
  ).run()
} catch(e: any) {
  console.error(e)
}
