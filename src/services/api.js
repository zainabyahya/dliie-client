// src/services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: (headers, { getState }) => {
            // grab token from your auth slice (optional chaining to avoid undefined errors)
            const token = getState().auth?.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Area', 'Competency', 'Questionnaire', 'Assessment', 'User'],
    endpoints: (builder) => ({
        // 1) GET /areas → [Area]
        getAreas: builder.query({
            query: () => 'areas',
            transformResponse: (res) => res.areas,
            providesTags: ['Area'],
        }),

        // 2) GET /competency → [Competency]
        getCompetencies: builder.query({
            query: () => 'competency',
            transformResponse: (res) => res.competencies || res,
            providesTags: ['Competency'],
        }),

        // 3) GET /questionnaire → [Questionnaire]
        getQuestionnaires: builder.query({
            query: () => 'questionnaire',
            transformResponse: (res) => res.questionnaires,
            providesTags: ['Questionnaire'],
        }),

        // 4) POST /assessment/submit  (body = { user, questionnaire, responses[] })
        submitAssessment: builder.mutation({
            query: (body) => ({
                url: 'assessment/submit',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Assessment'],
        }),

        // 5) GET /assessment/user/:userId
        getAssessmentByUser: builder.query({
            query: (userId) => `assessment/user/${userId}`,
            providesTags: ['Assessment'],
        }),

        // 6) POST /auth/login  → { token, user }
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),

        // 7) POST /auth/signup → { token, user }
        signup: builder.mutation({
            query: (newUser) => ({
                url: 'auth/signup',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

// Export hooks for usage in functional components
export const {
    useGetAreasQuery,
    useGetCompetenciesQuery,
    useGetQuestionnairesQuery,
    useSubmitAssessmentMutation,
    useGetAssessmentByUserQuery,
    useLoginMutation,
    useSignupMutation,
} = api
