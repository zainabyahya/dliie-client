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
    tagTypes: ['Area', 'Competency', 'Questionnaire', 'Assessment', 'User', 'CommunityPost', 'LibraryPost', 'Profile'],
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

        // 12) GET /library → get all library posts
        getLibraryPosts: builder.query({
            query: () => 'library',
            providesTags: ['LibraryPost'],
        }),

        // 13) GET /library/:id → get one post
        getLibraryPostById: builder.query({
            query: (id) => `library/${id}`,
            providesTags: (result, error, id) => [{ type: 'LibraryPost', id }],
        }),

        // 14) POST /library → create a new post
        createLibraryPost: builder.mutation({
            query: (body) => ({
                url: 'library',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['LibraryPost'],
        }),

        // 15) PUT /library/:id → update a post
        updateLibraryPost: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `library/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'LibraryPost', id },
                { type: 'LibraryPost' },
            ],
        }),

        // 16) DELETE /library/:id → delete a post
        deleteLibraryPost: builder.mutation({
            query: (id) => ({
                url: `library/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['LibraryPost'],
        }),
        // Profile - GET /profile/me
        getMyProfile: builder.query({
            query: () => 'profile/me',
            providesTags: ['Profile'],
        }),

        // Profile - PUT /profile/me
        updateProfile: builder.mutation({
            query: (body) => ({
                url: 'profile/me',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Profile'],
        }),

        // Profile - DELETE user + profile (DELETE /auth/me or similar)
        deleteAccount: builder.mutation({
            query: () => ({
                url: 'auth/me',
                method: 'DELETE',
            }),
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
    useGetLibraryPostsQuery,
    useGetLibraryPostByIdQuery,
    useCreateLibraryPostMutation,
    useUpdateLibraryPostMutation,
    useDeleteLibraryPostMutation,
    useGetMyProfileQuery,
    useUpdateProfileMutation,
    useDeleteAccountMutation,
} = api;
