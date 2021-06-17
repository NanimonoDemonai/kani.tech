import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
export const GetUploadUrlDocument = gql`
    query GetUploadUrl($key: String!, $contentType: String!) {
  getUploadUrl(contentType: $contentType, key: $key)
}
    `;
export const PostArticleDocument = gql`
    mutation PostArticle($tags: [String!]!, $source: String!, $pageTitle: String!, $pageName: String!) {
  postArticle(
    input: {tags: $tags, source: $source, pageTitle: $pageTitle, pageName: $pageName}
  ) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetObjectList(variables: GetObjectListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetObjectListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetObjectListQuery>(GetObjectListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetObjectList');
    },
    GetUploadUrl(variables: GetUploadUrlQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUploadUrlQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUploadUrlQuery>(GetUploadUrlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUploadUrl');
    },
    PostArticle(variables: PostArticleMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostArticleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostArticleMutation>(PostArticleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PostArticle');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;