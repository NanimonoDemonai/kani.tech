import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ArticleInput = {
  tags: Array<Scalars['String']>;
  source: Scalars['String'];
  pageTitle: Scalars['String'];
  pageName: Scalars['String'];
};

export type Id = {
  __typename?: 'Id';
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  postArticle?: Maybe<Id>;
};


export type MutationPostArticleArgs = {
  input: ArticleInput;
};

export type Query = {
  __typename?: 'Query';
  getUploadUrl?: Maybe<Scalars['String']>;
  getObjectList: Array<Scalars['String']>;
  healthCheck?: Maybe<Scalars['String']>;
};


export type QueryGetUploadUrlArgs = {
  key: Scalars['String'];
  contentType: Scalars['String'];
};


export type QueryGetObjectListArgs = {
  key: Scalars['String'];
};

export type GetObjectListQueryVariables = Exact<{
  key: Scalars['String'];
}>;


export type GetObjectListQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getObjectList'>
);

export type GetUploadUrlQueryVariables = Exact<{
  key: Scalars['String'];
  contentType: Scalars['String'];
}>;


export type GetUploadUrlQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getUploadUrl'>
);

export type PostArticleMutationVariables = Exact<{
  tags: Array<Scalars['String']> | Scalars['String'];
  source: Scalars['String'];
  pageTitle: Scalars['String'];
  pageName: Scalars['String'];
}>;


export type PostArticleMutation = (
  { __typename?: 'Mutation' }
  & { postArticle?: Maybe<(
    { __typename?: 'Id' }
    & Pick<Id, 'id'>
  )> }
);


export const GetObjectListDocument = gql`
    query GetObjectList($key: String!) {
  getObjectList(key: $key)
}
    `;

/**
 * __useGetObjectListQuery__
 *
 * To run a query within a React component, call `useGetObjectListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetObjectListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetObjectListQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetObjectListQuery(baseOptions: Apollo.QueryHookOptions<GetObjectListQuery, GetObjectListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetObjectListQuery, GetObjectListQueryVariables>(GetObjectListDocument, options);
      }
export function useGetObjectListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetObjectListQuery, GetObjectListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetObjectListQuery, GetObjectListQueryVariables>(GetObjectListDocument, options);
        }
export type GetObjectListQueryHookResult = ReturnType<typeof useGetObjectListQuery>;
export type GetObjectListLazyQueryHookResult = ReturnType<typeof useGetObjectListLazyQuery>;
export type GetObjectListQueryResult = Apollo.QueryResult<GetObjectListQuery, GetObjectListQueryVariables>;
export function refetchGetObjectListQuery(variables?: GetObjectListQueryVariables) {
      return { query: GetObjectListDocument, variables: variables }
    }
export const GetUploadUrlDocument = gql`
    query GetUploadUrl($key: String!, $contentType: String!) {
  getUploadUrl(contentType: $contentType, key: $key)
}
    `;

/**
 * __useGetUploadUrlQuery__
 *
 * To run a query within a React component, call `useGetUploadUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUploadUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUploadUrlQuery({
 *   variables: {
 *      key: // value for 'key'
 *      contentType: // value for 'contentType'
 *   },
 * });
 */
export function useGetUploadUrlQuery(baseOptions: Apollo.QueryHookOptions<GetUploadUrlQuery, GetUploadUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUploadUrlQuery, GetUploadUrlQueryVariables>(GetUploadUrlDocument, options);
      }
export function useGetUploadUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUploadUrlQuery, GetUploadUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUploadUrlQuery, GetUploadUrlQueryVariables>(GetUploadUrlDocument, options);
        }
export type GetUploadUrlQueryHookResult = ReturnType<typeof useGetUploadUrlQuery>;
export type GetUploadUrlLazyQueryHookResult = ReturnType<typeof useGetUploadUrlLazyQuery>;
export type GetUploadUrlQueryResult = Apollo.QueryResult<GetUploadUrlQuery, GetUploadUrlQueryVariables>;
export function refetchGetUploadUrlQuery(variables?: GetUploadUrlQueryVariables) {
      return { query: GetUploadUrlDocument, variables: variables }
    }
export const PostArticleDocument = gql`
    mutation PostArticle($tags: [String!]!, $source: String!, $pageTitle: String!, $pageName: String!) {
  postArticle(
    input: {tags: $tags, source: $source, pageTitle: $pageTitle, pageName: $pageName}
  ) {
    id
  }
}
    `;
export type PostArticleMutationFn = Apollo.MutationFunction<PostArticleMutation, PostArticleMutationVariables>;

/**
 * __usePostArticleMutation__
 *
 * To run a mutation, you first call `usePostArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postArticleMutation, { data, loading, error }] = usePostArticleMutation({
 *   variables: {
 *      tags: // value for 'tags'
 *      source: // value for 'source'
 *      pageTitle: // value for 'pageTitle'
 *      pageName: // value for 'pageName'
 *   },
 * });
 */
export function usePostArticleMutation(baseOptions?: Apollo.MutationHookOptions<PostArticleMutation, PostArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostArticleMutation, PostArticleMutationVariables>(PostArticleDocument, options);
      }
export type PostArticleMutationHookResult = ReturnType<typeof usePostArticleMutation>;
export type PostArticleMutationResult = Apollo.MutationResult<PostArticleMutation>;
export type PostArticleMutationOptions = Apollo.BaseMutationOptions<PostArticleMutation, PostArticleMutationVariables>;