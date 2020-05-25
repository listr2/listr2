/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Color, render } from 'ink'
import React, { Fragment, useEffect, useState } from 'react'

import { Listr } from '@root/index'
import { Logger } from '@utils/logger'

type Ctx = {}

const logger = new Logger({ useIcons: false })

async function main (): Promise<void> {
  let task: Listr<Ctx, any>

  logger.start('Example output from a task with stdout.')

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

        setTimeout(unmount, 2000)

        return waitUntilExit()
      },
      options: {
        persistentOutput: true
      }
    }
  ], { concurrent: false, renderer: 'default' })

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch(e) {
    logger.fail(e)
  }

  logger.start('Example output from a task with stdout.')

  task = new Listr<Ctx, any>([
    {
      title: 'This task will show INK as output.',
      task: async (ctx, task): Promise<any> => {
        const { unmount, waitUntilExit } = render(
          <Fragment>
            <Box justifyContent="flex-start">
              <Box>X</Box>
            </Box>

            <Box justifyContent="center">
              <Box>X</Box>
            </Box>

            <Box justifyContent="flex-end">
              <Box>X</Box>
            </Box>

            <Box justifyContent="space-between">
              <Box>X</Box>
              <Box>Y</Box>
            </Box>

            <Box justifyContent="space-around">
              <Box>X</Box>
              <Box>Y</Box>
            </Box>
          </Fragment>
          , task.stdout())

        setTimeout(unmount, 2000)

        return waitUntilExit()
      },
      options: {
        persistentOutput: true
      }
    }
  ], { concurrent: false, renderer: 'default' })

  try {
    const context = await task.run()
    logger.success(`Context: ${JSON.stringify(context)}`)
  } catch(e) {
    logger.fail(e)
  }
}

main()