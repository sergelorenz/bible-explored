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