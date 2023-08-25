import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { groupBiblesByLanguage } from '../utils/dataHandler';

import {GetBiblesResponse} from '../../types/api';
import { BibleLanguageGroup } from '../../types/types';

export const bibleExploredApi = createApi({
  reducerPath: 'bibleExploredApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.scripture.api.bible/v1',
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
    })
  })
})

export const { useGetBiblesQuery } = bibleExploredApi;