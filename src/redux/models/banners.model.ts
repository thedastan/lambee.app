export interface IBanners {
  detail: Detail[]
}

export interface Detail {
  id: number
  title: string
  description: string
  url: string
  image: string
  created_at: string
}
