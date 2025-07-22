import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../slices/authSlice';

const baseQueryWithReauth = async (args, api, extraOptions) => {
    const rawBaseQuery = fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });
    console.log("🚀 ~ baseQueryWithReauth ~ process.env.REACT_APP_BASE_URL:", process.env.REACT_APP_BASE_URL)

    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        api.dispatch(logout());
        window.location.href = "/login";
    }

    return result;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Area', 'Competency', 'Questionnaire', 'Assessment', 'User', 'CommunityPost', 'LibraryPost', 'Profile'],
    endpoints: (builder) => ({
        getAreas: builder.query({
            query: () => 'areas',
            transformResponse: (res) => res.areas,
            providesTags: ['Area'],
        }),

        getCompetencies: builder.query({
            query: () => 'competency',
            transformResponse: (res) => res.competencies || res,
            providesTags: ['Competency'],
        }),

        getQuestionnaires: builder.query({
            query: () => 'questionnaire',
            transformResponse: (res) => res.questionnaires,
            providesTags: ['Questionnaire'],
        }),

        submitAssessment: builder.mutation({
            query: (body) => ({
                url: 'assessment/submit',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Assessment'],
        }),

        getAssessmentByUser: builder.query({
            query: (userId) => `assessment/user/${userId}`,
            providesTags: ['Assessment'],
        }),

        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),

        signup: builder.mutation({
            query: (newUser) => ({
                url: 'auth/signup',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['User'],
        }),

        getCommunityPosts: builder.query({
            query: () => 'community',
            providesTags: ['CommunityPost'],
        }),

        createCommunityPost: builder.mutation({
            query: (newPost) => ({
                url: 'community',
                method: 'POST',
                body: newPost,
            }),
            invalidatesTags: ['CommunityPost'],
        }),

        getCommunityPostById: builder.query({
            query: (id) => `community/${id}`,
            providesTags: (result, error, id) => [{ type: 'CommunityPost', id }],
        }),

        addCommentToPost: builder.mutation({
            query: ({ postId, text }) => ({
                url: `community/${postId}/comments`,
                method: 'POST',
                body: { text },
            }),
            invalidatesTags: (result, error, { postId }) => [{ type: 'CommunityPost', id: postId }],
        }),

        deleteCommunityPost: builder.mutation({
            query: (postId) => ({
                url: `community/${postId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CommunityPost'],
        }),

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

        getLibraryPosts: builder.query({
            query: () => 'library',
            providesTags: ['LibraryPost'],
        }),

        getLibraryPostById: builder.query({
            query: (id) => `library/${id}`,
            providesTags: (result, error, id) => [{ type: 'LibraryPost', id }],
        }),

        createLibraryPost: builder.mutation({
            query: (body) => ({
                url: 'library',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['LibraryPost'],
        }),

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

        deleteLibraryPost: builder.mutation({
            query: (id) => ({
                url: `library/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['LibraryPost'],
        }),

        getMyProfile: builder.query({
            query: () => 'profile/me',
            providesTags: ['Profile'],
        }),

        updateUserInfo: builder.mutation({
            query: (body) => ({
                url: 'users/me',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User', 'Profile'],
        }),

        deleteAccount: builder.mutation({
            query: () => ({
                url: 'auth/me',
                method: 'DELETE',
            }),
        }),
        getModulesByCompetency: builder.query({
            query: (competencyId) => `modules/competency/${competencyId}`,
            providesTags: (result, error, competencyId) => [{ type: 'Competency', id: competencyId }],
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
    useUpdateUserInfoMutation,
    useDeleteAccountMutation,
    useGetModulesByCompetencyQuery
} = api;
