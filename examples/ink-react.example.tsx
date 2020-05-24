/* eslint-disable @typescript-eslint/no-empty-function */
import delay from 'delay'
import { render, Color } from 'ink'
import React, { useState, useEffect } from 'react'

import { Listr } from '@root/index'
import { Logger } from '@utils/logger'

type Ctx = {}

const logger = new Logger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<Ctx, any>

  logger.start('Example output from a task.')

  task = new Listr<Ctx, any>([
    {
      title: 'This task will show INK as output.',
      task: async (ctx, task): Promise<any> => {
        const Counter = () => {
          const [ counter, setCounter ] = useState(0)

          useEffect(() => {
            const timer = setInterval(() => {
              setCounter((previousCounter) => previousCounter + 1)
            }, 100)

            return (): void => {
              clearInterval(timer)
            }
          }, [])

          return <Color green>{counter} tests passed</Color>
        }

        const { unmount, waitUntilExit } = render(<Counter />, task.stdout())

        setTimeout(unmount, 10000)

        return waitUntilExit()
      },
      options: {
        persistentOutput: true
      }
    }
  ], { concurrent: false, renderer: 'verbose' })

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch(e) {
    logger.fail(e)
  }
}

main()