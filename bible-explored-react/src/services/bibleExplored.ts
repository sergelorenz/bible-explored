import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { groupBiblesByLanguage, getTotalChapters } from '../utils/dataHandler';

import { FUMS } from '../common/constants';
import { 
  GetBiblesResponse,
  GetBooksResponse,
  Book,
  GetChaptersRequest,
  GetChaptersResponse,
  GetChapterRequest,
  GetChapterResponse,
  GetPassageRequest,
  GetPassageResponse,
  GetVersesResponse
} from '../../types/api';
import { BibleLanguageGroup } from '../../types/types';

export const bibleExploredApi = createApi({
  reducerPath: 'bibleExploredApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.scripture.api.bible/v1',
    timeout: 5000,
    prepareHeaders: (headers) => {
      headers.set('Api-Key', import.meta.env.VITE_API_TOKEN)
    }
  }),
  endpoints: (builder) => ({
    getBibles: builder.query<BibleLanguageGroup[], void>({
      query: () => '/bibles',
      transformResponse: (response: GetBiblesResponse) => {
        return groupBiblesByLanguage(response.data);
      }
    }),
    getBooks: builder.query<Book[], string>({
      query: (bibleId) => `/bibles/${bibleId}/books`,
      transformResponse: (response: GetBooksResponse) => response.data
    }),
    getChapters: builder.query<number, GetChaptersRequest>({
      query: ({bibleId, bookId}) => `/bibles/${bibleId}/books/${bookId}/chapters`,
      transformResponse: (response: GetChaptersResponse) => {
        let length = response.data.length;
        const lastChapter = response.data[length - 1];
        let lastChapterNumber = Number(lastChapter.number);
        if (!isNaN(lastChapterNumber)) {
          return lastChapterNumber;
        } else {
          return getTotalChapters(response.data);
        }
      }
    }),
    getVerseLength: builder.query<number, GetChapterRequest>({
      query: ({bibleId, bookId, chapter}) => `/bibles/${bibleId}/chapters/${bookId}.${chapter}/verses`,
      transformResponse: (response: GetVersesResponse) => {
        return response.data.length
      }
    }),
    getVerses: builder.query<GetChapterResponse, GetChapterRequest>({
      query: ({bibleId, bookId, chapter}) => `/bibles/${bibleId}/chapters/${bookId}.${chapter}?${FUMS}`,
    }),
    getPassage: builder.query<GetPassageResponse, GetPassageRequest>({
      query: ({bibleId, passage}) => `/bibles/${bibleId}/passages/${passage}?${FUMS}`
    })
  })
})

export const { 
  useGetBiblesQuery, 
  useGetBooksQuery,
  useLazyGetBooksQuery, 
  useLazyGetChaptersQuery,
  useLazyGetVersesQuery,
  useLazyGetVerseLengthQuery,
  useGetPassageQuery,
  useLazyGetPassageQuery
} = bibleExploredApi;