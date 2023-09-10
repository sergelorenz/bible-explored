export type BibleLanguageGroupBible = {
  bibleId: string,
  bibleName: string
}

export type BibleLanguageGroup = {
  languageId: string,
  languageName: string,
  bibles: BibleLanguageGroupBible[]
}

export type CustomUseQueryProp = {
  useQuery: Function,
  args?: any,
  isLazy?: boolean
}

export type Problem = {
  description: string,
  verses: string[]
}

export type ScriptureVerse = {
  book: string,
  chapter: number,
  verse: number,
  bookName: string
}