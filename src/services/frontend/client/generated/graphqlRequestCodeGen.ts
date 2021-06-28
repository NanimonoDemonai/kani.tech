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
  url: Scalars['String'];
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
  updateObjectStatus?: Maybe<Id>;
};


export type MutationPostArticleArgs = {
  input: ArticleInput;
};


export type MutationDeleteObjectArgs = {
  key: Scalars['String'];
};


export type MutationUpdateObjectStatusArgs = {
  key: Scalars['String'];
  isError?: Maybe<Scalars['Boolean']>;
};

export type Preview = {
  __typename?: 'Preview';
  code: Scalars['String'];
  images: Array<ImageObject>;
};

export type Query = {
  __typename?: 'Query';
  getUploadUrl?: Maybe<UrlReturn>;
  getObjectList: Array<ImageObject>;
  healthCheck?: Maybe<Scalars['String']>;
  getPreview?: Maybe<Preview>;
};


export type QueryGetUploadUrlArgs = {
  input: UploadInput;
};


export type QueryGetObjectListArgs = {
  keyPrefix: Scalars['String'];
};


export type QueryGetPreviewArgs = {
  source: Scalars['String'];
};

export type UrlReturn = {
  __typename?: 'URLReturn';
  uploadURL: Scalars['String'];
  url: Scalars['String'];
  key: Scalars['String'];
};

export type UploadInput = {
  keyPrefix: Scalars['String'];
  keySuffix: Scalars['String'];
  contentType: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  size: Scalars['Int'];
};

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
    & Pick<ImageObject, 'width' | 'height' | 'contentType' | 'modified' | 'key' | 'url' | 'size' | 'verified'>
  )> }
);

export type GetPreviewQueryVariables = Exact<{
  source: Scalars['String'];
}>;


export type GetPreviewQuery = (
  { __typename?: 'Query' }
  & { getPreview?: Maybe<(
    { __typename?: 'Preview' }
    & Pick<Preview, 'code'>
    & { images: Array<(
      { __typename?: 'ImageObject' }
      & Pick<ImageObject, 'height' | 'key' | 'url' | 'size' | 'width' | 'modified' | 'verified'>
    )> }
  )> }
);

export type GetUploadUrlQueryVariables = Exact<{
  input: UploadInput;
}>;


export type GetUploadUrlQuery = (
  { __typename?: 'Query' }
  & { getUploadUrl?: Maybe<(
    { __typename?: 'URLReturn' }
    & Pick<UrlReturn, 'url' | 'uploadURL' | 'key'>
  )> }
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

export type UpdateObjectStatusMutationVariables = Exact<{
  key: Scalars['String'];
  isError?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateObjectStatusMutation = (
  { __typename?: 'Mutation' }
  & { updateObjectStatus?: Maybe<(
    { __typename?: 'Id' }
    & Pick<Id, 'id'>
  )> }
);


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
    url
    size
    verified
  }
}
    `;
export const GetPreviewDocument = gql`
    query GetPreview($source: String!) {
  getPreview(source: $source) {
    images {
      height
      key
      url
      size
      width
      modified
      verified
    }
    code
  }
}
    `;
export const GetUploadUrlDocument = gql`
    query GetUploadUrl($input: UploadInput!) {
  getUploadUrl(input: $input) {
    url
    uploadURL
    key
  }
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
export const UpdateObjectStatusDocument = gql`
    mutation UpdateObjectStatus($key: String!, $isError: Boolean) {
  updateObjectStatus(key: $key, isError: $isError) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    DeleteObject(variables: DeleteObjectMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteObjectMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteObjectMutation>(DeleteObjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteObject');
    },
    GetObjectList(variables: GetObjectListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetObjectListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetObjectListQuery>(GetObjectListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetObjectList');
    },
    GetPreview(variables: GetPreviewQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPreviewQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPreviewQuery>(GetPreviewDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPreview');
    },
    GetUploadUrl(variables: GetUploadUrlQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUploadUrlQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUploadUrlQuery>(GetUploadUrlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUploadUrl');
    },
    PostArticle(variables: PostArticleMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostArticleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostArticleMutation>(PostArticleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PostArticle');
    },
    UpdateObjectStatus(variables: UpdateObjectStatusMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateObjectStatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateObjectStatusMutation>(UpdateObjectStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateObjectStatus');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;