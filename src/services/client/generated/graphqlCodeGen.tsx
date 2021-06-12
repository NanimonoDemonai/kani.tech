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
  healthCheck?: Maybe<Scalars['String']>;
};

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