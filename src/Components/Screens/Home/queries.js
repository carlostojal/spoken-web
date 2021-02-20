import { gql } from "@apollo/client";

const queries = {
  GET_FEED: gql`
    query getUserFeed($page: Int!, $perPage: Int!) {
      getUserFeed(page: $page, perPage: $perPage) {
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