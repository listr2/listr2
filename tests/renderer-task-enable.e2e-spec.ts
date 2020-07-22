/* eslint-disable @typescript-eslint/no-empty-function */
import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'

import { Listr } from '@root/index'

describe('show task enable', () => {
  let mockExit: jest.SpyInstance<never, [number?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStdout: jest.SpyInstance<boolean, [string, string?, Function?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStderr: jest.SpyInstance<boolean, [string, string?, Function?]>

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockExit = mockProcessExit()
    mockStdout = mockProcessStdout()
    mockStderr = mockProcessStderr()
  })

  afterEach(async () => {
    mockExit.mockRestore()
    mockStdout.mockRestore()
    mockStderr.mockRestore()
    jest.clearAllMocks()
  })

  // JeLYvYj1f4ddSjgwkUp7Nr8hICHLdEsU
  it('should enable task with general context', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (ctx): void => {
            ctx.skip = true
          }
        },

        {
          title: 'This task will never execute.',
          enabled: (ctx): boolean => !ctx.skip,
          task: (): void => {}
        }
      ],
      {
        concurrent: false, rendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('JeLYvYj1f4ddSjgwkUp7Nr8hICHLdEsU-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('JeLYvYj1f4ddSjgwkUp7Nr8hICHLdEsU-err')
    expect(mockExit.mock.calls).toMatchSnapshot('JeLYvYj1f4ddSjgwkUp7Nr8hICHLdEsU-exit')
  })

  // 2PeJ1GS5SrNdC7DXMv8nHAQNfire6UYB
  it('should enable task with general context in subtasks', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (ctx): void => {
            ctx.skip = true
          }
        },

        {
          title: 'This task will show subtasks.',
          task: (ctx, task): Listr => task.newListr([
            {
              title: 'This task will execute.',
              task: (): void => { }
            },

            {
              title: 'This task will never execute.',
              enabled: (ctx): boolean => !ctx.skip,
              task: (): void => {}
            }
          ], { rendererOptions: { collapse: false }, concurrent: true })
        }
      ],
      {
        concurrent: false, rendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('2PeJ1GS5SrNdC7DXMv8nHAQNfire6UYB-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('2PeJ1GS5SrNdC7DXMv8nHAQNfire6UYB-err')
    expect(mockExit.mock.calls).toMatchSnapshot('2PeJ1GS5SrNdC7DXMv8nHAQNfire6UYB-exit')
  })

})
