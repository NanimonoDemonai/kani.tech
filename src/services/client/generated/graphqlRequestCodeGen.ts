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

export type ImageObject = {
  __typename?: 'ImageObject';
  key: Scalars['String'];
  contentType: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  modified: Scalars['String'];
  size: Scalars['Int'];
  verified: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  postArticle?: Maybe<Id>;
  deleteObject?: Maybe<Id>;
};


export type MutationPostArticleArgs = {
  input: ArticleInput;
};


export type MutationDeleteObjectArgs = {
  key: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getUploadUrl?: Maybe<Scalars['String']>;
  getObjectList: Array<ImageObject>;
  healthCheck?: Maybe<Scalars['String']>;
};


export type QueryGetUploadUrlArgs = {
  input: UploadInput;
};


export type QueryGetObjectListArgs = {
  keyPrefix: Scalars['String'];
};

export type UploadInput = {
  keyPrefix: Scalars['String'];
  keySuffix: Scalars['String'];
  contentType: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  size: Scalars['Int'];
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

export type DeleteObjectMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type DeleteObjectMutation = (
  { __typename?: 'Mutation' }
  & { deleteObject?: Maybe<(
    { __typename?: 'Id' }
    & Pick<Id, 'id'>
  )> }
);

export type GetObjectListQueryVariables = Exact<{
  keyPrefix: Scalars['String'];
}>;


export type GetObjectListQuery = (
  { __typename?: 'Query' }
  & { getObjectList: Array<(
    { __typename?: 'ImageObject' }
    & Pick<ImageObject, 'width' | 'height' | 'contentType' | 'modified' | 'key' | 'size' | 'verified'>
  )> }
);

export type GetUploadUrlQueryVariables = Exact<{
  input: UploadInput;
}>;


export type GetUploadUrlQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getUploadUrl'>
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
export const DeleteObjectDocument = gql`
    mutation DeleteObject($key: String!) {
  deleteObject(key: $key) {
    id
  }
}
    `;
export const GetObjectListDocument = gql`
    query GetObjectList($keyPrefix: String!) {
  getObjectList(keyPrefix: $keyPrefix) {
    width
    height
    contentType
    modified
    key
    size
    verified
  }
}
    `;
export const GetUploadUrlDocument = gql`
    query GetUploadUrl($input: UploadInput!) {
  getUploadUrl(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    PostArticle(variables: PostArticleMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostArticleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostArticleMutation>(PostArticleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PostArticle');
    },
    DeleteObject(variables: DeleteObjectMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteObjectMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteObjectMutation>(DeleteObjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteObject');
    },
    GetObjectList(variables: GetObjectListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetObjectListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetObjectListQuery>(GetObjectListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetObjectList');
    },
    GetUploadUrl(variables: GetUploadUrlQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUploadUrlQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUploadUrlQuery>(GetUploadUrlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUploadUrl');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;