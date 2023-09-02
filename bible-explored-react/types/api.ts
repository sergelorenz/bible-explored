// ========= API TYPES COMMON ===================
type ContentMeta = {
  fumsToken: string
}

// ========= API TYPES FOR GET BIBLES ===========
type BibleLanguage = {
  id: string,
  name: string 
}

export type Bible = {
  id: string,
  name: string,
  language: BibleLanguage
}

export type GetBiblesResponse = {
  data: Bible[]
}
// ==================================================

// ============ API TYPES FOR GET BOOKS ============
export type Book = {
  id: string,
  name: string,
  nameLong: string
}

export type GetBooksResponse = {
  data: Book[]
}

// ============= API TYPES FOR GET CHAPTERS =========
export type GetChaptersRequest = {
  bibleId: string,
  bookId: string,
}

export type Chapter = {
  id: string,
  number: string
}

export type GetChaptersResponse = {
  data: Chapter[]
}

// ============= API TYPES FOR GET CHAPTER ==========
export type GetChapterRequest = {
  bibleId: string,
  bookId: string,
  chapter: number,
}

export type ChapterContent = {
  copyright: string,
  content: string
}

export type GetChapterResponse = {
  data: ChapterContent,
  meta: ContentMeta
}

// ============ API TYPES FOR GET PASSAGE ==========
export type GetPassageRequest = {
  bibleId: string,
  passage: string
}

export type PassageContent = {
  copyright: string,
  content: string,
  reference: string
}

export type GetPassageResponse = {
  data: PassageContent,
  meta: ContentMeta
}