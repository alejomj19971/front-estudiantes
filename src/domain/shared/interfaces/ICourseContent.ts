export type ContentType = 'video' | 'image' | 'text' | 'quiz'

export interface Course {
  id: string
  title: string
  thumbnail: string
  modules: Module[]
}

export interface Module {
  id: string
  title: string
  order: number
  contents: Content[]
}

export interface Content {
  id: string
  title: string
  order: number
  type: ContentType
}

export interface ContentDetail {
  id: string
  title: string
  type: ContentType
}

export interface VideoContentData extends ContentDetail {
  type: 'video'
  url: string
  duration: number
  thumbnail?: string
}

export interface ImageContentData extends ContentDetail {
  type: 'image'
  url: string
  alt: string
  caption?: string
}

export interface TextContentData extends ContentDetail {
  type: 'text'
  body: string
}

export interface QuizQuestion {
  id: string
  text: string
  options: { id: string; text: string }[]
  correctOptionId?: string
}

export interface QuizContentData extends ContentDetail {
  type: 'quiz'
  questions: QuizQuestion[]
}

export type AnyContentData =
  | VideoContentData
  | ImageContentData
  | TextContentData
  | QuizContentData
