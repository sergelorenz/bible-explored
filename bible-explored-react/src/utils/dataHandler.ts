import moment from "moment";

import { MAIN_LANGUAGES } from "../common/constants";

import { Bible, Chapter, PassageContent } from '../../types/api';
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

export const getTotalChapters = (data: Chapter[]) => {
  let counter = 0;
  data.forEach(chapter => {
    if (!isNaN(Number(chapter.number))) {
      counter += 1;
    }
  })
  return counter;
}

export const chooseVerseByDate = (listVerses: string[]) => {
  let difference = getDateDifference();
  return listVerses[difference];
}

const getDateDifference = () => {
  let today = moment();
  let firstDateOfTheYear = moment().startOf('year');
  let diff = today.diff(firstDateOfTheYear, 'days');
  return diff;
}

export const addReference = (passage: PassageContent) => {
  const { content, reference } = passage;
  const htmlReference = `<p class="reference">- ${reference} -</p>`;
  return content + htmlReference;
}

export const padNumber = (num: number) => {
  return num.toString().padStart(2, '0');
}

export const formPassage = (bookId: string, chapter: number, verse: number, verseCount:number=1) => {
  let passage = `${bookId}.${chapter}.${verse}`
  if (verseCount > 1) {
    passage = `${passage}-${bookId}.${chapter}.${verse + verseCount - 1}`
  }
  return passage;
}

export const htmlToText = (html: string) => {
  let output = html.replace(/<span[^>]*\sclass\s*=\s*['"]?v['"][^>]*>[\s\S]*?<\/span>/gi, "");
  return output.replace(/<\/?[^>]+(>|$)/g, '');
}