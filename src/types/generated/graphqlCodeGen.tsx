import { GraphQLResolveInfo } from 'graphql';
import { SessionContextType } from '../../services/backend/graphql/context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
};

export type UploadInput = {
  keyPrefix: Scalars['String'];
  keySuffix: Scalars['String'];
  contentType: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  size: Scalars['Int'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  ArticleInput: ArticleInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Id: ResolverTypeWrapper<Id>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ImageObject: ResolverTypeWrapper<ImageObject>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Preview: ResolverTypeWrapper<Preview>;
  Query: ResolverTypeWrapper<{}>;
  URLReturn: ResolverTypeWrapper<UrlReturn>;
  UploadInput: UploadInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  ArticleInput: ArticleInput;
  String: Scalars['String'];
  Id: Id;
  ID: Scalars['ID'];
  ImageObject: ImageObject;
  Int: Scalars['Int'];
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Preview: Preview;
  Query: {};
  URLReturn: UrlReturn;
  UploadInput: UploadInput;
}>;

export type IdResolvers<ContextType = SessionContextType, ParentType extends ResolversParentTypes['Id'] = ResolversParentTypes['Id']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageObjectResolvers<ContextType = SessionContextType, ParentType extends ResolversParentTypes['ImageObject'] = ResolversParentTypes['ImageObject']> = ResolversObject<{
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  modified?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = SessionContextType, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  postArticle?: Resolver<Maybe<ResolversTypes['Id']>, ParentType, ContextType, RequireFields<MutationPostArticleArgs, 'input'>>;
  deleteObject?: Resolver<Maybe<ResolversTypes['Id']>, ParentType, ContextType, RequireFields<MutationDeleteObjectArgs, 'key'>>;
  updateObjectStatus?: Resolver<Maybe<ResolversTypes['Id']>, ParentType, ContextType, RequireFields<MutationUpdateObjectStatusArgs, 'key'>>;
}>;

export type PreviewResolvers<ContextType = SessionContextType, ParentType extends ResolversParentTypes['Preview'] = ResolversParentTypes['Preview']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['ImageObject']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = SessionContextType, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getUploadUrl?: Resolver<Maybe<ResolversTypes['URLReturn']>, ParentType, ContextType, RequireFields<QueryGetUploadUrlArgs, 'input'>>;
  getObjectList?: Resolver<Array<ResolversTypes['ImageObject']>, ParentType, ContextType, RequireFields<QueryGetObjectListArgs, 'keyPrefix'>>;
  healthCheck?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getPreview?: Resolver<Maybe<ResolversTypes['Preview']>, ParentType, ContextType, RequireFields<QueryGetPreviewArgs, 'source'>>;
}>;

export type UrlReturnResolvers<ContextType = SessionContextType, ParentType extends ResolversParentTypes['URLReturn'] = ResolversParentTypes['URLReturn']> = ResolversObject<{
  uploadURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = SessionContextType> = ResolversObject<{
  Id?: IdResolvers<ContextType>;
  ImageObject?: ImageObjectResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Preview?: PreviewResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  URLReturn?: UrlReturnResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = SessionContextType> = Resolvers<ContextType>;
