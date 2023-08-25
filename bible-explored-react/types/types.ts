export type BibleLanguageGroupBible = {
  bibleId: string,
  bibleName: string
}

export type BibleLanguageGroup = {
  languageId: string,
  languageName: string,
  bibles: BibleLanguageGroupBible[]
}