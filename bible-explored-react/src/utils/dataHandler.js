import { MAIN_LANGUAGES } from "../common/constants"

/*
=====================
Input data structure:
[
  {
    id: ...,
    name: ...,
    language: {
      id: ...,
      name: ...
    }
  },
  ...
]
====================
====================
Target data structure:
[
  {
    languageId: ...,
    languageName: ..., 
    bibles: [
      {
        bibleId: ...,
        bibleName: ...
      },
      ...
    ]
  },
  ...
]
====================
*/
export const groupBiblesByLanguage = data => {
  var bibleLanguageGroup = []
  data.forEach(bible => {
    var languageIndex  = bibleLanguageGroup.findIndex(item => item.languageId === bible.language.id);
    const bibleObject = {
      bibleId: bible.id,
      bibleName: bible.name
    }
    if (languageIndex !== -1) {
      bibleLanguageGroup[languageIndex].bibles.push(bibleObject)
    } else {
      const newLanguageGroup = {
        languageId: bible.language.id,
        languageName: bible.language.name,
        bibles: [bibleObject]
      }
      if (MAIN_LANGUAGES.includes(bible.language.id)) {
        bibleLanguageGroup.unshift(newLanguageGroup);
      } else {
        bibleLanguageGroup.push(newLanguageGroup);
      }
    }
  })
  return bibleLanguageGroup;
}