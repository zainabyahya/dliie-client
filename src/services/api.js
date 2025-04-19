// src/services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['Area', 'Competency', 'Questionnaire'],
    endpoints: builder => ({
        getAreas: builder.query({
            query: () => 'areas',
            transformResponse: res => res.areas,
            providesTags: ['Area'],
        }),
        getCompetencies: builder.query({
            query: () => 'competency',
            transformResponse: res => res.competencies || res,
            providesTags: ['Competency'],
        }),
        getQuestionnaires: builder.query({
            query: () => `questionnaire`,
            transformResponse: (res) => res.questionnaires,
            providesTags: ["Questionnaire"],
        }),
        submitAssessment: builder.mutation({
            query: (body) => ({
                url: "/assessment/submit",
                method: "POST",
                body,
            }),
        }),
        getAssessmentByUser: builder.query({
            query: (userId) => `/assessment/user/${userId}`,
        }),

        // …other endpoints…
    }),
})

export const { useGetAreasQuery, useGetCompetenciesQuery, useGetQuestionnairesQuery, useSubmitAssessmentMutation,
    useGetAssessmentByUserQuery, } = api
