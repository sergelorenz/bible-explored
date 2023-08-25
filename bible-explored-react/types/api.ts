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