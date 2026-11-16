export interface ListrDefaultRendererSummary {
  completed?: number
  waiting?: number
  running?: number
}

export interface ListrDefaultRendererFit {
  keep: number
  render: string[]
}

export interface ListrDefaultRendererTaskRender {
  title: string[]
  header: string[]
  body: string[]
  subtasks: boolean
  subtaskColumn: number
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
