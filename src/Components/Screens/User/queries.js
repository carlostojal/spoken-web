import { gql } from "@apollo/client";

const queries = {

  GET_USER_DATA: gql`
    query getUserData($id: Int) {
      getUserData(id: $id) {
        username
        name
        surname
      }
    }
  `,

  GET_USER_POSTS: gql`
    query getUserPosts($page: Int!, $perPage: Int!, $user_id: Int) {
      getUserPosts(page: $page, perPage: $perPage, user_id: $user_id) {
        id
        time
        poster {
          id
          name
          surname
          username
        }
        media {
          id
          is_nsfw
          url
        }
        text
        user_reacted
        edited
      }
    }
  `,

  FOLLOW: gql`
    mutation follow($user_id: Int!) {
      followUser(id: $user_id) {
        id
      }
    }
  `
}

export default queries;