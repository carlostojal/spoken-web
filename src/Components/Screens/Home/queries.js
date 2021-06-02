import { gql } from "@apollo/client";

const queries = {
  GET_FEED: gql`
    query getUserFeed {
      getUserFeed {
        _id
        time
        poster {
          _id
          name
          surname
          username
          profile_pic {
            _id
          }
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

  GET_TOKEN: gql`
    query getToken($username: String!, $password: String!) {
      getToken(username: $username, password: $password) 
    }
  `,

  GET_USER_DATA: gql`
    query getUserData {
      getUserData {
        name
      }
    }
  `
}

export default queries;