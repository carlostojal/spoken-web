import { gql } from "@apollo/client";

const queries = {

  GET_USER_DATA: gql`
    query getUserData($id: ID) {
      getUserData(id: $id) {
        username
        name
        surname
      }
    }
  `,

  GET_USER_POSTS: gql`
    query getUserPosts($user_id: ID) {
      getUserPosts(user_id: $user_id) {
        _id
        time
        poster {
          _id
          name
          surname
          username
        }
        media {
          _id
          is_nsfw
        }
        text
        edited
      }
    }
  `,

  FOLLOW: gql`
    mutation follow($user_id: ID!) {
      followUser(id: $user_id) {
        _id
      }
    }
  `
}

export default queries;