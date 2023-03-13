/* eslint-disable @typescript-eslint/ban-types */
export type MockProcessExit = jest.SpyInstance<never, [code?: number]>

export type MockProcessOut = jest.SpyInstance<boolean, [str: string, encoding?: string, cb?: Function]>
export type MockProcessConsole = jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>

export interface MockProcessOutput {
  exit: MockProcessExit
  stdout: MockProcessOut
  stderr: MockProcessOut
  console: MockProcessConsole
}
