import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bibleExploredApi = createApi({
  reducerPath: 'bibleExploredApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.scripture.api.bible/v1',
    prepareHeaders: (headers) => {
      headers.set('Api-Key', import.meta.env.VITE_API_TOKEN)
    }
  }),
  endpoints: (builder) => ({
    getBibles: builder.query({
      query: () => '/bibles'
    })
  })
})

export const { useGetBiblesQuery } = bibleExploredApi;