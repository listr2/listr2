export interface ListrDefaultRendererSummary {
  completed?: number
  waiting?: number
}

export interface ListrDefaultRendererFit {
  keep: number
  render: string[]
}

export interface ListrDefaultRendererTaskRender {
  title: string[]
  header: string[]
  footer: string[]
  body: string[]
  subtasks: boolean
  subtaskLevel: number
  bracket: boolean
}

export interface ListrDefaultRendererContext {
  commit?: boolean
  final?: boolean
  summary?: ListrDefaultRendererSummary
  compact?: boolean
}

export interface ListrDefaultRendererFrame {
  persist: string[]
  live: string[]
}

export type ListrDefaultRendererFrozen = 'open' | 'done'

export interface ListrDefaultRendererHeader {
  /** The title the persisted header shows. */
  title: string
  /** The lines persisted inside the group below its header, each of which takes at least one row. */
  persisted: number
  /** The lines of the live part of the group on the last frame, its footer included. */
  live: number
}
