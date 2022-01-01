import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
const gql = Apollo.gql;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Query = {
  __typename?: 'Query';
  comment?: Maybe<Comment>;
  subcomments?: Maybe<Array<Maybe<Comment>>>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Maybe<Post>>>;
  getImageUrl?: Maybe<ImageUrl>;
  topFivePost?: Maybe<Array<Maybe<Post>>>;
  user: User;
  users?: Maybe<Array<Maybe<User>>>;
  me?: Maybe<User>;
};

export type QueryCommentArgs = {
  comment_id?: Maybe<Scalars['ID']>;
};

export type QuerySubcommentsArgs = {
  comment_id?: Maybe<Scalars['ID']>;
};

export type QueryPostArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryTopFivePostArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  likes?: Maybe<Scalars['Int']>;
  has_replies?: Maybe<Scalars['Boolean']>;
  deleted?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  replies?: Maybe<Array<Maybe<Comment>>>;
  comment?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  tokenVersion?: Maybe<Scalars['String']>;
  profile?: Maybe<UserProfile>;
  auth?: Maybe<Array<Maybe<User>>>;
  follower?: Maybe<Followers>;
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  id: Scalars['ID'];
  bio?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

export type Followers = {
  __typename?: 'Followers';
  id: Scalars['ID'];
  user_id?: Maybe<Scalars['String']>;
  follower_id?: Maybe<Scalars['String']>;
  following_id?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  likes?: Maybe<Scalars['Int']>;
  views?: Maybe<Scalars['Int']>;
  url: Scalars['String'];
  user?: Maybe<User>;
  released_at?: Maybe<Scalars['Date']>;
  created_at?: Maybe<Scalars['Date']>;
  updated_at?: Maybe<Scalars['Date']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ImageUrl = {
  __typename?: 'ImageUrl';
  public_id?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<Comment>;
  removeComment?: Maybe<Scalars['Boolean']>;
  editComment?: Maybe<Comment>;
  createPost?: Maybe<Post>;
  editPost?: Maybe<Post>;
  removePost?: Maybe<Scalars['Boolean']>;
  likePost?: Maybe<Post>;
  unLikePost?: Maybe<Post>;
  uploadImage?: Maybe<UploadedImage>;
  postView?: Maybe<Scalars['Boolean']>;
  register: User;
  login: User;
  createProfile: UserProfile;
  updateProfile: UserProfile;
  followUser?: Maybe<Followers>;
  unFollowUser: Followers;
  revokeRefreshToken?: Maybe<Scalars['Boolean']>;
  logout?: Maybe<Scalars['Boolean']>;
};

export type MutationCreateCommentArgs = {
  post_id: Scalars['ID'];
  text: Scalars['String'];
  comment_id?: Maybe<Scalars['ID']>;
};

export type MutationRemoveCommentArgs = {
  id: Scalars['ID'];
};

export type MutationEditCommentArgs = {
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type MutationCreatePostArgs = {
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
};

export type MutationEditPostArgs = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};

export type MutationRemovePostArgs = {
  id: Scalars['ID'];
};

export type MutationLikePostArgs = {
  id: Scalars['ID'];
};

export type MutationUnLikePostArgs = {
  id: Scalars['ID'];
};

export type MutationUploadImageArgs = {
  body?: Maybe<Scalars['String']>;
};

export type MutationPostViewArgs = {
  id: Scalars['ID'];
};

export type MutationRegisterArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationCreateProfileArgs = {
  bio?: Maybe<Scalars['String']>;
};

export type MutationUpdateProfileArgs = {
  bio?: Maybe<Scalars['String']>;
};

export type MutationFollowUserArgs = {
  username: Scalars['String'];
};

export type MutationUnFollowUserArgs = {
  username: Scalars['String'];
};

export type MutationRevokeRefreshTokenArgs = {
  userId: Scalars['String'];
};

export type UploadedImage = {
  __typename?: 'UploadedImage';
  public_id: Scalars['String'];
  version: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  format: Scalars['String'];
  created_at: Scalars['String'];
  resource_type: Scalars['String'];
  tags: Array<Maybe<Tag>>;
  bytes: Scalars['Int'];
  type: Scalars['String'];
  etag: Scalars['String'];
  url: Scalars['String'];
  secure_url: Scalars['String'];
  signature: Scalars['String'];
  original_filename: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  tag_name: Scalars['String'];
};

export type TransformImageOptionsInput = {
  __typename?: 'TransformImageOptionsInput';
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  crop?: Maybe<Scalars['String']>;
};

export type UploadOptionsInput = {
  __typename?: 'UploadOptionsInput';
  public_id?: Maybe<Scalars['String']>;
  folder?: Maybe<Scalars['String']>;
  use_filename?: Maybe<Scalars['Boolean']>;
  unique_filename?: Maybe<Scalars['Boolean']>;
  resource_type?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  access_mode?: Maybe<Scalars['String']>;
  discard_original_filename?: Maybe<Scalars['Boolean']>;
  overwrite?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Array<Maybe<TagInput>>>;
  colors?: Maybe<Scalars['Boolean']>;
  faces?: Maybe<Scalars['Boolean']>;
  quality_analysis?: Maybe<Scalars['Boolean']>;
  cinemegraph_analysis?: Maybe<Scalars['Boolean']>;
  image_metadata?: Maybe<Scalars['Boolean']>;
  phash?: Maybe<Scalars['Boolean']>;
  auto_tagging?: Maybe<Scalars['Boolean']>;
  categorization?: Maybe<Array<Maybe<CategoryInput>>>;
};

export type TagInput = {
  __typename?: 'TagInput';
  tag_name: Scalars['String'];
};

export type CategoryInput = {
  __typename?: 'CategoryInput';
  name?: Maybe<Scalars['String']>;
};

export type Following = {
  __typename?: 'Following';
  id: Scalars['ID'];
  user_id?: Maybe<Scalars['String']>;
  following_id?: Maybe<Scalars['String']>;
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPostsQuery = { __typename?: 'Query' } & {
  posts?: Maybe<
    Array<
      Maybe<
        { __typename?: 'Post' } & Pick<
          Post,
          'id' | 'title' | 'body' | 'tags' | 'thumbnail' | 'created_at' | 'views'
        > & {
            user?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>;
            comments?: Maybe<
              Array<Maybe<{ __typename?: 'Comment' } & Pick<Comment, 'id'>>>
            >;
          }
      >
    >
  >;
};

export type TopFivePostQueryVariables = Exact<{ [key: string]: never }>;

export type TopFivePostQuery = { __typename?: 'Query' } & {
  topFivePost?: Maybe<
    Array<
      Maybe<
        { __typename?: 'Post' } & Pick<
          Post,
          'id' | 'title' | 'tags' | 'thumbnail' | 'created_at' | 'views' | 'body'
        > & {
            user?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>;
            comments?: Maybe<
              Array<Maybe<{ __typename?: 'Comment' } & Pick<Comment, 'id'>>>
            >;
          }
      >
    >
  >;
};

export type UploadImageToCloudinaryMutationVariables = Exact<{
  body: Scalars['String'];
}>;

export type UploadImageToCloudinaryMutation = { __typename?: 'Mutation' } & {
  uploadImage?: Maybe<
    { __typename?: 'UploadedImage' } & Pick<UploadedImage, 'public_id' | 'url'>
  >;
};

export type CreatePostMutationVariables = Exact<{
  body: Scalars['String'];
  title: Scalars['String'];
}>;

export type CreatePostMutation = { __typename?: 'Mutation' } & {
  createPost?: Maybe<{ __typename?: 'Post' } & Pick<Post, 'id' | 'title' | 'body'>>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'User' } & Pick<User, 'id' | 'accessToken'>;
};

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'User' } & Pick<User, 'id'>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'logout'>;

