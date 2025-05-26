import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Area', 'Competency', 'Questionnaire', 'Assessment', 'User', 'CommunityPost'],
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

        // 4) POST /assessment/submit → { user, questionnaire, responses[] }
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

        // 6) POST /auth/login → { token, user }
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

        // 8) GET /community → [CommunityPost]
        getCommunityPosts: builder.query({
            query: () => 'community',
            providesTags: ['CommunityPost'],
        }),

        // 9) POST /community → create a new post
        createCommunityPost: builder.mutation({
            query: (newPost) => ({
                url: 'community',
                method: 'POST',
                body: newPost,
            }),
            invalidatesTags: ['CommunityPost'],
        }),

        // 10) GET /community/:id → fetch a single post with comments
        getCommunityPostById: builder.query({
            query: (id) => `community/${id}`,
            providesTags: (result, error, id) => [{ type: 'CommunityPost', id }],
        }),

        // 11) POST /community/:id/comment → add a comment
        addCommentToPost: builder.mutation({
            query: ({ postId, text }) => ({
                url: `community/${postId}/comments`,
                method: 'POST',
                body: { text },
            }),
            invalidatesTags: (result, error, { postId }) => [{ type: 'CommunityPost', id: postId }],
        }),
        // DELETE /community/:id → delete a post
        deleteCommunityPost: builder.mutation({
            query: (postId) => ({
                url: `community/${postId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CommunityPost'],
        }),

        // DELETE /community/:postId/comments/:commentId → delete a comment
        deleteComment: builder.mutation({
            query: ({ postId, commentId }) => ({
                url: `community/${postId}/comments/${commentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { postId }) => [{ type: 'CommunityPost', id: postId }],
        }),
        updateCommunityPost: builder.mutation({
            query: ({ postId, title, html }) => ({
                url: `community/${postId}`,
                method: 'PUT',
                body: { title, html },
            }),
            invalidatesTags: (result, error, { postId }) => [
                { type: 'CommunityPost', id: postId }
            ],
        }),


    }),
});

export const {
    useGetAreasQuery,
    useGetCompetenciesQuery,
    useGetQuestionnairesQuery,
    useSubmitAssessmentMutation,
    useGetAssessmentByUserQuery,
    useLoginMutation,
    useSignupMutation,
    useGetCommunityPostsQuery,
    useCreateCommunityPostMutation,
    useGetCommunityPostByIdQuery,
    useAddCommentToPostMutation,
    useDeleteCommunityPostMutation,
    useDeleteCommentMutation,
    useUpdateCommunityPostMutation,

} = api;
