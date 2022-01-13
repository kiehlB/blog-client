import { useQuery, gql, useMutation } from '@apollo/client';
import { Get_Comment } from '../../../lib/graphql/posts';


export default function useGetComments() {
    const {
        loading: commentsLoading,
        error: commentsError,
        data: commentstData,
    } = useQuery(Get_Comment);

    return {
        commentsLoading,
        commentsError,
        commentstData,
    };
}