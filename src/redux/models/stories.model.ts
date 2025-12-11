export interface IStories {
  detail: Detail[]
}

export interface Detail {
  id: number
  title: string
  preview: string
  file: string
  created_at: string
}