export const GetPostsDocument = gql`
  query GetPosts {
    posts {
      id
      title
      body
      tags
      thumbnail
      created_at
      views
      user {
        id
        username
      }
      comments {
        id
      }
    }
  }
`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>,
) {
  return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    baseOptions,
  );
}
export function useGetPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>,
) {
  return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    baseOptions,
  );
}
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<
  GetPostsQuery,
  GetPostsQueryVariables
>;
export const TopFivePostDocument = gql`
  query TopFivePost {
    topFivePost {
      id
      title
      tags
      thumbnail
      created_at
      views
      body
      user {
        id
        username
      }
      comments {
        id
      }
    }
  }
`;

/**
 * __useTopFivePostQuery__
 *
 * To run a query within a React component, call `useTopFivePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopFivePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopFivePostQuery({
 *   variables: {
 *   },
 * });
 */
export function useTopFivePostQuery(
  baseOptions?: Apollo.QueryHookOptions<TopFivePostQuery, TopFivePostQueryVariables>,
) {
  return Apollo.useQuery<TopFivePostQuery, TopFivePostQueryVariables>(
    TopFivePostDocument,
    baseOptions,
  );
}
export function useTopFivePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TopFivePostQuery, TopFivePostQueryVariables>,
) {
  return Apollo.useLazyQuery<TopFivePostQuery, TopFivePostQueryVariables>(
    TopFivePostDocument,
    baseOptions,
  );
}
export type TopFivePostQueryHookResult = ReturnType<typeof useTopFivePostQuery>;
export type TopFivePostLazyQueryHookResult = ReturnType<typeof useTopFivePostLazyQuery>;
export type TopFivePostQueryResult = Apollo.QueryResult<
  TopFivePostQuery,
  TopFivePostQueryVariables
>;
export const UploadImageToCloudinaryDocument = gql`
  mutation UploadImageToCloudinary($body: String!) {
    uploadImage(body: $body) {
      public_id
      url
    }
  }
`;
export type UploadImageToCloudinaryMutationFn = Apollo.MutationFunction<
  UploadImageToCloudinaryMutation,
  UploadImageToCloudinaryMutationVariables
>;

/**
 * __useUploadImageToCloudinaryMutation__
 *
 * To run a mutation, you first call `useUploadImageToCloudinaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageToCloudinaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageToCloudinaryMutation, { data, loading, error }] = useUploadImageToCloudinaryMutation({
 *   variables: {
 *      body: // value for 'body'
 *   },
 * });
 */
export function useUploadImageToCloudinaryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadImageToCloudinaryMutation,
    UploadImageToCloudinaryMutationVariables
  >,
) {
  return Apollo.useMutation<
    UploadImageToCloudinaryMutation,
    UploadImageToCloudinaryMutationVariables
  >(UploadImageToCloudinaryDocument, baseOptions);
}
export type UploadImageToCloudinaryMutationHookResult = ReturnType<
  typeof useUploadImageToCloudinaryMutation
>;
export type UploadImageToCloudinaryMutationResult =
  Apollo.MutationResult<UploadImageToCloudinaryMutation>;
export type UploadImageToCloudinaryMutationOptions = Apollo.BaseMutationOptions<
  UploadImageToCloudinaryMutation,
  UploadImageToCloudinaryMutationVariables
>;
export const CreatePostDocument = gql`
  mutation CreatePost($body: String!, $title: String!) {
    createPost(body: $body, title: $title) {
      id
      title
      body
    }
  }
`;
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      body: // value for 'body'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePostMutation,
    CreatePostMutationVariables
  >,
) {
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    baseOptions,
  );
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      accessToken
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions,
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>,
) {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions,
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
