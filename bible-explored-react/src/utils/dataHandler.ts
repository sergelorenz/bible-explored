import { MAIN_LANGUAGES } from "../common/constants";

import { Bible } from '../../types/api';
import { BibleLanguageGroup, BibleLanguageGroupBible } from '../../types/types';

export const groupBiblesByLanguage = (data: Bible[]) => {
  var bibleLanguageGroup: BibleLanguageGroup[] = []
  data.forEach(bible => {
    var languageIndex  = bibleLanguageGroup.findIndex(item => item.languageId === bible.language.id);
    const bibleObject: BibleLanguageGroupBible = {
      bibleId: bible.id,
      bibleName: bible.name
    }
    if (languageIndex !== -1) {
      bibleLanguageGroup[languageIndex].bibles.push(bibleObject)
    } else {
      const newLanguageGroup: BibleLanguageGroup = {
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