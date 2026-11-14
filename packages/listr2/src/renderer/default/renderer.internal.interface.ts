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
  body: string[]
  subtasks: boolean
  subtaskLevel: number
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
