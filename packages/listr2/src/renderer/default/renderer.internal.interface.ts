export interface ListrDefaultRendererSummary {
  completed?: number
  waiting?: number
}

export interface ListrDefaultRendererSummarized {
  render: string[]
  summary?: ListrDefaultRendererSummary
}

export interface ListrDefaultRendererFit extends ListrDefaultRendererSummarized {
  keep: number
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
