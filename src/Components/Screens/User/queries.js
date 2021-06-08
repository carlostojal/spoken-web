import { gql } from "@apollo/client";

const queries = {

  GET_USER_DATA: gql`
    query getUserData($id: ID) {
      getUserData(id: $id) {
        _id
        username
        name
        surname
        followers {
          _id
        }
        following {
          _id
        }
        profile_type
        profile_privacy_type
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
          type
          is_nsfw
        }
        text
        edited
      }
    }
  `,

  CHECK_FOLLOW: gql`
    query checkFollow($user_id: ID!) {
      checkFollow(user_id: $user_id)
    }
  `,

  FOLLOW: gql`
    mutation follow($user_id: ID!) {
      followUser(id: $user_id)
    }
  `
}

export default queries;